import React from "react";
import BrandLogo from "./BrandLogo";
import IndexFooterItem from "./IndexFooterItem";
import IndexFooterSection from "./IndexFooterSection";
import { FormattedMessage } from "react-intl";
import { IconAffiliateFilled, IconBrandBluesky, IconBrandDiscord, IconBrandGithub, IconBrandX, IconCamper, IconCampfireFilled, IconChristmasTreeFilled, IconUsersGroup } from "@tabler/icons-react";
import { Grid, Stack } from "@mui/joy";

export type Props = {
};

export default class IndexFooter extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Stack direction="column" className="IndexFooter container landing-side-padding" gap={2.5}>
                <BrandLogo includeText size="xl" />
                <Grid container sx={{ display: "grid", gridTemplateColumns: `1fr 1fr 1fr 1fr`}} className="IndexNavbar menu" spacing={8}>
                    <IndexFooterSection header="global.socialMedia">
                        <IndexFooterItem icon={<IconBrandGithub />} href="https://github.com/Project-Campground">GitHub</IndexFooterItem>
                        <IndexFooterItem icon={<IconBrandBluesky />} href="https://bsky.app/profile/campground.gg">Bluesky</IndexFooterItem>
                        <IndexFooterItem icon={<IconBrandDiscord />} href="https://discord.com/invite/jasJ97UXDM">Discord</IndexFooterItem>
                        <IndexFooterItem icon={<IconBrandX />} href="https://x.com/teamcampground">X/Twitter</IndexFooterItem>
                    </IndexFooterSection>
                    <IndexFooterSection header="global.resources">
                        <IndexFooterItem href="/blog">
                            <FormattedMessage id="global.blog" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/docs">
                            <FormattedMessage id="global.docs" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/api">
                            <FormattedMessage id="global.api" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/support">
                            <FormattedMessage id="global.support" />
                        </IndexFooterItem>
                    </IndexFooterSection>
                    <IndexFooterSection header="global.brand">
                        <IndexFooterItem href="/brandkit" icon={<IconAffiliateFilled />}>
                            <FormattedMessage id="landing.brandkit" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/team" icon={<IconUsersGroup />}>
                            <FormattedMessage id="landing.team" />
                        </IndexFooterItem>
                    </IndexFooterSection>
                    <IndexFooterSection header="global.discover">
                        <IndexFooterItem href="/discover/instances" icon={<IconChristmasTreeFilled />}>
                            <FormattedMessage id="global.instances" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/discover/campsites" icon={<IconCampfireFilled />}>
                            <FormattedMessage id="global.campsites" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/discover/campers" icon={<IconCamper />}>
                            <FormattedMessage id="global.campers" />
                        </IndexFooterItem>
                    </IndexFooterSection>
                </Grid>
            </Stack>
        );
    }
}