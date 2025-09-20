import React from "react";
import BrandLogo from "../BrandLogo";
import LandingNavbarItem from "./LandingNavbarItem";
import { FormattedMessage } from "react-intl";
import { Box, Link, Stack } from "@mui/joy";
import LandingNavbarPrimary from "./LandingNavbarPrimary";

export type Props = {
    page: string;
};

export default class LandingNavbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Box sx={(theme) => ({ position: "sticky", top: 0, zIndex: 20, backgroundColor: theme.vars.palette.background.transparent })}>
                <Stack direction="row" component="nav" className="LandingNavbar container landing-side-padding-nav" sx={{ py: 1 }}>
                    <Stack direction="row" className="LandingNavbar menu" alignItems="center" flex={1} gap={0}>
                        <Link component="a" href="/" color="neutral" className="LandingNavbarItem container" underline="none" sx={{ px: 2, py: 0.5 }}>
                            <BrandLogo includeText />
                        </Link>
                        <LandingNavbarItem href="/docs/features">
                            <FormattedMessage id="landing.features" />
                        </LandingNavbarItem>
                        <LandingNavbarItem href="/blog">
                            <FormattedMessage id="global.blog" />
                        </LandingNavbarItem>
                        <LandingNavbarItem href="/docs">
                            <FormattedMessage id="global.docs" />
                        </LandingNavbarItem>
                        <LandingNavbarItem href="/docs/api">
                            <FormattedMessage id="global.api" />
                        </LandingNavbarItem>
                    </Stack>
                    <Stack direction="row" className="LandingNavbar menu" alignItems="center" gap={0}>
                        <LandingNavbarItem href="/downloads">
                            <FormattedMessage id="global.download" />
                        </LandingNavbarItem>
                        <LandingNavbarPrimary href="/login">
                            <FormattedMessage id="form.login" />
                        </LandingNavbarPrimary>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}