import { IconButton, Typography } from "@mui/joy";
import { IconLayoutSidebar, IconLayoutSidebarFilled } from "@tabler/icons-react";
import { Group } from "components";
import type { TentViewDetailed } from "types/tent";
import TentIcon from "~/components/tents/TentIcon";
import ContentDeleteModal from "../../layout/ContentDeleteModal";
import { useSession } from "~/context/session";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import TentItem from "../_global._campsite/TentItem";
import { SnackbarContext } from "~/context/snackbar";

export default function TentContentHeader({ tent, sidebarToggle, sidebarOpen }: { sidebarOpen: boolean; sidebarToggle: (value: boolean) => unknown; tent: TentViewDetailed }) {
    const session = useSession();
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const floating = useContext(SnackbarContext);

    const onDelete = () => session
        .http
        ?.tents.delete(tent.id)
        .then((resp) => {
            if (!resp.ok)
                return floating.notifyError(`${resp.status} ${resp.errorHeader}: ${resp.errorDescription}`);

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