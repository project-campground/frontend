import { Dropdown, IconButton, Menu, MenuButton } from "@mui/joy";
import UserAvatar from "~/components/UserAvatar";
import UserProfileCard from "~/components/UserProfileCard";
import type { Session, SessionAuthUser } from "~/session/types";

type Props = {
    session: Session;
    sessionUser: SessionAuthUser;
};

export default function GlobalNavProfile({ sessionUser }: Props) {
    return (
        <Dropdown>
            <MenuButton slots={{
                root: IconButton
            }}>
                <UserAvatar did={sessionUser.did} size="lg" />
            </MenuButton>
            <Menu placement="bottom" variant="soft">
                <UserProfileCard self
                    did={sessionUser.did}
                    // user={{
                    //     did: sessionUser.did,
                    //     handle: sessionUser.handle,
                    //     displayName: sessionUser.handle,
                    //     description: "Example description",
                    //     tagline: "Example tagline",
                    //     location: null,
                    //     avatar: null,
                    //     banner: null,
                    //     createdAt: new Date().toDateString(),
                    // }}
                />
            </Menu>
        </Dropdown>
    );
}