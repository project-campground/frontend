import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../../components/landing/LandingPageWrapper";
import { IconBrandAndroid, IconBrandApple, IconBrandDebian, IconBrandGooglePlay, IconBrandWindows, IconDownload, IconFeather } from "@tabler/icons-react";
import { Grid, Link, Option, Select, Stack, Typography } from "@mui/joy";
import PrimaryButton from "../../components/PrimaryButton";
import DownloadCard from "../../components/landing/DownloadCard";

export type Props = {

};

export default class Downloads extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <LandingPageWrapper>
                <Grid container sx={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 5, height: `calc(100vh - 72px)`, pt: 24 }} spacing="xl" className="LandingPage top landing-side-padding">
                    <Grid gridColumn={1}>
                        <Stack direction="column" className="LandingPage top-motto" gap={1}>
                            <Grid container sx={{ mb: 3 }} columns={{ xs: 1 }} gap={1} className="LandingPage motto-text">
                                <Grid>
                                    <Typography className="LandingPage motto-header" level="h1" fontSize={64} fontWeight={700}>
                                        <FormattedMessage id="downloads.title" />
                                    </Typography>
                                </Grid>
                                <Grid sx={{ mr: 6 }}>
                                    <Typography className="LandingPage motto-subtext" level="body-lg" textAlign="justify">
                                        <FormattedMessage id="downloads.description" />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Stack direction="column" gap={1}>
                                <Stack direction="row" className="LandingPage motto-buttons" gap={1}>
                                    <Link underline="none" href="/download">
                                        <PrimaryButton size="lg" variant="solid" startDecorator={<IconBrandDebian />}>
                                            <FormattedMessage id="landing.download.debian" />
                                        </PrimaryButton>
                                    </Link>
                                </Stack>
                                <Link href="/downloads#desktop" color="neutral">
                                    <FormattedMessage id="downloads.wrongDevice" />
                                </Link>
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid gridColumn={2}></Grid>
                </Grid>
                <Grid container sx={{ mb: 16, display: "grid", gridTemplateColumns: "5fr 4fr", gap: [0, 30], pt: 24 }} spacing="xl" className="LandingPage content landing-side-padding">
                    <Grid gridColumn={1} id="desktop">
                        <Stack direction="column" className="LandingPage mid-motto" gap={1} my={20}>
                            <Grid container columns={{ xs: 1 }} gap={1} className="LandingPage motto-text">
                                <Grid>
                                    <Typography className="LandingPage motto-header" level="h1" fontSize={48} fontWeight={700}>
                                        <FormattedMessage id="downloads.desktop" />
                                    </Typography>
                                </Grid>
                                <Grid sx={{ mr: 6 }}>
                                    <Typography className="LandingPage motto-subtext" level="body-lg" textAlign="justify">
                                        <FormattedMessage id="downloads.desktopDescription" />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                                <DownloadCard
                                    title="Windows"
                                    description="Windows 8.1, 10, 11"
                                    color="info"
                                    icon={<IconBrandWindows />}
                                    href="/downloads"
                                />
                                <DownloadCard
                                    title="Apple xOS"
                                    description="Apple xOS 15.6.1+"
                                    color="neutral"
                                    icon={<IconBrandApple />}
                                    href="/downloads"
                                    />
                                <DownloadCard
                                    title="Debian"
                                    description="Debian, Ubuntu, Linux Mint"
                                    color="danger"
                                    icon={<IconBrandDebian />}
                                    href="/downloads"
                                    />
                                <DownloadCard
                                    title="Other Linux"
                                    description="Other various Linux distributions"
                                    color="warning"
                                    icon={<IconFeather />}
                                    href="/downloads"
                                    gridColumn="1 / 4"
                                >
                                    <Select placeholder="Choose" variant="soft" startDecorator={<IconDownload />} indicator="">
                                        <Option value="rpm" href="/">
                                            RPM
                                        </Option>
                                        <Option value="flatpak">
                                            Flatpak
                                        </Option>
                                        <Option value="appImage">
                                            AppImage
                                        </Option>
                                    </Select>
                                </DownloadCard>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid gridColumn={2}></Grid>
                    <Grid gridColumn={1} id="mobile">
                        <Stack direction="column" className="LandingPage mid-motto" gap={1} my={20}>
                            <Grid container columns={{ xs: 1 }} gap={1} className="LandingPage motto-text">
                                <Grid>
                                    <Typography className="LandingPage motto-header" level="h1" fontSize={48} fontWeight={700}>
                                        <FormattedMessage id="downloads.mobile" />
                                    </Typography>
                                </Grid>
                                <Grid sx={{ mr: 6 }}>
                                    <Typography className="LandingPage motto-subtext" level="body-lg" textAlign="justify">
                                        <FormattedMessage id="downloads.mobileDescription" />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4 }}>
                                <DownloadCard
                                    title="Google Play"
                                    description="Android 7+"
                                    color="success"
                                    icon={<IconBrandGooglePlay />}
                                    href="/downloads"
                                    />
                                <DownloadCard
                                    title="App Store"
                                    description="Apple iOS 18.6.2+"
                                    color="neutral"
                                    icon={<IconBrandApple />}
                                    href="/downloads"
                                    />
                                <DownloadCard
                                    title="Android APK"
                                    description="Android 7+"
                                    color="success"
                                    icon={<IconBrandAndroid />}
                                    href="/downloads"
                                    />
                            </Grid>
                        </Stack>
                    </Grid>
                    <Grid gridColumn={2}></Grid>
                </Grid>
            </LandingPageWrapper>
        );
    }
}