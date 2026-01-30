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
                {/* <PageSidebar>
                    <Typography level="title-sm" textColor="text.quartary" fontWeight={900}>Campground</Typography>
                    <PageSidebarList>
                        {pages.map((page) =>
                            <PageSidebarItem color={page.color} active={page.href === active} href={page.href} icon={page.icon}>
                                {page.text}
                            </PageSidebarItem>
                        )}
                    </PageSidebarList>
                </PageSidebar> */}
            </Stack>
        );
    }
}