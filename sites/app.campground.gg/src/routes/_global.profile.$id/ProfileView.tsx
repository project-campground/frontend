import ProfileLayout, { ProfileLayoutSkeleton } from "./ProfileLayout";
import ErrorBoundary from "~/components/ErrorBoundary";
import { useMemo, useState } from "react";
import type { ProfileViewDetailed } from "types/campground/user";
import { useBackendApi } from "~/context/api";
import type { HttpResponseError } from "~/api/http/HTTPResponse";
import { PagePlaceholderFromApi } from "~/components/pages/PagePlaceholder";
import ProfileContent, { ProfileContentSkeleton } from "./ProfileContent";
import { Box, styled } from "@mui/joy";
import ProfileGames from "./ProfileGames";
import ProfileAbout from "./ProfileAbout";

type Props = {
    did: string;
};

const ProfileMobileSidebarRoot = styled(Box, {
    name: "ProfileLayout",
    slot: "root",
})(({ theme }) => ({
    padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    backgroundColor: theme.vars.palette.background.level1,
    overflowY: "auto",
    scrollSnapAlign: "start",
    [theme.breakpoints.up("lg")]: {
        display: "none",
    }
}));

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
        <>
            <ProfileMobileSidebarRoot>
                <ProfileGames user={user} />
            </ProfileMobileSidebarRoot>
            <ProfileLayout user={user}>
                <ErrorBoundary>
                    <ProfileContent user={user} />
                </ErrorBoundary>
            </ProfileLayout>
            <ProfileMobileSidebarRoot>
                <ProfileAbout user={user} />
            </ProfileMobileSidebarRoot>
        </>
    );
}

export function ProfileViewSkeleton() {
    return (
        <ProfileLayoutSkeleton>
            <ErrorBoundary>
                <ProfileContentSkeleton />
            </ErrorBoundary>
        </ProfileLayoutSkeleton>
    );
}