import { styled } from "@mui/joy";
import { forwardRef } from "react";
import { jsx } from "react/jsx-runtime";

export interface TextBlockProps extends React.PropsWithChildren {
    weight?: 500 | 600 | 700 | 800 | 900;
    align?: "top" | "center" | "bottom";
    hideOnMobile?: boolean;
    className?: string;
}

const TextBlockRoot = styled("span", {
    name: "TextBlock",
    slot: "root",
})<{ ownerState: TextBlockProps }>(({ theme }) => ({
    display: "inline-block",
    verticalAlign: "center",
    "&.TextBlock-weight500": {
        fontWeight: 500,
    },
    "&.TextBlock-alignTop": {
        verticalAlign: "top",
    },
    "&.TextBlock-alignBottom": {
        verticalAlign: "bottom",
    },
    "&.TextBlock-weight600": {
        fontWeight: 500,
    },
    "&.TextBlock-weight700": {
        fontWeight: 500,
    },
    "&.TextBlock-weight800": {
        fontWeight: 500,
    },
    "&.TextBlock-weight900": {
        fontWeight: 500,
    },
    "&.TextBlock-hideOnMobile": {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    }
}));


const TextBlock = forwardRef<HTMLDivElement, TextBlockProps>(function TextBlockTypography(props, ref) {
    const { hideOnMobile, weight, className, align, ...other } = props;
    const ownerState = props;

    return (
        jsx(TextBlockRoot, {
            ref,
            ownerState,
            className: [
                `TextBlock-root`,
                hideOnMobile && "TextBlock-hideOnMobile",
                weight && `TextBlock-weight${weight}`,
                align && `TextBlock-align${align[0].toUpperCase()}${align.slice(1)}`,
                className,
            ].filter(Boolean).join(" "),
            ...other
        })
    )
});

export default TextBlock;