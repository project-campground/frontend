import {
    AspectRatio,
    Avatar,
    Box,
    Chip,
    List,
    ListItem,
    ListItemContent,
    ListItemDecorator,
    Stack,
    Typography,
} from "@mui/joy";
import { useCampsite, useCampsiteContext } from "../_global._campsite/context";
import { IconCake, IconUsers } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import { Group, Image } from "components";
import GradientBanner from "~/components/pages/GradientBanner";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

export default function BulletinBoard() {
    const campsite = useCampsite();

    return (
        <Box sx={{ overflowY: "auto", flex: 1, width: "100%" }}>
            <Stack
                sx={(theme) => ({
                    minHeight: "100%",
                    pb: 16,
                    backgroundColor: theme.vars.palette.background.level1,
                })}
            >
                <Box sx={{ px: 2, py: 2 }}>
                    <AspectRatio
                        ratio={8}
                        sx={{ borderRadius: "md" }}
                        slotProps={{
                            content: {
                                sx: {
                                    paddingBottom: {
                                        xs: 20,
                                        md: "calc(var(--AspectRatio-paddingBottom) - 2 * var(--variant-borderWidth, 0px))",
                                    },
                                },
                            },
                        }}
                    >
                        {campsite.bannerUri ? (
                            <Image src={campsite.bannerUri} />
                        ) : (
                            <GradientBanner
                                sx={{ zIndex: "inherit" }}
                            ></GradientBanner>
                        )}
                    </AspectRatio>
                </Box>
                <Stack
                    direction="column"
                    alignItems="center"
                    gap={1}
                    sx={{ mt: -8, mb: 2 }}
                >
                    <Avatar
                        src={campsite.avatarUri ?? undefined}
                        variant="solid"
                        size="xxxl"
                        sx={(theme) => ({
                            borderRadius: "xl",
                            border: `solid 4px ${theme.vars.palette.background.level1}`,
                        })}
                    >
                        {campsite.name[0]}
                    </Avatar>
                    <Stack gap={0} alignItems="center">
                        <Stack direction="row" gap={1} alignItems="center">
                            <Typography level="h2">{campsite.name}</Typography>
                        </Stack>
                        <Typography level="body-lg" textColor="neutral.100">
                            {campsite.description}
                        </Typography>
                        <Typography level="body-md" textColor="neutral.200">
                            /c/{campsite.vanityUrl ?? campsite.id}
                        </Typography>
                        {campsite.tags?.length ? (
                            <Group gap={1} mt={1}>
                                {campsite.tags.map((x) => (
                                    <Chip
                                        key={x}
                                        variant="solid"
                                        color="neutral"
                                    >
                                        {x}
                                    </Chip>
                                ))}
                            </Group>
                        ) : null}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export function BulletinBoardSidebarComponent() {
    const { campsite } = useCampsiteContext();
    return (
        <Box sx={{ py: 1 }}>
            <Typography level="title-md" fontWeight={700} sx={{ px: 1 }}>
                <FormattedMessage
                    id="app.bulletin.campsiteInfo"
                    defaultMessage="Campsite info"
                    description="The title of the campsite info field at the right side of Bulletin Board"
                />
            </Typography>
            <List sx={{ flexGrow: 0, "--List-padding": 0, pt: 1 }}>
                <ListItem>
                    <ListItemDecorator>
                        <IconUsers />
                    </ListItemDecorator>
                    <ListItemContent>
                        <FormattedMessageGlobal
                            id="app.campsites.members"
                            values={{
                                count: campsite.memberCount,
                            }}
                        />
                    </ListItemContent>
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <IconCake />
                    </ListItemDecorator>
                    <ListItemContent
                        sx={{ display: "flex", flexDirection: "row", gap: 1 }}
                    >
                        <FormattedMessage
                            id="app.createdAt"
                            defaultMessage="Created {time}"
                            description="Specific date that something was created/sent at"
                            values={{
                                time: (
                                    <Datestamp
                                        when
                                        date={
                                            new Date(campsite.createdAt)
                                        }
                                    />
                                ),
                            }}
                        />
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    );
}
