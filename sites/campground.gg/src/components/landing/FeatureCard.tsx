import { AspectRatio, Card, CardContent, CardOverflow, ColorPaletteProp, Link, Stack, Typography } from "@mui/joy";
import { IconArrowRight } from "@tabler/icons-react";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

type Props = {
    title: string;
    description: string;
    icon: ReactNode;
    href?: string;
    imgSrc: string;
    color?: ColorPaletteProp;
};


export default function FeatureCard({ title, description, icon, href, imgSrc, color }: Props) {
    return (
        <Link href={href} underline="none" className="FeatureCard wrapper">
            <Card
                variant="soft"
                className="FeatureCard container"
                sx={(theme) => ({
                    width: "100%",
                    height: "100%",
                    "::before": {
                        content: "''",
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: `solid 2px ${theme.vars.palette[color ?? "primary"][500]}`,
                        position: "absolute",
                        borderRadius: theme.vars.radius.md,
                        maskImage: "linear-gradient(45deg, transparent 0%, black 50%, transparent 100%)",
                        opacity: 0.5,
                    }
                })}
            >
                <CardOverflow sx={{ zIndex: 2, px: 4, py: 2 }}>
                    <AspectRatio ratio={3} sx={(theme) => ({ borderRadius: theme.vars.radius.md })}>
                        <img src={imgSrc} className="FeatureCard img" />
                    </AspectRatio>
                </CardOverflow>
                <CardContent sx={{ zIndex: 2 }}>
                    <Stack sx={{ display: "flex" }} gap={2} flex="1 auto">
                        <Stack direction="column" flex={1} gap={1}>
                            <Typography level="title-lg" fontWeight={700} startDecorator={icon}>
                                <FormattedMessage id={title} />
                            </Typography>
                            <Typography level="body-md">
                                <FormattedMessage id={description} />
                            </Typography>
                        </Stack>
                        <Typography level="body-md" textColor="neutral.300" endDecorator={<IconArrowRight />}>
                            <FormattedMessage id="features.learnMore" values={{ feature: <FormattedMessage id={title} /> }} />
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    )
}