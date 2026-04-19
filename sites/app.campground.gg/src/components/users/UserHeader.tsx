import { AspectRatio, Skeleton, Box } from "@mui/joy";
import GradientBanner from "../pages/GradientBanner";
import { Image } from "components";
import UserAvatar, { UserAvatarSkeleton } from "../UserAvatar";

export function UserHeaderBanner({ isLoading, src, aspectRatio }: { aspectRatio?: number; isLoading?: boolean; did: string; src?: string | null; }) {
    return (
        <AspectRatio ratio={aspectRatio ?? 3} sx={{ borderRadius: "sm" }}>
            {isLoading
            ? <Skeleton loading sx={{ zIndex: 0 }}>
            </Skeleton>
            : src
            ? <Image src={src} />
            : <GradientBanner color="primary" sx={{ zIndex: "inherit", width: "100%", height: "100%", }}>

            </GradientBanner>
            }
        </AspectRatio>
    );
}
export function UserHeaderAvatar({ isLoading, src, did }: { isLoading?: boolean; did: string; src?: string | null; }) {
    return (
        isLoading
        ? <UserAvatarSkeleton withStatus size="xxl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.background.level2}` })} />
        : <UserAvatar withStatus avatar={src} did={did} size="xxl" sx={(theme) => ({ border: `solid 4px ${theme.vars.palette.neutral.softBg}` })} />
    );
}
export default function UserHeader({ isLoading, did, banner, avatar, bannerAspectRatio }: { bannerAspectRatio?: number; isLoading?: boolean; did: string; avatar?: string | null; banner?: string | null; }) {
    return (
        <Box>
            <Box>
                <UserHeaderBanner isLoading={isLoading} did={did} src={banner} aspectRatio={bannerAspectRatio} />
            </Box>
            <Box sx={{ mt: -6, px: 1.5, zIndex: 2 }}>
                <UserHeaderAvatar isLoading={isLoading} did={did} src={avatar} />
            </Box>
        </Box>
    );
} 