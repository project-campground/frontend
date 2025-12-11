import { Box, Stack, styled } from "@mui/joy";
import { Group } from "components";
import React from "react";

const ThreadItemHook = styled(`div`, {
    name: "Hook"
})(({ theme }) => ({
    position: "absolute",
    border: `solid 3px ${theme.vars.palette.neutral[500]}`,
    borderTop: 0,
    borderRight: 0,
    borderBottomLeftRadius: theme.vars.radius.lg,
    height: "50%",
    width: 30,
    left: 20,
    bottom: "50%",
}));
const ThreadItemLine = styled(`div`, {
    name: "Line"
})(({ theme }) => ({
    position: "absolute",
    border: `solid 3px ${theme.vars.palette.neutral[500]}`,
    borderTop: 0,
    borderRight: 0,
    height: `calc(50% + ${theme.vars.radius.lg})`,
    width: 3,
    left: 20,
    bottom: 0,
}));

// const WrapperLine = styled(`div`, {
//     name: "Line"
// })(({ theme }) => ({
//     // position: "absolute",
//     backgroundColor: theme.vars.palette.neutral[500],
//     borderTop: 0,
//     borderRight: 0,
//     height: "100%",
//     width: 3,
//     marginLeft: 25,
//     // left: 20,
// }));
const ThreadLineItemWrapper = styled(Group)(() => ({
    position: "relative",
    width: "100%",
    "&:last-child .hook": {
        opacity: 0,
    }
}));

export function ThreadLineItem({ children, top, }: React.PropsWithChildren & { top?: number; }) {
    return (
        <ThreadLineItemWrapper>
            <ThreadItemHook sx={{ top }} />
            <ThreadItemLine sx={{ top }} className="hook" />
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