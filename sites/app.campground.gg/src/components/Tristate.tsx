import { Box, ButtonGroup, IconButton, Stack, styled, type VariantProp } from "@mui/joy";
import { IconCheck, IconSlash, IconX } from "@tabler/icons-react";
import React, { useState, type ReactNode } from "react";

const TristateRoot = styled(Stack, {
    name: "Tristate",
    slot: "root",
})<{ ownerState: TristateOwnerState; }>(({ ownerState }) => ({
    display: "inline-flex",
    flexDirection: ownerState.left ? "row-reverse" : "row",
    gap: "var(--Tristate-gap, 0.625rem)",
}));

const TristateLabel = styled(Box, {
    name: "Tristate",
    slot: "label",
})<{ ownerState: TristateOwnerState; }>(() => ({
    flex: 1,
}));

const TristateBox = styled(ButtonGroup, {
    name: "Tristate",
    slot: "box",
})<{ ownerState: TristateOwnerState; }>(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    "--ButtonGroup-separatorColor": "transparent",
    border: `solid 1px ${theme.vars.palette.neutral[800]}`,
    boxShadow: theme.vars.shadow.sm,
}));

const TristateBoxBackground = styled(Box, {
    name: "Tristate",
    slot: "box-background",
})<{ ownerState: TristateOwnerState; }>(({ theme }) => ({
    position: "absolute",
    height: "100%",
    width: "33.33%",
    top: 0,
    bottom: 0,
    left: 0,
    transitionDuration: "0.3s",
    transitionProperty: "background, left",
    backgroundColor: theme.vars.palette.neutral[800],
    "&.on": {
        left: "66.66%",
        backgroundColor: theme.vars.palette.success[900],
    },
    "&.pass": {
        left: "33.33%",
        backgroundColor: theme.vars.palette.warning[900],
    },
    "&.off": {
        left: "0%",
        backgroundColor: theme.vars.palette.danger[900],
    }
}));

export type TristateValue = "on" | "pass" | "off";
export interface TristateProps {
    value?: TristateValue;
    defaultValue?: TristateValue;
    variant?: VariantProp;
    label?: ReactNode | ReactNode[];
    left?: boolean;
    onChange?: (value: TristateValue) => unknown;
};
interface TristateOwnerState extends TristateProps {

}
const TristateButton = styled(IconButton)(({ theme, color }) => ({
    color: theme.vars.palette.text.quartary,
    backgroundColor: "transparent",
    transitionProperty: "color, background",
    transitionDuration: "0.3s",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: theme.vars.palette.text.tertiary,
    },
    "&.checked": {
        color: theme.vars.palette[color as "neutral"][500],
    },
    "&.checked:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: theme.vars.palette[color as "neutral"][400],
    }
}));

const Tristate = React.forwardRef<HTMLDivElement, TristateProps>(function Tristate(props, ref) {
    const { value, defaultValue, variant, label, onChange } = props;
    
    const ownerState = { ...props, variant };
    const [triValue, setTriValue] = value ? [value] : useState(value ?? defaultValue ?? "pass");
    const onValueChange = (newValue: TristateValue) => {
        setTriValue?.(newValue);
        onChange?.(newValue);
    };

    return (
        <TristateRoot ref={ref} ownerState={ownerState}>
            <TristateBox ownerState={ownerState} size="md">
                <TristateBoxBackground ownerState={ownerState} className={triValue} />
                <TristateButton className={triValue === "off" ? "checked" : ""} onClick={onValueChange.bind(null, "off")} variant="plain" color="danger">
                    <IconX />
                </TristateButton>
                <TristateButton className={triValue === "pass" ? "checked" : ""} onClick={onValueChange.bind(null, "pass")} variant="plain" color="warning">
                    <IconSlash />
                </TristateButton>
                <TristateButton className={triValue === "on" ? "checked" : ""} onClick={onValueChange.bind(null, "on")} variant="plain" color="success">
                    <IconCheck />
                </TristateButton>
            </TristateBox>
            {label && <TristateLabel ownerState={ownerState}>
                {label}
            </TristateLabel>}
        </TristateRoot>
    );
});
export default Tristate;