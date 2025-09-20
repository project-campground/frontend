import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../../components/landing/LandingPageWrapper";
import { IconCalendarFilled, IconCampfireFilled, IconCheckbox, IconFileTextFilled, IconLockFilled, IconServer } from "@tabler/icons-react";
import { Box, Grid, Stack, Typography } from "@mui/joy"
import FeatureCard from "../../components/landing/FeatureCard";

export type Props = {

};

export default class Features extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <LandingPageWrapper>
                <Box className="LandingPage content landing-side-padding landing-extreme-top" sx={{ mb: 15 }}>
                    <Stack direction="column" className="LandingPage top-motto" gap={1} alignItems="center">
                        <Typography className="LandingPage top-motto-header" level="h1" fontSize={64} fontWeight={700}>
                            <FormattedMessage id="features.title" />
                        </Typography>
                        <Typography className="LandingPage top-motto-subtext" level="body-lg" textAlign="justify">
                            <FormattedMessage id="features.description" />
                        </Typography>
                    </Stack>
                </Box>
                <Grid container sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, mb: 10 }} spacing="xl" className="LandingPage content landing-side-padding">
                    <FeatureCard
                        title="features.campfires.title"
                        description="features.campfires.description"
                        icon={<IconCampfireFilled />}
                        href="/docs/features/campfires"
                        imgSrc="/example-banner.svg"
                    />
                    <FeatureCard
                        title="features.instances.title"
                        description="features.instances.description"
                        icon={<IconServer />}
                        href="/docs/features/instances"
                        imgSrc="/example-banner.svg"
                        color="warning"
                    />
                    <FeatureCard
                        title="features.encryption.title"
                        description="features.encryption.description"
                        icon={<IconLockFilled />}
                        href="/docs/features/encryption"
                        imgSrc="/example-banner.svg"
                        color="info"
                    />
                    <FeatureCard
                        title="features.calendarTents.title"
                        description="features.calendarTents.description"
                        icon={<IconCalendarFilled />}
                        href="/docs/features/calendar-tents"
                        imgSrc="/example-banner.svg"
                        color="danger"
                    />
                    <FeatureCard
                        title="features.listTents.title"
                        description="features.listTents.description"
                        icon={<IconCheckbox />}
                        href="/docs/features/list-tents"
                        imgSrc="/example-banner.svg"
                        color="success"
                    />
                    <FeatureCard
                        title="features.docTents.title"
                        description="features.docTents.description"
                        icon={<IconFileTextFilled />}
                        href="/docs/features/doc-tents"
                        imgSrc="/example-banner.svg"
                        color="secondary"
                    />
                </Grid>
            </LandingPageWrapper>
        );
    }
}