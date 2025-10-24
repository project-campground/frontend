import { styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { EditorContent, type Editor } from "@tiptap/react"
import MarkdownWrapper from "./MarkdownWrapper";

type Props = {
    editor: Editor;
    sx?: SxProps;
};

const StyledEditor = styled(EditorContent, {
    name: "MarkdownEditor",
    slot: "editor",
})(() => ({
    "> .tiptap:focus": {
        outline: "none",
    },
    "> .tiptap > *:first-child": {
        marginTop: 0,
    },
    "> .tiptap > *:last-child": {
        marginBottom: 0,
    },
}));

const StyledWrapper = styled(MarkdownWrapper, {
    name: "MarkdownEditorWrapper",
    slot: "root",
})(() => ({}));

export default function MarkdownEditor(props: Props) {
    return (
        <StyledWrapper sx={props.sx}>
            <StyledEditor {...props} />
        </StyledWrapper>
    )
}