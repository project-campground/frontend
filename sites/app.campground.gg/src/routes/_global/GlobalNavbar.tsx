import { Box, CircularProgress, Divider, Stack, Typography } from "@mui/joy";
import NavbarCamp from "~/components/NavbarCamp";
import GlobalNavProfile from "./GlobalNavProfile";
import NavbarButton from "~/components/NavbarButton";
import { IconCompassFilled, IconPlus } from "@tabler/icons-react";
import { useMeContext } from "~/context/session";

type Props = {
    loaded: boolean;
    page: string | undefined | null;
};

const homePages = ["friends"]

export default function GlobalNavbar({ page, loaded }: Props) {
    const me = useMeContext();

    console.log("Me", me);
    return (
        <Box sx={{ px: 1, py: 1, width: "100%" }}>
            <Stack direction="row" gap={2} sx={{ width: "100%" }} alignItems="center">
                <Stack direction="row">
                    <NavbarButton href="/" isActive={!page || homePages.includes(page)}>
                        <Stack direction="row" sx={{ width: "100%" }} alignItems="center">
                            <Typography component="svg" sx={{ height: 36, width: 36, stroke: "var(--svg-color)", transition: "stroke 0.4s", strokeWidth: 3 }}>
                                <use href="#cg-logo" />
                            </Typography>
                        </Stack>
                    </NavbarButton>
                </Stack>
                <Divider orientation="vertical" sx={{ width: 2 }} />
                <Stack direction="row" sx={{ flex: 1, overflowX: "scroll", overflowY: "hidden" }} gap={1}>
                    {me?.campsites.map((x) =>
                        <NavbarCamp key={x.id} id={x.id} avatar={x.avatarUri ?? undefined} name={x.name} memberCount={x.memberCount} isActive={page === x.id} />
                    )}
                    {!loaded && <CircularProgress />}
                    {me && <NavbarButton href="/c/create" isActive={page === "create"}>
                        <IconPlus />
                    </NavbarButton>}
                    <NavbarButton href="/discover" isActive={page === "discover"}>
                        <IconCompassFilled />
                    </NavbarButton>
                </Stack>
                <Stack direction="row">
                    <GlobalNavProfile />
                </Stack>
            </Stack>
        </Box>
    );
}