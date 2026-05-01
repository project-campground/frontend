import { IconButton, Typography, Skeleton, Box } from "@mui/joy";
import {
    IconLayoutSidebar,
    IconLayoutSidebarFilled,
} from "@tabler/icons-react";
import { Group, loremIpsum } from "@campground/ui";
import type { TentViewBasic } from "types/campground/tent";
import TentIcon from "~/components/tents/TentIcon";
import { PseudoTentType } from "~/util/pseudoTents";
import { FormattedMessageGlobal } from "~/i18n";

export default function TentContentHeader({
    tent,
    sidebarToggle,
    sidebarOpen,
}: {
    sidebarOpen: boolean;
    sidebarToggle: (value: boolean) => unknown;
    tent: TentViewBasic;
}) {
    return (
        <Group sx={{ px: 2, pt: 2, pb: 1.5 }} alignItems="center">
            <Group gap={1} flex={1} alignItems="center">
                <TentIcon type={tent.type} viewType={tent.viewType} />
                <Typography level="title-lg" fontWeight={900}>
                    {PseudoTentType.includes(tent.id as PseudoTentType) ? (
                        <FormattedMessageGlobal
                            id={`app.tents.${tent.id}` as "app.tents.bulletin"}
                        />
                    ) : (
                        tent.name
                    )}
                </Typography>
            </Group>
            <Group gap={1}>
                <IconButton
                    size="sm"
                    onClick={() => sidebarToggle(!sidebarOpen)}
                >
                    {sidebarOpen ? (
                        <IconLayoutSidebarFilled />
                    ) : (
                        <IconLayoutSidebar />
                    )}
                </IconButton>
            </Group>
        </Group>
    );
}

export function TentContentHeaderSkeleton() {
    return (
        <Group sx={{ px: 2, pt: 2, pb: 1.5 }} alignItems="center">
            <Group gap={1} flex={1} alignItems="center">
                <Box sx={{ width: 24, height: 24 }}>
                    <Skeleton loading width={24} height={24}>
                    </Skeleton>
                </Box>
                <Typography level="title-lg" fontWeight={900}>
                    <Skeleton>
                        {loremIpsum.sm}
                    </Skeleton>
                </Typography>
            </Group>
        </Group>
    );
}