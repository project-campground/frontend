import { Box, styled } from "@mui/joy";
import { Group } from "components";
import React from "react";

const Line = styled(`div`, {
    name: "Line"
})(({ theme }) => ({
    position: "absolute",
    border: `solid 3px ${theme.vars.palette.neutral[500]}`,
    borderTop: 0,
    borderRight: 0,
    borderBottomLeftRadius: theme.vars.radius.lg,
    height: "300%",
    width: 30,
    left: 20,
    bottom: "50%",
}));

export default function PostParentLine({ children, leftPadding, }: React.PropsWithChildren & { leftPadding?: number; }) {
    return (
        <Group sx={{ position: "relative", width: "100%", ml: leftPadding ?? 0 }}>
            <Line />
            <Box sx={{ ml: 5, flex: 1 }}>
                {children}
            </Box>
        </Group>
    )
}