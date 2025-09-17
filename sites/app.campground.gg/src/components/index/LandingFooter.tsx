import React from "react";
import BrandLogo from "../BrandLogo";
import LandingFooterItem from "./LandingFooterItem";
import LandingFooterSection from "./LandingFooterSection";
import { FormattedMessage } from "react-intl";
import { IconAffiliateFilled, IconBrandBluesky, IconBrandDiscord, IconBrandGithub, IconBrandX, IconCamper, IconCampfireFilled, IconChristmasTreeFilled, IconUsersGroup } from "@tabler/icons-react";
import { Grid, Stack } from "@mui/joy";

export type Props = {
};

export default class LandingFooter extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Stack direction="column" className="IndexFooter container landing-side-padding" gap={2.5}>
                <BrandLogo includeText size="xl" />
                <Grid container sx={{ display: "grid", gridTemplateColumns: `1fr 1fr 1fr 1fr`}} className="IndexNavbar menu" spacing={8}>
                    <LandingFooterSection header="global.socialMedia">
                        <LandingFooterItem icon={<IconBrandGithub />} href="https://github.com/Project-Campground">GitHub</LandingFooterItem>
                        <LandingFooterItem icon={<IconBrandBluesky />} href="https://bsky.app/profile/campground.gg">Bluesky</LandingFooterItem>
                        <LandingFooterItem icon={<IconBrandDiscord />} href="https://discord.com/invite/jasJ97UXDM">Discord</LandingFooterItem>
                        <LandingFooterItem icon={<IconBrandX />} href="https://x.com/teamcampground">X/Twitter</LandingFooterItem>
                    </LandingFooterSection>
                    <LandingFooterSection header="global.resources">
                        <LandingFooterItem href="/blog">
                            <FormattedMessage id="global.blog" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/docs">
                            <FormattedMessage id="global.docs" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/api">
                            <FormattedMessage id="global.api" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/support">
                            <FormattedMessage id="global.support" />
                        </LandingFooterItem>
                    </LandingFooterSection>
                    <LandingFooterSection header="global.brand">
                        <LandingFooterItem href="/brandkit" icon={<IconAffiliateFilled />}>
                            <FormattedMessage id="landing.brandkit" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/team" icon={<IconUsersGroup />}>
                            <FormattedMessage id="landing.team" />
                        </LandingFooterItem>
                    </LandingFooterSection>
                    <LandingFooterSection header="global.discover">
                        <LandingFooterItem href="/discover/instances" icon={<IconChristmasTreeFilled />}>
                            <FormattedMessage id="global.instances" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/discover/campsites" icon={<IconCampfireFilled />}>
                            <FormattedMessage id="global.campsites" />
                        </LandingFooterItem>
                        <LandingFooterItem href="/discover/campers" icon={<IconCamper />}>
                            <FormattedMessage id="global.campers" />
                        </LandingFooterItem>
                    </LandingFooterSection>
                </Grid>
            </Stack>
        );
    }
}