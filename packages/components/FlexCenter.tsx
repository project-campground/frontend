import type { PropsWithChildren } from "react";
import { Stack, styled } from "@mui/joy";
import Group from "./Group";

type Props = PropsWithChildren;

export default function FlexCenter({ children }: Props) {
    return (
        <Group alignItems="center" sx={{ height: "100%", width: "100%" }}>
            <Stack alignItems="center" sx={{ width: "100%" }}>
                {children}
            </Stack>
        </Group>
    )
}