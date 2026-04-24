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
                ? <UserAvatar withStatus did={account.sessionInfo.did} size="lg" avatar={account.profile.avatar} />
                // : <Avatar size="lg" color="neutral" variant="solid" sx={{ borderRadius: "lg", width: 48, height: 48 }}>
                //     <IconLogin />
                // </Avatar>}
                : "Login"}
            </MenuButton>
            <Menu placement="bottom" variant="soft">
                {account.authenticated && <UserProfileCard
                    did={account.sessionInfo.did}
                    user={{
                        did: account.sessionInfo.did,
                        handle: account.sessionInfo.handle,
                        displayName: account.profile.displayName ?? account.sessionInfo.handle,
                        description: account.profile.description ?? "",
                        tagline: account.profile.tagline,
                        location: account.profile.location,
                        createdAt: account.profile.createdAt,
                        avatar: account.profile.avatar,
                    }}
                />}
            </Menu>
        </Dropdown>
    );
}