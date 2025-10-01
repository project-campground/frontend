import { Box, styled } from "@mui/joy";

const MarkdownWrapper = styled(Box, {
    name: "MarkdownWrapper",
    slot: "root"
})(({ theme }) => ({
    "p:first-child": {
        marginTop: 0,
    },
    "p:last-child": {
        marginBottom: 0,
    },
    "blockquote": {
        position: "relative",
        marginLeft: "20px",
        marginRight: "0px",
        "::before": {
            position: "absolute",
            content: "''",
            height: "100%",
            width: "4px",
            borderRadius: theme.vars.radius.md,
            backgroundColor: theme.vars.palette.neutral[400],
            left: "-20px",
            top: 0,
            bottom: 0,
        }
    },
}))

export default MarkdownWrapper;