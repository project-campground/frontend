import { AspectRatio, Box, Stack, Typography } from "@mui/joy";
import React, { type ReactNode } from "react";
import UserAvatar from "~/components/UserAvatar";
import VerifiedIcon from "~/components/VerifiedIcon";
import type { ProfileViewEmpty } from "types/campground/user";

type Props = {
    user: ProfileViewEmpty;
    children: ReactNode[] | ReactNode;
};

export default class ProfileLayout extends React.Component<Props> {
    render(): React.ReactNode {
        const { user, children } = this.props;

        return (
            <Box sx={{ overflowY: "auto", flex: 1, width: "100%" }}>
                <Stack className="ProfileLayout container" sx={(theme) => ({ minHeight: "100%", pb: 16, backgroundColor: theme.vars.palette.background.level1 })}>
                    <Box sx={{ px: 2, py: 2, overflow: "hidden" }}>
                        <AspectRatio ratio={8} sx={{ borderRadius: "md" }} slotProps={{ content: { sx: { paddingBottom: { xs: 20, md: "calc(var(--AspectRatio-paddingBottom) - 2 * var(--variant-borderWidth, 0px))" } } } }}>
                            <Box sx={(theme) => ({
                                width: "100%",
                                height: "100%",
                                background: `linear-gradient(to bottom right, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.secondary[500]})`
                            })}>
                                
                            </Box>
                        </AspectRatio>
                    </Box>
                    <Stack direction="column" alignItems="center" gap={1} sx={{ mt: -8, mb: 2 }}>
                        <UserAvatar withStatus did={user.did} size="xxxl" badgeSx={{ "--Badge-ringSize": "4px" }} sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level1}` })} />
                        <Stack gap={0} alignItems="center">
                            <Stack direction="row" gap={1} alignItems="center">
                                <Typography level="h2">{user.displayName}</Typography>
                                <VerifiedIcon size="md" />
                            </Stack>
                            <Typography level="body-md" textColor="neutral.200">@{user.handle.replace("at://", "")}</Typography>
                            <Typography level="body-lg" textColor="neutral.100">{user.tagline}</Typography>
                        </Stack>
                    </Stack>
                    <Box className="ProfileLayout body">
                        { children }
                    </Box>
                </Stack>
            </Box>
        )
    }
}