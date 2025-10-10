import { Avatar, Stack, Typography } from "@mui/joy";
import React from "react";
import { GlobalNavbarItem } from "~/layout/GlobalNavbarItem";
import { IconUsers } from "@tabler/icons-react";
import SimpleNotification from "./SimpleNotification";
import VerifiedIcon from "./VerifiedIcon";

type Props = {
    avatar?: string;
    name: string;
    memberCount: number;
    hasNotification?: boolean;
    pingCount?: number;
    isActive?: boolean;
    isVerified?: boolean;
};

export default class NavbarCamp extends React.Component<Props> {

    render(): React.ReactNode {
        const { avatar, name, memberCount, isVerified, isActive, pingCount, hasNotification } = this.props;

        return (
            <GlobalNavbarItem sx={{ px: 1, pr: 3, py: 0.5, height: 48 }} className={isActive ? "active" : ""}>
                <Stack direction="row" alignItems="center" gap={2} py={1}>
                    <SimpleNotification pingCount={pingCount} regular={hasNotification} badgeInset={5}>
                        <Avatar src={avatar} variant="solid" sx={(theme) => ({ borderRadius: theme.vars.radius.md })}>
                            {name[0]}
                        </Avatar>
                    </SimpleNotification>

                    <Stack direction="column" gap={0.2} alignItems="start">
                        <Stack gap={1} direction="row" alignItems="center">
                            <Typography level="title-md" lineHeight={1} fontSize={16}>{name}</Typography>
                            {isVerified && <VerifiedIcon size="xs" />}
                        </Stack>
                        <Stack gap={1} direction="row" alignItems="center">
                            <Typography level="body-md" textColor="neutral.300" lineHeight={1}>
                                <IconUsers size={12} />
                            </Typography>
                            <Typography level="body-sm" lineHeight={1} fontSize={12}>{memberCount} members</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </GlobalNavbarItem>
        )
    }
}