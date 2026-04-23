import { Button, Dropdown, IconButton, Menu, MenuButton } from "@mui/joy";
import { IconLogin } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import UserAvatar from "~/components/UserAvatar";
import UserProfileCard from "~/layout/UserProfileCard";
import { useAccount } from "~/context/account";

export default function GlobalNavProfile() {
    const account = useAccount();
    const navigate = useNavigate();

    return (
        <Dropdown>
            <MenuButton slots={{
                root: account.authenticated ? IconButton : Button
            }} slotProps={{
                root: account.authenticated ? {} : { variant: "glow", color: "primary", startDecorator: <IconLogin />, onClick: () => navigate("/login") }
            }}>
                {account.authenticated
                ? <UserAvatar withStatus did={account.account.did} size="lg" avatar={account.me.avatar} />
                // : <Avatar size="lg" color="neutral" variant="solid" sx={{ borderRadius: "lg", width: 48, height: 48 }}>
                //     <IconLogin />
                // </Avatar>}
                : "Login"}
            </MenuButton>
            <Menu placement="bottom" variant="soft">
                {account.authenticated && <UserProfileCard
                    did={account.account.did}
                    user={{
                        did: account.account.did,
                        handle: account.account.handle,
                        displayName: account.me.displayName ?? account.account.handle,
                        description: account.me.description ?? "",
                        tagline: account.me.tagline,
                        location: account.me.location,
                        createdAt: account.me.createdAt,
                        avatar: account.me.avatar,
                    }}
                />}
            </Menu>
        </Dropdown>
    );
}