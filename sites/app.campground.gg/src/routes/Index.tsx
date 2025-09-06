import React from "react";
import { FormattedMessage } from "react-intl";
import IndexPageWrapper from "../components/IndexPageWrapper";
import { Flex, Text } from "@mantine/core";

export type Props = {

};

export default class Index extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <IndexPageWrapper>
                <Flex direction="column" className="landing-side-padding landing-extreme-top">
                    <Text size="xl" fz="h1" fw={900}><FormattedMessage id="home.title" /></Text>
                    <Text size="lg" fz="h2"><FormattedMessage id="home.description" /></Text>
                </Flex>
            </IndexPageWrapper>
        );
    }
}