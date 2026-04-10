import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../components/landing/LandingPageWrapper";
import { Button, Link, Stack, Typography } from "@mui/joy";
import { IconDoorExit, IconMoodAngryFilled } from "@tabler/icons-react";


export type Props = {

};

export default class NotFound extends React.Component<Props> {

    render() {
        return (
            <LandingPageWrapper>
                <Stack alignItems="center" className="LandingPage top landing-side-padding" gap={1} sx={{ pt: 24, height: `calc(100vh - 72px)` }}>
                    <Typography className="LandingPage motto-header" level="h1" color="danger" fontSize={48} fontWeight={700}>
                        <IconMoodAngryFilled size={128} />
                    </Typography>
                    <Typography className="LandingPage motto-header" level="h1" fontSize={48} fontWeight={700}>
                        <FormattedMessage id="placeholder.notFound.title" />
                    </Typography>
                    <Typography className="LandingPage motto-subtext" level="body-lg" textAlign="justify">
                        <FormattedMessage id="placeholder.notFound.desc" />
                    </Typography>
                    <Link underline="none" href="/" sx={{ mt: 2 }}>
                        <Button variant="glow" color="primary" component="button" startDecorator={<IconDoorExit />}>
                            <FormattedMessage id="placeholder.goBackToHome" />
                        </Button>
                    </Link>
                </Stack>
            </LandingPageWrapper>
        );
    }
}