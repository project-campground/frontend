import { Slate } from "slate-react";
import type { SxProps } from "@mui/joy/styles/types";
import { styled } from "@mui/joy";
import type { RichEditor } from "../../editor/editor";
import { paragraph } from "~/editor/utils";
import { deserializeMarkdown } from "~/editor/mdast/markdown";
import { slatefyRoot } from "~/editor/mdast/editor";
import ErrorBoundary from "../ErrorBoundary";

type Props = React.PropsWithChildren & {
    ref?: React.RefObject<HTMLDivElement | null>;
    editor: RichEditor;
    sx: SxProps;
    defaultValue?: string;
    maxHeight?: number;
    enableToolbar?: boolean;
};

const StyledContainer = styled("div", {
    name: "MarkdownEditorContainer",
    slot: "root",
})(({ theme }) => ({
    position: "relative",
    border: `solid 1px ${theme.vars.palette.neutral[700]}`,
    borderRadius: theme.vars.radius.md,
    // position: "relative",
    overflow: "auto",
    color: theme.vars.palette.text.secondary,
}));

export default function BlockTextSlate({ ref, defaultValue, editor, sx, maxHeight, children }: Props) {
    return (
        <StyledContainer sx={[{ maxHeight }, ...(Array.isArray(sx) ? sx : [sx])]} ref={ref}>
            <ErrorBoundary>
                <Slate initialValue={defaultValue ? slatefyRoot(deserializeMarkdown(defaultValue)) : [paragraph()]} editor={editor}>
                    {children}
                </Slate>
            </ErrorBoundary>
        </StyledContainer>
    )
}