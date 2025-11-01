import { styled, Typography } from "@mui/joy";
import type { RenderLeafProps } from "slate-react";

const Leaf = styled(Typography, {
    name: "Leaf",
})<{ component: string; }>(() => ({
    display: "inline",
    fontSize: "inherit",
    "h1, h2, h3, h4, h5, h6 &": {
        fontSize: "inherit",
        fontWeight: "bolder",
    },
    "&.bold": {
        fontWeight: "bolder",
    },
    "&.italic": {
        fontStyle: "italic",
    },
    "&.strikethrough": {
        textDecorationLine: "line-through",
    },
    "&.underline": {
        textDecorationLine: "underline",
    },
    "&.underline.strikethrough": {
        textDecorationLine: "line-through underline",
    }
}));

export default function EditorLeaf({ children, leaf, attributes }: RenderLeafProps) {
    const { text: _, scope, ...rest } = leaf;
    const classes = Object.keys(rest);
    const { code } = rest;

    return (
        <Leaf component="span" level={code ? "code" : undefined} className={classes.join(" ")} textColor={scope && `text.code-${scope}`} {...attributes}>
            {children}
        </Leaf>
    )
}