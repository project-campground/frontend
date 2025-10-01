import { Badge, Box, Divider, Stack, Typography } from "@mui/joy";
import React from "react";
import { GlobalNavbarItem } from "./GlobalNavbarItem";
import NavbarCamp from "~/components/NavbarCamp";

type Props = {
    page: string | null;
};

export default class GlobalNavbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const { page } = this.props;
        const activeHome = page === null;

        return (
            <Box sx={{ px: 1, py: 1, width: "100%" }}>
                <Stack direction="row" gap={2} sx={{ width: "100%" }} alignItems="center">
                    <Stack direction="row">
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
                    </Stack>
                    <Divider orientation="vertical" sx={{ width: 2 }} />
                    <Stack direction="row" sx={{ flex: 1 }} gap={1} >
                        <NavbarCamp name="Example camp" memberCount={30} isActive={true} />
                        <NavbarCamp name="Camp #2" memberCount={500} hasNotification isVerified />
                        <NavbarCamp name="Camp #3" memberCount={500} pingCount={2} />
                        <NavbarCamp name="Camp #4" memberCount={500} hasNotification pingCount={2} />
                    </Stack>
                    <Stack direction="row">
                        <Badge size="lg" anchorOrigin={{ horizontal: "right", vertical: "bottom" }} color="success" badgeInset={8}>
                            <Box sx={(theme) => ({ width:48, height: 48, background: `linear-gradient(to bottom right, ${theme.vars.palette.secondary[500]}, ${theme.vars.palette.secondary[400]})`, borderRadius: theme.vars.radius.lg })}>

                            </Box>
                        </Badge>
                    </Stack>
                </Stack>
            </Box>
        )
    }
}