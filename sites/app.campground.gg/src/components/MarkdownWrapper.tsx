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
    "table": {
        border: `solid 1px ${theme.vars.palette.neutral[500]}`,
        borderSpacing: 0,
        maxWidth: "100%",
    },
    "th, td": {
        padding: `4px 8px`,
    },
    "tr": {
        backgroundColor: theme.vars.palette.background.level1,
    },
    "tr:nth-child(odd)": {
        backgroundColor: theme.vars.palette.background.level2,
    },
    "thead": {
        backgroundColor: theme.vars.palette.background.body,
        "tr, tr:nth-child(odd)": {
            backgroundColor: theme.vars.palette.background.body,
        }
    }
}))

export default MarkdownWrapper;