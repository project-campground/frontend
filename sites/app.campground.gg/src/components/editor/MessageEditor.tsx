import { Button, Divider, Dropdown, IconButton, Link, MenuButton, Sheet, Stack, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useRef, useState } from "react";
import { Group } from "components";
import BlockTextSlate from "./BlockTextSlate";
import withCgMarkdown from "~/editor/withCgMarkdown";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor, Node } from "slate";
import type { RichEditor } from "~/editor/editor";
import { IconArrowRight, IconMoodHappyFilled, IconPlus, IconSend2 } from "@tabler/icons-react";
import MessageEditorMenu from "./MessageEditorMenu";
import { serializeMarkdown } from "~/editor/mdast/markdown";
import { mdastifyEditor } from "~/editor/mdast";
import CampgroundEditor from "./CampgroundEditor";
import type { EditorElement } from "~/editor/element";
import TextEditor from "./TextEditor";
import RichEditorFloater from "./RichEditorFloater";

type Props = {
    content?: string;
    placeholder?: string;
    confirmButton?: string;
    sx?: SxProps;
    onCancel?: () => unknown;
    onConfirm: (content: string) => unknown;
};

export const MessageEditorContainer = styled(Sheet)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level2,
    width: "100%",
    maxHeight: 200,
    padding: "8px 8px",
    boxShadow: theme.vars.shadow.sm,
    border: `solid 1px ${theme.vars.palette.neutral.border}`,
    borderRadius: theme.vars.radius.md,
}));

const MessageEditorGroup = styled(Group)(() => ({
    height: "100%",
}));

export default function MessageEditor({ placeholder, content, onConfirm, onCancel, confirmButton, sx }: Props) {
    const [editor] = useState(() => withCgMarkdown(withHistory(withReact(createEditor()))) as RichEditor);
    const relativeRef = useRef<HTMLDivElement | null>(null);

    const onDone = async () => {
        if (editor.children.length === 1 && (editor.children[0] as EditorElement).type === "paragraph" && !Node.string(editor.children[0]).trim())
            return;

        const serialized = serializeMarkdown(mdastifyEditor(editor));

        CampgroundEditor.clearEditor(editor);

        return onConfirm(serialized);
    };

    return (
        <Stack gap={1} sx={{ height: "100%" }}>
            <MessageEditorContainer>
                <BlockTextSlate
                    editor={editor}
                    defaultValue={content}
                    sx={{ border: "none", flex: 1, maxHeight: 200 }}
                    ref={relativeRef}
                >
                    <MessageEditorGroup gap={1} sx={sx} alignItems="center">
                        <Dropdown>
                            <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "soft" } }}>
                                <IconPlus />
                            </MenuButton>
                            <MessageEditorMenu />
                        </Dropdown>
                        <Divider orientation="vertical" />
                        <RichEditorFloater useRelativeRef={relativeRef} />
                        <TextEditor
                            placeholder={placeholder ?? "Message"}
                            keyboardSettings={{
                                enterCallback: onDone,
                            }}
                        />
                        <Group gap={2} alignItems="center">
                            <Dropdown>
                                <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "soft" } }}>
                                    <IconMoodHappyFilled />
                                </MenuButton>
                                <MessageEditorMenu />
                            </Dropdown>
                            {!confirmButton && <IconButton sx={{ display: { xs: "inline-flex", md: "none" } }} variant="soft" onClick={onDone}>
                                <IconSend2 />
                            </IconButton>}
                        </Group>
                    </MessageEditorGroup>
                </BlockTextSlate>
            </MessageEditorContainer>
            {confirmButton && <Group gap={2} alignItems="center">
                <Button variant="glow" color="primary" endDecorator={<IconArrowRight />} onClick={onDone}>{confirmButton ?? "Post"}</Button>
                {onCancel && <Link color="neutral" onClick={onCancel}>Cancel</Link>}
            </Group>}
        </Stack>
    );
}