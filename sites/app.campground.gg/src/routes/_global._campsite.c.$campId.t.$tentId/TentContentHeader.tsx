import { IconButton, Typography } from "@mui/joy";
import {
    IconLayoutSidebar,
    IconLayoutSidebarFilled,
} from "@tabler/icons-react";
import { Group } from "components";
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
            <Group gap={1} flex={1}>
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
