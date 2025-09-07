import React from "react";
import BrandLogo from "./BrandLogo";
import IndexFooterItem from "./IndexFooterItem";
import { SimpleGrid, Stack } from "@mantine/core";
import IndexFooterSection from "./IndexFooterSection";
import { FormattedMessage } from "react-intl";
import { IconBrandBluesky, IconBrandDiscord, IconBrandGithub, IconBrandX } from "@tabler/icons-react";

export type Props = {
};

export default class IndexFooter extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Stack className="IndexFooter container landing-side-padding">
                <BrandLogo includeText size="xl" />
                <SimpleGrid className="IndexNavbar menu" cols={4} spacing="xl">
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
                    <IndexFooterSection header="global.discover">
                        <IndexFooterItem href="/discover/camps">
                            <FormattedMessage id="global.camps" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/discover/instances">
                            <FormattedMessage id="global.instances" />
                        </IndexFooterItem>
                    </IndexFooterSection>
                </SimpleGrid>
            </Stack>
        );
    }
}