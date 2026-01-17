import { Dropdown, IconButton, Menu, MenuButton } from "@mui/joy";
import { IconLogin } from "@tabler/icons-react";
import { PrimaryButton } from "components";
import { useNavigate } from "react-router";
import UserAvatar from "~/components/UserAvatar";
import UserProfileCard from "~/components/UserProfileCard";
import { useMeContext } from "~/context/session";

export default function GlobalNavProfile() {
    const me = useMeContext();
    const navigate = useNavigate();

    return (
        <Dropdown>
            <MenuButton slots={{
                root: me ? IconButton : PrimaryButton
            }} slotProps={{
                root: me ? {} : { startDecorator: <IconLogin />, onClick: () => navigate("/login") }
            }}>
                {me
                ? <UserAvatar withStatus did={me.profile.did} size="lg" avatar={me.profile.avatar} />
                // : <Avatar size="lg" color="neutral" variant="solid" sx={{ borderRadius: "lg", width: 48, height: 48 }}>
                //     <IconLogin />
                // </Avatar>}
                : "Login"}
            </MenuButton>
            <Menu placement="bottom" variant="soft">
                {me && <UserProfileCard
                    did={me.profile.did}
                    user={me.profile}
                />}
            </Menu>
        </Dropdown>
    );
}