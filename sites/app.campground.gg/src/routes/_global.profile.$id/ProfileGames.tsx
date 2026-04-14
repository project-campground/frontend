import { Box, Typography } from "@mui/joy";
import React from "react";
import type { ProfileView } from "types/campground/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";

type Props = {
    user: ProfileView;
};

export default class ProfileGames extends React.Component<Props> {
    render(): React.ReactNode {
        return (
            <Box>
                <Typography level="h3">Games</Typography>
                <PagePlaceholder sx={{ mt: 8 }} icon={PagePlaceholderIcon.WIP} title="Work in progress">
                    We have not yet made profile games. Come back later!
                </PagePlaceholder>
            </Box>
        )
    }
}