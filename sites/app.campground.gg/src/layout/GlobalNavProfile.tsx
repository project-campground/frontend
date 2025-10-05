import { Badge, Box, Dropdown, IconButton, Menu, MenuButton, MenuItem } from "@mui/joy";
import UserProfileCard from "~/components/UserProfileCard";

type Props = {

};

function GlobalNavProfileButton(props: Props) {
    return (
        <Badge size="lg" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} color="success" badgeInset={8}>
            <Box sx={(theme) => ({ width:48, height: 48, background: `linear-gradient(to bottom right, ${theme.vars.palette.secondary[500]}, ${theme.vars.palette.secondary[400]})`, borderRadius: theme.vars.radius.lg })}>

            </Box>
        </Badge>
    );
}

export default function GlobalNavProfile(props: Props) {
    return (
        <Dropdown>
            <MenuButton slots={{
                root: IconButton
            }}>
                <GlobalNavProfileButton />
            </MenuButton>
            <Menu placement="bottom" variant="soft">
                <UserProfileCard self
                    user={{
                        did: "did:plc:aaaaa",
                        handle: "example.com",
                        displayName: "Example user",
                        description: "Example description",
                        tagline: "Example tagline",
                        location: null,
                        avatar: null,
                        banner: null,
                        createdAt: new Date().toDateString(),
                }} />
            </Menu>
        </Dropdown>
    );
}