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
            <Group component="nav" className="IndexNavbar container landing-side-padding">
                <BrandLogo size="lg" />
                <div className="IndexNavbar spacing" />
                <Group className="IndexNavbar menu">
                    <IndexNavbarItem href="/">
                        <FormattedMessage id="landing.home" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/about">
                        <FormattedMessage id="landing.about" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/blog">
                        <FormattedMessage id="globalNav.blog" />
                    </IndexNavbarItem>
                    <IndexNavbarItem href="/login">
                        <FormattedMessage id="globalNav.login" />
                    </IndexNavbarItem>
                </Group>
            </Group>
        );
    }
}