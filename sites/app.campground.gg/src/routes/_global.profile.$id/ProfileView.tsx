import { Box, Stack } from "@mui/joy";
import ProfileFeed from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import type { ProfileView } from "types/user";
import ProfileGames from "./ProfileGames";
import ProfileLayout from "./ProfileLayout";
import ErrorBoundary from "~/components/ErrorBoundary";

type Props = {
    user: ProfileView;
    isSelf: boolean;
};

export default function ProfileView({ user, isSelf }: Props) {

    return (
        <ProfileLayout user={user}>
            <Stack direction={{ xs: "column", md: "row" }} sx={{ flex: 1, display: "grid", gridTemplateColumns: { xs: "11fr", md: "2fr 7fr 2fr" }, gap: 6, px: { xs: 2, md: 35 } }}>
                <Box sx={{ display: { xs: "none", md: "block" }, gridRow: 1 }}>
                    <ProfileGames user={user} />
                </Box>
                <Box sx={{ width: "100%", overflow: "hidden", gridRow: { xs: 2, md: 1 } }}>
                    <ErrorBoundary>
                        <ProfileFeed user={user} isSelf={isSelf} />
                    </ErrorBoundary>
                </Box>
                <Box sx={{ gridRow: 1 }}>
                    <ProfileAbout user={user} />
                </Box>
            </Stack>
        </ProfileLayout>
    );
}