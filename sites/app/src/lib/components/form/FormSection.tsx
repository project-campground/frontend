import { Stack, styled, Typography } from "@mui/joy";
import type { ReactNode } from "react";

type Props = React.PropsWithChildren & {
    header?: ReactNode | ReactNode[];
    layout?: "footer" | "stack" | "inline" | "grid-3" | "divided";
    startDecorator?: ReactNode | ReactNode[];
    endDecorator?: ReactNode | ReactNode[];
    alignItems?: AlignSetting;
    gap?: number;
    hide?: boolean;
    disabled?: boolean;
}

const FormSectionStack = styled(Stack)(() => ({
    "&.FormSection-disabled": {
        opacity: 0.65,
    },
    "&.FormSection-hide": {
        display: "none",
    },
}));
const FormSectionFieldStack = styled(Stack)(({ theme }) => ({
    "&.FormSection-layoutInline": {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    "&.FormSection-layoutFooter": {
        flexDirection: "row-reverse",
        flexWrap: "wrap",
    },
    "&.FormSection-layoutGrid-3": {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
    },
    "&.FormSection-layoutDivided > .MuiFormControl-root:not(:first-of-type)": {
        borderTop: `solid 1px ${theme.vars.palette.neutral[800]}`,
        paddingTop: 12,
    },
    [theme.breakpoints.down("md")]: {
        "&.FormSection-layoutInline": {
            flexDirection: "column",
        },
        "&.FormSection-layoutFooter": {
            flexDirection: "column",
        },
    },
}));

export default function FormSection({ disabled, startDecorator, endDecorator, hide, header, layout, children, alignItems, gap }: Props) {
    return (
        <FormSectionStack gap={2} className={`FormSection-container${disabled ? " FormSection-disabled" : ""}${hide ? " FormSection-hide" : ""}`}>
            {header && <Typography className="FormSection-header" level="title-lg" fontWeight={700} startDecorator={startDecorator} endDecorator={endDecorator}>{header}</Typography>}
            <FormSectionFieldStack className={`FormSection-fields ${layout ? `FormSection-layout${layout[0].toUpperCase()}${layout.slice(1)}` : ""}`} gap={gap ?? 2} sx={{ alignItems }}>
                {children}
            </FormSectionFieldStack>
        </FormSectionStack>
    )
}