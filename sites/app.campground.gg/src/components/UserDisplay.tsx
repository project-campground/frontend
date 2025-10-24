import { Dropdown, Menu, MenuButton, Stack, Typography } from "@mui/joy";
import UserAvatar from "./UserAvatar";
import type { User } from "types/user";
import UserProfileCard from "./UserProfileCard";

type Size = "sm" | "md" | "lg";

type Props = {
    user: User;
    color?: string;
    size?: Size;
    avatarSize?: Size;
    showHandle?: boolean;
    alignItems?: "center" | "start" | "end";
};

const sizeToGap: Record<Size, number> = {
    sm: 1,
    md: 1.5,
    lg: 2,
};

export default function UserDisplay({ color, user, size, avatarSize, alignItems, showHandle }: Props) {
    // const [openModal, setOpenModal] = React.useState(false);

    const actualSize = size ?? "md";

    return (
        <>
            <Dropdown>
                <MenuButton variant="plain" sx={{ px: 0, py: 0, minHeight: "min-content" }}>
                    <Stack direction="row" gap={sizeToGap[actualSize]} alignItems={alignItems ?? "center"}>
                        <UserAvatar did={user.did} size={avatarSize ?? actualSize} />
                        <Typography level={`title-${actualSize}`} fontWeight={700} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], })}>
                            {user.displayName}
                        </Typography>
                        {
                            showHandle && <>
                                <Typography level="body-md" fontWeight={500} textColor="text.tertiary">@{user.handle.split("/")[2]}</Typography>
                            </>
                        }
                    </Stack>
                    {/* <Link component="button" onClick={setOpenModal.bind(null, true)} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], textDecorationColor: color ?? theme.vars.palette.neutral[100] })}>
                    </Link> */}
                </MenuButton>
                <Menu variant="soft">
                    <UserProfileCard
                        did={user.did}
                        user={user}
                        />
                </Menu>

            {/* <Tooltip arrow title={<UserProfileCard user={user} />} open={openModal} onClose={setOpenModal.bind(null, false)} variant="soft"> */}
            {/* </Tooltip> */}
            </Dropdown>
        </>
    );
}