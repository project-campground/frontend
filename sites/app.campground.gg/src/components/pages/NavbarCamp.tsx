import { Avatar, Stack, styled, Typography } from "@mui/joy";
import { GlobalNavbarItem } from "~/routes/_global/GlobalNavbarItem";
import { IconUsers } from "@tabler/icons-react";
import SimpleNotification from "../SimpleNotification";
import VerifiedIcon from "../VerifiedIcon";
import { useNavigate } from "react-router";
import type { SxProps } from "@mui/joy/styles/types";

type Props = {
    avatar?: string;
    id: string;
    name: string;
    memberCount: number;
    hasNotification?: boolean;
    pingCount?: number;
    isActive?: boolean;
    isVerified?: boolean;
    isOwner?: boolean;
    sx?: SxProps;
};

const NavbarCampWrapper = styled(GlobalNavbarItem)(() => ({
}));

export default function NavbarCamp({ id, avatar, name, memberCount, isVerified, isActive, pingCount, hasNotification, sx }: Props) {
    const navigate = useNavigate();

    return (
        <NavbarCampWrapper sx={[{ px: 1, py: 0.5, height: 48, pr: { xs: 1, md: 3 } }, ...(Array.isArray(sx) ? sx : [sx])]} className={isActive ? "active" : ""} onClick={() => navigate(`/c/${id}/t/bulletin`)}>
            <Stack direction="row" alignItems="center" gap={2} py={1}>
                <SimpleNotification pingCount={pingCount} regular={hasNotification} badgeInset={5}>
                    <Avatar src={avatar} variant="solid" sx={(theme) => ({ borderRadius: theme.vars.radius.md })}>
                        {name[0]}
                    </Avatar>
                </SimpleNotification>

                <Stack direction="column" gap={0.2} alignItems="start" sx={{ display: { xs: "none", md: "flex" } }}>
                    <Stack gap={1} direction="row" alignItems="center">
                        <Typography level="title-md" lineHeight={1} fontSize={16} sx={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</Typography>
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
        </NavbarCampWrapper>
    );
}