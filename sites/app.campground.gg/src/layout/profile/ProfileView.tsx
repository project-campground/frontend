import { Box, Stack } from "@mui/joy";
import ProfileFeed from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import type { User } from "types/user";
import ProfileGames from "./ProfileGames";
import ProfileLayout from "./ProfileLayout";
import ErrorBoundary from "~/components/ErrorBoundary";

type Props = {
    user: User;
    isSelf: boolean;
};

export default function ProfileView({ user, isSelf }: Props) {

    return (
        <ProfileLayout user={user}>
            <Stack direction="row" sx={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 7fr 2fr", gap: 8, px: 35 }}>
                <Box>
                    <ProfileGames user={user} />
                </Box>
                <Box sx={{ width: "100%", overflow: "hidden" }}>
                    <ErrorBoundary>
                        <ProfileFeed user={user} isSelf={isSelf} />
                    </ErrorBoundary>
                </Box>
                <Box>
                    <ProfileAbout user={user} />
                </Box>
            </Stack>
        </ProfileLayout>
    );
}