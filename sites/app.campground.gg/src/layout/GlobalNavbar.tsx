import { Box, Divider, Stack, Typography } from "@mui/joy";
import React from "react";
import { GlobalNavbarItem } from "./GlobalNavbarItem";
import NavbarCamp from "~/components/NavbarCamp";
import GlobalNavProfile from "./GlobalNavProfile";
import type { Session, SessionAuthUser } from "~/session/types";
import { Link } from "react-router";

type Props = {
    page: string | null;
    session: Session;
    sessionUser: SessionAuthUser;
};

export default class GlobalNavbar extends React.Component<Props> {
    render() {
        const { session, sessionUser, page } = this.props;
        const activeHome = page === null;

        return (
            <Box sx={{ px: 1, py: 1, width: "100%" }}>
                <Stack direction="row" gap={2} sx={{ width: "100%" }} alignItems="center">
                    <Stack direction="row">
                        <Link to="/">
                            <GlobalNavbarItem className={activeHome ? "active" : ""} sx={{  width: 48, height: 48 }}>
                                <Stack direction="row" sx={{ width: "100%", height: "100%" }} alignItems="center">
                                    <Stack direction="column" sx={{ width: "100%" }} alignItems="center">
                                        <Typography component="svg" sx={{ height: 36, width: 36, stroke: "var(--svg-color)", transition: "stroke 0.4s", strokeWidth: 3 }}>
                                            <use href="#cg-logo" />
                                        </Typography>
                                    </Stack>
                                </Stack>
                                {/* <SvgUse id="cg-logo" className="svg-neutral-500 stroke-5" width="48" height="48" /> */}
                            </GlobalNavbarItem>
                        </Link>
                    </Stack>
                    <Divider orientation="vertical" sx={{ width: 2 }} />
                    <Stack direction="row" sx={{ flex: 1 }} gap={1} >
                        <NavbarCamp name="Example camp" memberCount={30} isActive={true} />
                        <NavbarCamp name="Camp #2" memberCount={500} hasNotification isVerified />
                        <NavbarCamp name="Camp #3" memberCount={500} pingCount={2} />
                        <NavbarCamp name="Camp #4" memberCount={500} hasNotification pingCount={2} />
                    </Stack>
                    <Stack direction="row">
                        <GlobalNavProfile session={session} sessionUser={sessionUser} />
                    </Stack>
                </Stack>
            </Box>
        )
    }
}