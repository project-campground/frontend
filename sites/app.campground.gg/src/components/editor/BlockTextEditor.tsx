import { Editable, Slate } from "slate-react";
import MarkdownWrapper from "../markdown/MarkdownWrapper";
import type { SxProps } from "@mui/joy/styles/types";
import { Divider, styled } from "@mui/joy";
import type { RichEditor } from "../../editor/editor";
import EditorLeaf from "./EditorLeaf";
import EditorElement from "./EditorElement";
import RichEditorToolbar, { RichEditorToolbarBlockFormatting, RichEditorToolbarHeading, RichEditorToolbarInlineFormatting, RichEditorToolbarTableFormatting } from "./RichEditorToolbar";
import useBlockDecorate from "../../editor/block-decorate";
import { editorKeyboardLogic, type KeyboardSettings } from "../../editor/keyboard-logic";
import { paragraph } from "~/editor/utils";
import { deserializeMarkdown } from "~/editor/mdast/markdown";
import { slatefyRoot } from "~/editor/mdast/editor";

type Props = {
    editor: RichEditor;
    sx: SxProps;
    placeholder?: string;
    defaultValue?: string;
    enableToolbar?: boolean;
    keyboardSettings?: KeyboardSettings;
};

const StyledEditor = styled(Editable, {
    name: "MarkdownEditor",
    slot: "editor",
})(() => ({
    ":focus": {
        outline: "none",
    },
    "> .tiptap > *:first-child": {
        marginTop: 0,
    },
    "> .tiptap > *:last-child": {
        marginBottom: 0,
    },
}));

const StyledContainer = styled(MarkdownWrapper, {
    name: "MarkdownEditorContainer",
    slot: "root",
})(({ theme }) => ({
    border: `solid 1px ${theme.vars.palette.neutral[600]}`,
    borderRadius: theme.vars.radius.md,
    position: "relative",
    overflow: "hidden",
    color: theme.vars.palette.text.secondary,
}));
const StyledWrapper = styled(MarkdownWrapper, {
    name: "MarkdownEditorWrapper",
    slot: "editor",
})(() => ({
    padding: `6px 12px`,
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    height: "100%",
}));

export default function BlockTextEditor({ defaultValue, editor, sx, placeholder, enableToolbar, keyboardSettings }: Props) {
    const blockDecorate = useBlockDecorate();
    const keyboardSettingsDefaulted = keyboardSettings ?? {};

    return (
        <StyledContainer sx={sx}>
            <Slate initialValue={defaultValue ? slatefyRoot(deserializeMarkdown(defaultValue)) : [paragraph()]} editor={editor}>
                {enableToolbar && <>
                    <RichEditorToolbar>
                        <RichEditorToolbarInlineFormatting />
                        <Divider />
                        <RichEditorToolbarBlockFormatting />
                        <Divider />
                        <RichEditorToolbarHeading />
                        <Divider />
                        <RichEditorToolbarTableFormatting />
                    </RichEditorToolbar>
                    <Divider />
                </>}
                <StyledWrapper>
                    <StyledEditor
                        placeholder={placeholder}
                        renderLeaf={EditorLeaf}
                        renderElement={EditorElement}
                        spellCheck
                        autoFocus={true}
                        decorate={blockDecorate}
                        onKeyDown={(event) => {
                            const logic = editorKeyboardLogic[event.key];

                            if (!logic)
                                return;

                            event.preventDefault();
                            logic(editor, event, keyboardSettingsDefaulted);
                        }}
                    />
                </StyledWrapper>
            </Slate>
        </StyledContainer>
    )
}