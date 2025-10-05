import { Dropdown, Link, Menu, MenuButton, Modal, ModalDialog, Stack, Tooltip, Typography } from "@mui/joy";
import UserAvatar from "./UserAvatar";
import React from "react";
import type { User } from "types/user";
import UserProfileCard from "./UserProfileCard";

type Props = {
    user: User;
    color?: string;
    size?: "sm" | "md" | "lg";
};

export default function UserDisplay({ color, user, size }: Props) {
    // const [openModal, setOpenModal] = React.useState(false);

    const actualSize = size ?? "md";

    return (
        <>
            <Dropdown>
                <MenuButton variant="plain" sx={{ px: 0, py: 0, minHeight: "min-content" }}>
                    <Stack direction="row" gap={1}>
                        <UserAvatar did={user.did} size={actualSize} />
                        <Typography level={`title-${actualSize}`} fontWeight={700} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], })}>
                            {user.displayName}
                        </Typography>
                    </Stack>
                    {/* <Link component="button" onClick={setOpenModal.bind(null, true)} sx={(theme) => ({ color: color ?? theme.vars.palette.neutral[100], textDecorationColor: color ?? theme.vars.palette.neutral[100] })}>
                    </Link> */}
                </MenuButton>
                <Menu variant="soft">
                    <UserProfileCard
                        user={user}
                        />
                </Menu>

            {/* <Tooltip arrow title={<UserProfileCard user={user} />} open={openModal} onClose={setOpenModal.bind(null, false)} variant="soft"> */}
            {/* </Tooltip> */}
            </Dropdown>
        </>
    );
}