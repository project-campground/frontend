import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../components/landing/LandingPageWrapper";
// import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link, Stack, Typography } from "@mui/joy";
import { IconDoorExit, IconMoodAngryFilled } from "@tabler/icons-react";
import PrimaryButton from "../components/PrimaryButton";

export type Props = {

};

export default class NotFound extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <LandingPageWrapper>
                <Stack alignItems="center" className="LandingPage top landing-side-padding landing-extreme-top" gap={1}>
                    <Typography className="LandingPage top-motto-header" level="h1" color="danger" fontSize={48} fontWeight={700}>
                        <IconMoodAngryFilled size={128} />
                    </Typography>
                    <Typography className="LandingPage top-motto-header" level="h1" fontSize={48} fontWeight={700}>
                        <FormattedMessage id="placeholder.notFound.title" />
                    </Typography>
                    <Typography className="LandingPage top-motto-subtext" level="body-lg" textAlign="justify">
                        <FormattedMessage id="placeholder.notFound.description" />
                    </Typography>
                    <Link underline="none" href="/" sx={{ mt: 2 }}>
                        <PrimaryButton startDecorator={<IconDoorExit />}>
                            <FormattedMessage id="placeholder.goBackToHome" />
                        </PrimaryButton>
                    </Link>
                </Stack>
            </LandingPageWrapper>
        );
    }
}