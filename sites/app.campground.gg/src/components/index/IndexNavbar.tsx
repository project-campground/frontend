import React from "react";
import BrandLogo from "../BrandLogo";
import IndexNavbarItem from "./IndexNavbarItem";
import { FormattedMessage } from "react-intl";
import { Box, Link, Stack } from "@mui/joy";
import IndexNavbarPrimary from "./IndexNavbarPrimary";

export type Props = {
    page: string;
};

export default class IndexNavbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Box sx={(theme) => ({ position: "sticky", top: 0, zIndex: 20, backgroundColor: theme.vars.palette.background.transparent })}>
                <Stack direction="row" component="nav" className="IndexNavbar container landing-side-padding-nav">
                    <Stack direction="row" className="IndexNavbar menu" alignItems="center" flex={1} gap={0}>
                        <Link component="a" href="/" color="neutral" className="IndexNavbarItem container" underline="none" sx={{ px: 2, py: 0.5 }}>
                            <BrandLogo includeText />
                        </Link>
                        <IndexNavbarItem href="/docs/features">
                            <FormattedMessage id="landing.features" />
                        </IndexNavbarItem>
                        <IndexNavbarItem href="/blog">
                            <FormattedMessage id="global.blog" />
                        </IndexNavbarItem>
                        <IndexNavbarItem href="/docs">
                            <FormattedMessage id="global.docs" />
                        </IndexNavbarItem>
                        <IndexNavbarItem href="/docs/api">
                            <FormattedMessage id="global.api" />
                        </IndexNavbarItem>
                    </Stack>
                    <Stack direction="row" className="IndexNavbar menu" alignItems="center" gap={0}>
                        <IndexNavbarItem href="/downloads">
                            <FormattedMessage id="global.download" />
                        </IndexNavbarItem>
                        <IndexNavbarPrimary href="/login">
                            <FormattedMessage id="form.login" />
                        </IndexNavbarPrimary>
                    </Stack>
                </Stack>
            </Box>
        );
    }
}