import { Box, Typography } from "@mui/joy";
import React from "react";
import type { User } from "types/user";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";

type Props = {
    user: User;
};

export default class ProfileGames extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
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