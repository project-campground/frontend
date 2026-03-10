import { Box, Stack, styled } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { Group } from "components";
import React from "react";

const ThreadItemHook = styled(`div`, {
    name: "ThreadLineItem",
    slot: "hook",
})(({ theme }) => ({
    position: "absolute",
    border: `solid 3px ${theme.vars.palette.neutral[700]}`,
    height: "50%",
    width: 30,
    left: 20,
    "&:not(.reverse)": {
        borderTop: 0,
        borderRight: 0,
        borderBottomLeftRadius: theme.vars.radius.md,
        bottom: "50%",
    },
    "&.reverse": {
        borderBottom: 0,
        borderRight: 0,
        borderTopLeftRadius: theme.vars.radius.md,
        top: "50%",
    }
}));
const ThreadItemLine = styled(`div`, {
    name: "ThreadLineItem",
    slot: "line",
})(({ theme }) => ({
    position: "absolute",
    border: `solid 3px ${theme.vars.palette.neutral[700]}`,
    borderTop: 0,
    borderRight: 0,
    height: `calc(50% + ${theme.vars.radius.md})`,
    width: 3,
    left: 20,
    "&:not(.reverse)": {
        bottom: 0,
    },
    "&.reverse": {
        top: 0,
    },
}));

const ThreadLineItemWrapper = styled(Group, {
    name: "ThreadLineItem",
    slot: "root",
})(() => ({
    position: "relative",
    width: "100%",
    "&:not(.reverse):last-of-type .line": {
        opacity: 0,
    },
    "&.reverse:first-of-type .line": {
        opacity: 0,
    },
}));

export function ThreadLineItem({ children, reverse, hookSx }: React.PropsWithChildren & { reverse?: boolean; hookSx?: SxProps }) {
    return (
        <ThreadLineItemWrapper className={`ThreadLineItem-wrapper ${reverse ? "reverse" : ""}`}>
            <ThreadItemHook sx={hookSx} className={reverse ? "reverse" : ""} />
            <ThreadItemLine className={`line${reverse ? " reverse" : ""}`} />
            <Box sx={{ ml: 5, flex: 1 }}>
                {children}
            </Box>
        </ThreadLineItemWrapper>
    )
}
export function ThreadLineWrapper({ children, }: { children: React.ReactElement[] }) {
    return (
        <Stack>
            <Box>
                {children[0]}
            </Box>
            <Stack>
                {/* <WrapperLine sx={{ gridColumn: "line / content" }}>
                </WrapperLine> */}
                {children.slice(1)}
            </Stack>
        </Stack>
    );
}