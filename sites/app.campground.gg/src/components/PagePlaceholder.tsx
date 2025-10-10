import { Stack, Typography } from "@mui/joy";
import React, { ReactNode } from "react";
import type { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";

type Props = {
    icon: PagePlaceholderIcon;
    title: ReactNode[] | ReactNode;
    children: ReactNode[] | ReactNode;
    sx?: SystemStyleObject;
};

export enum PagePlaceholderIcon {
    WIP,
    NotFound,
    NoMore,
    Error,
    Empty,
    Welcome,
}

const textToIcon: Record<PagePlaceholderIcon, string> = {
    [PagePlaceholderIcon.WIP]: "（◞‸◟）",
    [PagePlaceholderIcon.NotFound]: "┐(￣ ヘ￣)┌",
    [PagePlaceholderIcon.Error]: "(✖╭╮✖)",
    [PagePlaceholderIcon.Welcome]: "(￣▽￣)ノ",
    [PagePlaceholderIcon.NoMore]: "(づ ◕‿◕ )づ",
    [PagePlaceholderIcon.Empty]: "d(￣◇￣)b",
};

export default class PagePlaceholder extends React.Component<Props> {

    render() {
        const { icon, title, sx, children } = this.props;

        return (
            <Stack direction="row" alignItems="center" sx={{ width: "100%", height: "100%", ...sx }}>
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