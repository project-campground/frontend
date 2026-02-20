import { Stack, Typography } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import React, { ReactNode } from "react";

type Props = {
    icon: PagePlaceholderIcon;
    title: ReactNode[] | ReactNode;
    children: ReactNode[] | ReactNode;
    sx?: SxProps;
};

export enum PagePlaceholderIcon {
    Welcome,
    Ok,
    NotOk,
    Appreciation,
    Error,
    NotFound,
    Empty,
    NoMore,
    WIP,
}

export const textToIcon: Record<PagePlaceholderIcon, string> = {
    [PagePlaceholderIcon.Welcome]: "(￣▽￣)ノ",
    [PagePlaceholderIcon.Error]: "(✖╭╮✖)",
    [PagePlaceholderIcon.NotFound]: "┐(￣ ヘ￣)┌",
    [PagePlaceholderIcon.NoMore]: "(づ ◕‿◕ )づ",
    [PagePlaceholderIcon.Empty]: "d(￣◇￣)b",
    [PagePlaceholderIcon.WIP]: "（◞‸◟）",
    [PagePlaceholderIcon.NotOk]: "(╥﹏╥)",
    // [PagePlaceholderIcon.NotOk]: "(>⌓<｡)",
    [PagePlaceholderIcon.Appreciation]: "(ɔˆ ³(ˆ⌣ˆc)",
    [PagePlaceholderIcon.Ok]: "(｡^‿^｡)",
};

export default class PagePlaceholder extends React.Component<Props> {

    render() {
        const { icon, title, sx, children } = this.props;

        return (
            <Stack direction="row" alignItems="center" sx={[{ width: "100%", height: "100%" }, ...(Array.isArray(sx) ? sx : [sx])]}>
                <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
                    <Typography level="h1" textColor="text.tertiary" fontWeight={900} sx={{ mb: 2 }}>
                        {textToIcon[icon]}
                    </Typography>
                    <Typography level="h2">
                        {title}
                    </Typography>
                    <Typography level="body-md">
                        {children}
                    </Typography>
                </Stack>
            </Stack>
        )
    }
}