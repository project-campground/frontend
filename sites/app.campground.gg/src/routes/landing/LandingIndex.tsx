import React from "react";
import { FormattedMessage } from "react-intl";
import LandingPageWrapper from "../../components/index/LandingPageWrapper";
// import { Button, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconBrandDebian, IconCamper, IconCampfire, IconCheckbox, IconLock, IconPalette, IconServer } from "@tabler/icons-react";
import { Box, Button, Grid, Link, Sheet, Stack, Typography } from "@mui/joy";
import PrimaryButton from "../../components/PrimaryButton";
import LandingSection from "../../components/index/LandingSection";
import ObservabilityDisplay from "../../components/ObservabilityDisplay";
import LandingStickyCampfires from "../../components/index/sticky/LandingStickyCampfire";
import LandingStickySelfHosts from "../../components/index/sticky/LandingStickySelfHosts";
import LandingStickyEncryption from "../../components/index/sticky/LandingStickyEncryption";
import LandingStickyProfile from "../../components/index/sticky/LandingStickyProfile";
import LandingStickyLists from "../../components/index/sticky/LandingStickyLists";
import LandingStickyThemes from "../../components/index/sticky/LandingStickyThemes";

export type Props = {

};

export default class LandingIndex extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <LandingPageWrapper>
                {/* Top motto of the Index */}
                <Grid container sx={{ display: "grid", gridTemplateColumns: "5fr 4fr", gap: 5 }} spacing="xl" className="IndexPage top landing-side-padding landing-extreme-top">
                    <Grid gridColumn={1}>
                        <Stack direction="column" className="IndexPage top-motto" gap={1}>
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
                            <Stack direction="column" gap={1.5}>
                                <Stack direction="row" className="IndexPage top-motto-buttons" gap={1}>
                                    <Link underline="none" href="/download" tabIndex={-1}>
                                        <PrimaryButton size="lg" variant="solid" startDecorator={<IconBrandDebian />}>
                                            <FormattedMessage id="landing.download.debian" />
                                        </PrimaryButton>
                                    </Link>
                                    <Button variant="outlined" size="lg" component="a" href="/">
                                        <FormattedMessage id="global.openBrowser" />
                                    </Button>
                                </Stack>
                                <Link href="/downloads#desktop" color="neutral">Incorrect operating system? Click here to check out downloads page!</Link>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
                {/* Features in the Index */}
                <Grid container sx={{ display: "grid", gridTemplateColumns: "5fr 4fr" }} columnGap={5} spacing="xl" className="IndexPage feature-grid landing-side-padding">
                    <LandingSection
                        id="campfires"
                        subtitle="home.campfires.subtitle"
                        icon={<IconCampfire />}
                        title="home.campfires.title"
                        description="home.campfires.description"
                        learnMore="home.campfires.learnMore"
                        learnMoreHref="/docs/features/campfires"
                    />
                    <LandingSection
                        id="selfHost"
                        subtitle="home.selfHost.subtitle"
                        icon={<IconServer />}
                        title="home.selfHost.title"
                        description="home.selfHost.description"
                        learnMore="home.selfHost.learnMore"
                        learnMoreHref="/docs/features/instances"
                    />
                    <LandingSection
                        id="encryption"
                        subtitle="home.encryption.subtitle"
                        icon={<IconLock />}
                        title="home.encryption.title"
                        description="home.encryption.description"
                        learnMore="home.encryption.learnMore"
                        learnMoreHref="/docs/features/encryption"
                    />
                    <LandingSection
                        id="profiles"
                        subtitle="home.profiles.subtitle"
                        icon={<IconCamper />}
                        title="home.profiles.title"
                        description="home.profiles.description"
                        learnMore="home.profiles.learnMore"
                        learnMoreHref="/docs/features/profiles"
                    />
                    <LandingSection
                        id="lists"
                        subtitle="home.lists.subtitle"
                        icon={<IconCheckbox />}
                        title="home.lists.title"
                        description="home.lists.description"
                        learnMore="home.lists.learnMore"
                        learnMoreHref="/docs/features/list-tents"
                    />
                    <LandingSection
                        id="themes"
                        subtitle="home.themes.subtitle"
                        icon={<IconPalette />}
                        title="home.themes.title"
                        description="home.themes.description"
                        learnMore="home.themes.learnMore"
                        learnMoreHref="/docs/features/themes"
                    />
                    <Box gridColumn={2} gridRow="1 / 6">
                        <Box sx={{ userSelect: "none", position: "sticky", top: 120, zIndex: 8 }}>
                            <ObservabilityDisplay observeQuery="#campfires" threshold={1}>
                                {{ elementId: "campfires", node: <LandingStickyCampfires /> }}
                                {{ elementId: "selfHost", node: <LandingStickySelfHosts /> }}
                                {{ elementId: "encryption", node: <LandingStickyEncryption /> }}
                                {{ elementId: "profiles", node: <LandingStickyProfile /> }}
                                {{ elementId: "lists", node: <LandingStickyLists /> }}
                                {{ elementId: "themes", node: <LandingStickyThemes /> }}
                            </ObservabilityDisplay>
                        </Box>
                    </Box>
                </Grid>
                <IndexBottomSection />
            </LandingPageWrapper>
        );
    }
}

class IndexBottomSection extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <Sheet
                invertedColors
                className="IndexBottomSection container landing-side-padding"
                color="primary"
                variant="solid"
                sx={{
                    background: "transparent",
                    px: 20,
                    py: 25,
                    overflow: "hidden"
                }}
            >
                <Sheet
                    sx={(theme) => ({
                        background: `linear-gradient(90deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.secondary[500]})`,
                        position: "absolute",
                        top: 25,
                        left: -10,
                        bottom: 25,
                        right: -10,
                        rotate: "1.5deg",
                        "::before": {
                            position: "absolute",
                            content: "''",
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: `linear-gradient(0deg, ${theme.vars.palette.info[500]}, transparent, ${theme.vars.palette.warning[500]})`,
                            opacity: 0.25,
                        },
                    })}
                >

                </Sheet>
                <Stack direction="column" alignItems="center" gap={4} sx={{ zIndex: 5 }}>
                    <Stack direction="column">
                        <Typography level="h1" zIndex={6}>
                            <FormattedMessage id="home.bottom.title" />
                        </Typography>
                        <Typography level="title-lg" zIndex={6}>
                            <FormattedMessage id="home.bottom.description" />
                        </Typography>
                    </Stack>
                    <Stack direction="row" className="IndexBottomSection buttons" gap={1}>
                        <Link underline="none" href="/download">
                            <Button size="lg" variant="solid" startDecorator={<IconBrandDebian />}>
                                <FormattedMessage id="landing.download.debian" />
                            </Button>
                        </Link>
                        <Button variant="outlined" size="lg" component="a" href="/">
                            <FormattedMessage id="global.openBrowser" />
                        </Button>
                    </Stack>
                </Stack>
            </Sheet>
        )
    }
}