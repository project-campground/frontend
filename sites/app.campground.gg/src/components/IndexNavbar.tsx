import React from "react";
import BrandLogo from "./BrandLogo";
import IndexNavbarItem from "./IndexNavbarItem";
import { Group } from "@mantine/core";
import { FormattedMessage } from "react-intl";

export type Props = {
    page: string;
};

export default class IndexNavbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <Group component="nav" className="IndexNavbar container landing-side-padding-nav">
                <Group className="IndexNavbar menu center" gap={0}>
                    <IndexNavbarItem href="/">
                        <BrandLogo includeText />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/about">
                        <FormattedMessage id="landing.about" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/features">
                        <FormattedMessage id="landing.features" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/blog">
                        <FormattedMessage id="global.blog" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/docs">
                        <FormattedMessage id="global.docs" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/api">
                        <FormattedMessage id="global.api" />
                    </IndexNavbarItem>
                </Group>
                <Group className="IndexNavbar menu" gap={0}>
                    <IndexNavbarItem href="/download">
                        <FormattedMessage id="global.download" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/login" variant="gradient">
                        <FormattedMessage id="global.login" />
                    </IndexNavbarItem>
                </Group>
            </Group>
        );
    }
}