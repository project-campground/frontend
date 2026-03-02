import { Box, styled } from "@mui/joy";

const MarkdownWrapper = styled(Box, {
    name: "MarkdownWrapper",
    slot: "root"
})(({ theme }) => ({
    "p": {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 4,
    },
    "p, h1, h2, h3, h4, h5, h6, blockquote": {
        "&:first-of-type": {
            marginTop: 0,
        },
        "&:last-of-type": {
            marginBottom: 0,
        },
    },
    "blockquote": {
        position: "relative",
        marginLeft: "20px",
        marginRight: "0px",
        minHeight: "1.5em",
        "&::before": {
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
    ":not(pre) > code": {
        backgroundColor: theme.vars.palette.background.body,
        color: theme.vars.palette.text.code,
        padding: `2px 4px`,
        borderRadius: theme.vars.radius.sm,
        fontFamily: theme.vars.fontFamily.code,
    },
    "q": {
        backgroundColor: theme.vars.palette.background.level4,
        padding: `2px 4px`,
        borderRadius: theme.vars.radius.sm,
        "::after, ::before": {
            color: theme.vars.palette.text.quartary,
            fontWeight: 900,
            margin: `0 4px`,
        },
    },
    "table": {
        border: `solid 1px ${theme.vars.palette.neutral[500]}`,
        borderSpacing: 0,
        maxWidth: "100%",
        // overflowX: "auto",
        overflow: "hidden",
        borderRadius: theme.vars.radius.md,
        margin: "8px 0",
        position: "relative",
    },
    "th, td": {
        padding: `6px 12px`,
    },
    "tr": {
        backgroundColor: theme.vars.palette.background.level1,
        position: "relative",
    },
    "tr:nth-of-type(odd)": {
        backgroundColor: theme.vars.palette.background.level2,
    },
    "thead": {
        backgroundColor: theme.vars.palette.background.body,
        "tr, tr:nth-of-type(odd)": {
            backgroundColor: theme.vars.palette.background.body,
        }
    }
}))

export default MarkdownWrapper;