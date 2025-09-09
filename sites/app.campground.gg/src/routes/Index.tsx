import React from "react";
import { FormattedMessage } from "react-intl";
import IndexPageWrapper from "../components/index/IndexPageWrapper";
// import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconBrandDebian } from "@tabler/icons-react";
import { Button, Grid, Link, Stack, Typography } from "@mui/joy";
import PrimaryButton from "../components/PrimaryButton";

export type Props = {

};

export default class Index extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <IndexPageWrapper>
                <Grid container sx={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 5 }} spacing="xl" className="IndexPage top landing-side-padding landing-extreme-top">
                    <Grid gridColumn={1}>
                        <Stack direction="column" className="IndexPage top-motto">
                            <Grid container columns={{ xs: 1 }} gap={1} className="IndexPage top-motto-text">
                                <Grid>
                                    <Typography className="IndexPage top-motto-header" level="h1" fontSize={64} fontWeight={700}>
                                        <FormattedMessage id="home.title" />
                                    </Typography>
                                </Grid>
                                <Grid sx={{ mr: 6 }}>
                                    <Typography className="IndexPage top-motto-subtext" level="body-lg" textAlign="justify">
                                        <FormattedMessage id="home.description" />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Stack direction="row" className="IndexPage top-motto-buttons" gap={1}>
                                <Link underline="none" href="/download">
                                    <PrimaryButton size="lg" variant="solid" startDecorator={<IconBrandDebian />}>
                                        <FormattedMessage id="landing.download.debian" />
                                    </PrimaryButton>
                                </Link>
                                <Button variant="outlined" size="lg" component="a" href="/">
                                    <FormattedMessage id="global.openBrowser" />
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </IndexPageWrapper>
        );
    }
}