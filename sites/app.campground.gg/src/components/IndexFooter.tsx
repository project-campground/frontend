import React from "react";
import BrandLogo from "./BrandLogo";
import IndexFooterItem from "./IndexNavbarItem";
import { SimpleGrid, Stack } from "@mantine/core";
import IndexFooterSection from "./IndexFooterSection";
import { FormattedMessage } from "react-intl";

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
                <SimpleGrid className="IndexNavbar menu" cols={5} spacing="xl">
                    <IndexFooterSection header="Socials">
                        <IndexFooterItem href="https://github.com/Project-Campground">GitHub</IndexFooterItem>
                        <IndexFooterItem href="bsky.app/profile/campground.gg">Bluesky</IndexFooterItem>
                        <IndexFooterItem href="https://discord.com/invite/jasJ97UXDM">Discord</IndexFooterItem>
                        <IndexFooterItem href="https://x.com/teamcampground">X/Twitter</IndexFooterItem>
                    </IndexFooterSection>
                    <IndexFooterSection header="Resources">
                        <IndexFooterItem href="/blog">
                            <FormattedMessage id="globalNav.blog" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/docs">
                            <FormattedMessage id="globalNav.docs" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/api">
                            <FormattedMessage id="globalNav.api" />
                        </IndexFooterItem>
                        <IndexFooterItem href="/support">
                            <FormattedMessage id="globalNav.support" />
                        </IndexFooterItem>
                    </IndexFooterSection>
                </SimpleGrid>
            </Stack>
        );
    }
}