import { AspectRatio, Avatar, Box, Chip, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { useContext } from "react";
import { CampsiteContext } from "../_global._campsite/context";
import type { CampsiteViewDetailed } from "types/campsites";
import type { TentViewDetailed } from "types/tent";
import { IconCake, IconUsers } from "@tabler/icons-react";
import Datestamp from "~/components/Datestamp";
import { Group } from "components";

export default function BulletinBoard() {
    const campsite = useContext(CampsiteContext);

    return (
        <Box sx={{ overflowY: "auto", flex: 1, width: "100%" }}>
            <Stack sx={(theme) => ({ minHeight: "100%", pb: 16, backgroundColor: theme.vars.palette.background.level1 })}>
                <Box>
                    <AspectRatio ratio={8} slotProps={{ content: { sx: { paddingBottom: { xs: 20, md: "calc(var(--AspectRatio-paddingBottom) - 2 * var(--variant-borderWidth, 0px))" } } } }}>
                        <Box sx={(theme) => ({
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(to bottom right, ${theme.vars.palette.neutral[600]}, ${theme.vars.palette.neutral[700]})`
                        })}>
                            
                        </Box>
                    </AspectRatio>
                </Box>
                <Stack direction="column" alignItems="center" gap={1} sx={{ mt: -8, mb: 2 }}>
                    <Avatar src={campsite.avatarUri ?? undefined} variant="solid" size="xxxl" sx={(theme) => ({ borderRadius: "xl", border: `solid 4px ${theme.vars.palette.background.level1}` })}>
                        {campsite.name[0]}
                    </Avatar>
                    <Stack gap={0} alignItems="center">
                        <Stack direction="row" gap={1} alignItems="center">
                            <Typography level="h2">{campsite.name}</Typography>
                        </Stack>
                        <Typography level="body-lg" textColor="neutral.100">{campsite.description}</Typography>
                        <Typography level="body-md" textColor="neutral.200">/c/{campsite.vanityUrl ?? campsite.id}</Typography>
                        {campsite.tags?.length ? <Group gap={1} mt={1}>
                            {campsite.tags.map((x) =>
                                <Chip key={x} variant="solid" color="neutral">{x}</Chip>
                            )}
                        </Group> : null}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export function BulletinBoardSidebarComponent(props: { campsite: CampsiteViewDetailed, tent: TentViewDetailed }) {
    return (
        <Box sx={{ py: 1 }}>
            <Typography level="title-md" fontWeight={700} sx={{ px: 1 }}>Campsite Information</Typography>
            <List sx={{ flexGrow: 0, "--List-padding": 0, pt: 1 }}>
                <ListItem>
                    <ListItemDecorator>
                        <IconUsers />
                    </ListItemDecorator>
                    <ListItemContent>
                        {props.campsite.memberCount} members
                    </ListItemContent>
                </ListItem>
                <ListItem>
                    <ListItemDecorator>
                        <IconCake />
                    </ListItemDecorator>
                    <ListItemContent>
                        {"Created"}
                        <Datestamp date={new Date(props.campsite.createdAt)} />
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    )
}