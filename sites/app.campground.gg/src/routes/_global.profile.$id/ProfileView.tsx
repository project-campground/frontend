import { Box, Stack } from "@mui/joy";
import ProfileFeed, { ProfileFeedSkeleton } from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";
import ProfileGames from "./ProfileGames";
import ProfileLayout, { ProfileLayoutSkeleton } from "./ProfileLayout";
import ErrorBoundary from "~/components/ErrorBoundary";
import { useMemo, useState } from "react";
import type { ProfileViewDetailed } from "types/campground/user";
import { useBackendApi } from "~/context/api";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { PagePlaceholderFromApi } from "~/components/pages/PagePlaceholder";

type Props = {
    did: string;
};

export default function ProfileView({ did }: Props) {
    const api = useBackendApi();
    const [user, setUser] = useState<ProfileViewDetailed | null>(null);
    const [error, setError] = useState<HttpResponseError | null>(null);

    useMemo(() =>
        api.profiles
            .get(did)
            .then((resp) => {
                if (!resp.ok)
                    return setError(resp);

                return setUser(resp.content);
            })
    , [did]);

    if (error)
        return (
            <PagePlaceholderFromApi response={error} />
        );
    else if (!user)
        return (
            <ProfileViewSkeleton />
        );

    return (
        <ProfileLayout user={user}>
            <ErrorBoundary>
                <Stack direction={{ xs: "column", md: "row" }} sx={{ flex: 1, display: "grid", gridTemplateColumns: { xs: "11fr", md: "2fr 7fr 2fr" }, gap: 6, px: { xs: 2, md: 35 } }}>
                    <Box sx={{ display: { xs: "none", md: "block" }, gridRow: 1 }}>
                        <ProfileGames user={user} />
                    </Box>
                    <Box sx={{ width: "100%", overflow: "hidden", gridRow: { xs: 2, md: 1 } }}>
                        <ProfileFeed user={user} />
                    </Box>
                    <Box sx={{ gridRow: 1 }}>
                        <ProfileAbout user={user} />
                    </Box>
                </Stack>
            </ErrorBoundary>
        </ProfileLayout>
    );
}

export function ProfileViewSkeleton() {
    return (
        <ProfileLayoutSkeleton>
            <ErrorBoundary>
                <Stack direction={{ xs: "column", md: "row" }} sx={{ flex: 1, display: "grid", gridTemplateColumns: { xs: "11fr", md: "2fr 7fr 2fr" }, gap: 6, px: { xs: 2, md: 35 } }}>
                    <Box sx={{ display: { xs: "none", md: "block" }, gridRow: 1 }}>
                        
                    </Box>
                    <Box sx={{ width: "100%", overflow: "hidden", gridRow: { xs: 2, md: 1 } }}>
                        <ProfileFeedSkeleton />
                    </Box>
                    <Box sx={{ gridRow: 1 }}>
                    </Box>
                </Stack>
            </ErrorBoundary>

        </ProfileLayoutSkeleton>
    );
}