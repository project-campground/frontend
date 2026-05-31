import type { ProfileViewDetailed } from "types/campground/user";
import { Box, styled } from "@mui/joy";
import ProfileGames from "./ProfileGames";
import ProfileFeed, { ProfileFeedSkeleton } from "./ProfileFeed";
import ProfileAbout from "./ProfileAbout";

const ProfileContentRoot = styled(Box, {
    name: "ProfileContent",
    slot: "root",
})(({ theme }) => ({
    display: "grid",
    flex: 1,
    gap: theme.spacing(6),
    gridTemplateColumns: "11fr",
    padding: 0,
    [theme.breakpoints.up("md")]: {
        padding: `0 ${theme.spacing(16)}`,
    },
    [theme.breakpoints.up("lg")]: {
        padding: `0 ${theme.spacing(20)}`,
        gridTemplateColumns: "2fr 7fr 2fr",
    },
    [theme.breakpoints.up("xl")]: {
        padding: `0 ${theme.spacing(24)}`,
    },
}));
const ProfileSideColumn = styled(Box, {
    name: "ProfileContent",
    slot: "sideColumn",
})(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
        display: "none"
    },
}));

export default function ProfileContent({ user }: { user: ProfileViewDetailed; }) {
    return (
        <ProfileContentRoot>
            <ProfileSideColumn>
                <ProfileGames user={user} />
            </ProfileSideColumn>
            <Box sx={{ width: "100%", overflow: "hidden" }}>
                <ProfileFeed user={user} />
            </Box>
            <ProfileSideColumn>
                <ProfileAbout user={user} />
            </ProfileSideColumn>
        </ProfileContentRoot>
    );
}

export function ProfileContentSkeleton() {
    return (
        <ProfileContentRoot>
            <ProfileSideColumn>
                
            </ProfileSideColumn>
            <Box>
                <ProfileFeedSkeleton />
            </Box>
            <ProfileSideColumn>
                
            </ProfileSideColumn>
        </ProfileContentRoot>
    );
}