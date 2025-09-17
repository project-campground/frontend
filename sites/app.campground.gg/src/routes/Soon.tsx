import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../components/index/LandingPageWrapper";
// import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { Link, Stack, Typography } from "@mui/joy";
import { IconDoorExit, IconMoodSadFilled } from "@tabler/icons-react";
import PrimaryButton from "../components/PrimaryButton";

export type Props = {

};

export default class Soon extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <LandingPageWrapper>
                <Stack alignItems="center" className="IndexPage top landing-side-padding landing-extreme-top" gap={1}>
                    <Typography className="IndexPage top-motto-header" level="h1" color="info" fontSize={48} fontWeight={700}>
                        <IconMoodSadFilled size={128} />
                    </Typography>
                    <Typography className="IndexPage top-motto-header" level="h1" fontSize={48} fontWeight={700}>
                        <FormattedMessage id="placeholder.underConstruction.title" />
                    </Typography>
                    <Typography className="IndexPage top-motto-subtext" level="body-lg" textAlign="justify">
                        <FormattedMessage id="placeholder.underConstruction.description" />
                    </Typography>
                    <Link underline="none" href="/" sx={{ mt: 2 }}>
                        <PrimaryButton startDecorator={<IconDoorExit />}>
                            <FormattedMessage id="underConstruction.goBackToHome" />
                        </PrimaryButton>
                    </Link>
                </Stack>
            </LandingPageWrapper>
        );
    }
}