import { Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Modal, Typography } from "@mui/joy";
import { IconDots, IconLayoutSidebar, IconLayoutSidebarFilled, IconSettings2, IconTrashFilled } from "@tabler/icons-react";
import { Group } from "components";
import type { TentViewDetailed } from "types/tent";
import TentIcon from "~/components/tents/TentIcon";
import ContentDeleteModal from "./ContentDeleteModal";
import { useSession } from "~/context/session";
import { useNavigate } from "react-router";
import { useState } from "react";
import TentItem from "../_global._campsite/TentItem";

export default function TentContentHeader({ tent, sidebarToggle, sidebarOpen }: { sidebarOpen: boolean; sidebarToggle: (value: boolean) => unknown; tent: TentViewDetailed }) {
    const session = useSession();
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);

    const onDelete = () => session
        .restClient
        ?.deleteTent(tent.id)
        .then((resp) => {
            if (!resp.ok)
                return;

            setDeleteOpen(false);
            return navigate(`/c/${tent.campsiteId}`);
        });

    return (
        <Group sx={{ px: 2, pt: 2, pb: 1.5 }} alignItems="center">
            <Group gap={1} flex={1}>
                <TentIcon type={tent.type} viewType={tent.viewType} />
                <Typography level="title-lg" fontWeight={900}>
                    {tent.name}
                </Typography>
            </Group>
            <Group gap={1}>
                {/* <IconButton size="sm">
                    <IconPinFilled />
                </IconButton> */}
                <Dropdown>
                    <MenuButton slots={{ root: IconButton }} size="sm">
                        <IconDots />
                    </MenuButton>
                    <Menu variant="soft">
                        {/* <MenuItem>
                            <ListItemDecorator>
                                <IconSettings2 />
                            </ListItemDecorator>
                            <ListItemContent>
                                Tent settings
                            </ListItemContent>
                        </MenuItem> */}
                        <MenuItem variant="plain" color="danger" onClick={() => setDeleteOpen(true)}>
                            <ListItemDecorator>
                                <IconTrashFilled />
                            </ListItemDecorator>
                            <ListItemContent>
                                Delete tent
                            </ListItemContent>
                        </MenuItem>
                    </Menu>
                </Dropdown>
                <ContentDeleteModal
                    title="tent"
                    open={deleteOpen}
                    onConfirm={onDelete}
                    onClose={() => setDeleteOpen(false)}
                    ContentRender={() => <TentItem isActive={true} tent={tent} />}
                />
                <IconButton size="sm" onClick={() => sidebarToggle(!sidebarOpen)}>
                    {sidebarOpen
                    ? <IconLayoutSidebarFilled />
                    : <IconLayoutSidebar />}
                </IconButton>
            </Group>
        </Group>
    );
}