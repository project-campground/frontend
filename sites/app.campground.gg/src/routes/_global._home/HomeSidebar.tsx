import { type ColorPaletteProp, Stack, Typography } from "@mui/joy";
import React from "react";
import { IconFlame, IconFriends } from "@tabler/icons-react";

type Props = {
    page: string;
};

const pages = [
    {
        href: "/",
        icon: <IconFlame />,
        text: "Feed",
        color: "primary" as ColorPaletteProp
    },
    {
        href: "/friends",
        icon: <IconFriends />,
        text: "Friends",
    },
];

export default class HomeSidebar extends React.Component<Props> {
    render(): React.ReactNode {
        const { page: active } = this.props;
        return (
            <Stack direction="row">
            </Stack>
        );
    }
}