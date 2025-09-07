import React from "react";
import { FormattedMessage } from "react-intl";
import IndexPageWrapper from "../components/IndexPageWrapper";
import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconBrandDebian } from "@tabler/icons-react";

export type Props = {

};

export default class Index extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <IndexPageWrapper>
                <SimpleGrid cols={2} spacing="xl" className="IndexPage top landing-side-padding landing-extreme-top">
                    <Stack className="IndexPage top-motto">
                        <SimpleGrid className="IndexPage top-motto-text" cols={1}>
                            <Text className="IndexPage top-motto-header" component="h1" size="xl" fz={48} fw={700}><FormattedMessage id="home.title" /></Text>
                            <Text className="IndexPage top-motto-subtext" size="lg" fz="h4"><FormattedMessage id="home.description" /></Text>
                        </SimpleGrid>
                        <Group className="IndexPage top-motto-buttons" gap="xs">
                            <Button size="lg" variant="gradient" leftSection={<IconBrandDebian />} component="a" href="/">
                                <FormattedMessage id="landing.download.debian" />
                            </Button>
                            <Button variant="outline" size="lg" component="a" href="/">
                                <FormattedMessage id="global.openBrowser" />
                            </Button>
                        </Group>
                    </Stack>
                </SimpleGrid>
            </IndexPageWrapper>
        );
    }
}