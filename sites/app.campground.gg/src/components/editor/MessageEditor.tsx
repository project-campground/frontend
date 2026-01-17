import { Divider, Dropdown, IconButton, Link, MenuButton, Sheet, Stack, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useState } from "react";
import { Group, PrimaryButton } from "components";
import BlockTextEditor from "./BlockTextEditor";
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

type Props = {
    content?: string;
    placeholder?: string;
    confirmButton?: string;
    sx?: SxProps;
    onCancel?: () => unknown;
    onConfirm: (content: string) => unknown;
};

const MessageEditorContainer = styled(Sheet)(({ theme }) => ({
    backgroundColor: theme.vars.palette.background.level2,
    width: "100%",
    maxHeight: 200,
    padding: "8px 8px",
    borderRadius: theme.vars.radius.md,
}));

const MessageEditorGroup = styled(Group)(() => ({
    height: "100%",
}));

export default function MessageEditor({ placeholder, content, onConfirm, onCancel, confirmButton, sx }: Props) {
    const [editor] = useState(() => withCgMarkdown(withHistory(withReact(createEditor()))) as RichEditor);

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
                <MessageEditorGroup gap={1} sx={sx} alignItems="center">
                    <Dropdown>
                        <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "soft" } }}>
                            <IconPlus />
                        </MenuButton>
                        <MessageEditorMenu />
                    </Dropdown>
                    <Divider orientation="vertical" />
                    <BlockTextEditor
                        editor={editor}
                        defaultValue={content}
                        sx={{ border: "none", flex: 1, maxHeight: 200, overflowY: "auto" }}
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
            </MessageEditorContainer>
            {confirmButton && <Group gap={2} alignItems="center">
                <PrimaryButton endDecorator={<IconArrowRight />} onClick={onDone}>{confirmButton ?? "Post"}</PrimaryButton>
                {onCancel && <Link color="neutral" onClick={onCancel}>Cancel</Link>}
            </Group>}
        </Stack>
    );
}