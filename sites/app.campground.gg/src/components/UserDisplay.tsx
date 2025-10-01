import { Link, Stack, Typography } from "@mui/joy";
import type { User } from "api/profiles";
import UserAvatar from "./UserAvatar";

type Props = {
    user: User;
    color?: string;
    size?: "sm" | "md" | "lg";
};

export default function UserDisplay({ color, user, size }: Props) {
    const actualSize = size ?? "md";

    return (
        <Link sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], textDecorationColor: color ?? theme.vars.palette.neutral[100] })}>
            <Stack direction="row" gap={1}>
                <UserAvatar did={user.did} size={actualSize} />
                <Typography level={`title-${actualSize}`} fontWeight={700} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], })}>
                    {user.displayName}
                </Typography>
            </Stack>
        </Link>
    );
}