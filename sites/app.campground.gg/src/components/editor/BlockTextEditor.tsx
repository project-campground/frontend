import { useState } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import MarkdownWrapper from "../markdown/MarkdownWrapper";
import type { SxProps } from "@mui/joy/styles/types";
import { Divider, styled } from "@mui/joy";
import { withHistory } from "slate-history";
import type { RichEditor } from "../../editor/editor";
import EditorLeaf from "./EditorLeaf";
import EditorElement from "./EditorElement";
import RichEditorToolbar, { RichEditorToolbarBlockFormatting, RichEditorToolbarHeading, RichEditorToolbarInlineFormatting } from "./RichEditorToolbar";
import withCgMarkdown from "../../editor/withCgMarkdown";
import useBlockDecorate from "../../editor/block-decorate";
import { editorKeyboardLogic } from "../../editor/keyboard-logic";

type Props = {
    sx: SxProps;
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
}));
const StyledWrapper = styled(MarkdownWrapper, {
    name: "MarkdownEditorWrapper",
    slot: "editor",
})(() => ({
    padding: `6px 12px`,
    position: "relative",
    overflow: "auto",
    width: "100%",
    height: "100%",
}));

export default function BlockTextEditor({ sx }: Props) {
    const [editor] = useState(() => withCgMarkdown(withHistory(withReact(createEditor()))) as RichEditor);
    const blockDecorate = useBlockDecorate();

    return (
        <StyledContainer sx={sx}>
            <Slate initialValue={[{ type: "paragraph", children: [{ text: "Example text" }] }]} editor={editor}>
                <RichEditorToolbar>
                    <RichEditorToolbarInlineFormatting />
                    <Divider />
                    <RichEditorToolbarBlockFormatting />
                    <Divider />
                    <RichEditorToolbarHeading />
                </RichEditorToolbar>
                <Divider />
                <StyledWrapper>
                    <StyledEditor
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
                            logic(editor, event);
                        }}
                    />
                </StyledWrapper>
            </Slate>
        </StyledContainer>
    )
}