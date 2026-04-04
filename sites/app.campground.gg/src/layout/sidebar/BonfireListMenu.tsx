import { ListItemContent, ListItemDecorator, Menu, MenuItem, Modal, styled, Typography, Divider } from "@mui/joy";
import { IconPlus } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campsites";
import BonfireCreationModal from "./BonfireCreationModal";
import { useState } from "react";
import BonfireItem from "./BonfireItem";
import { DragDropProvider } from "~/draggable";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";
import ItemBottomMover from "~/components/ItemBottomMover";
import { FormattedMessage } from "react-intl";

type Props = {
    campsiteId: string;
    bonfires: BonfireViewBasic[];
    open: boolean;
    top: number;
    onBonfireOpen: (bonfire: BonfireViewBasic) => unknown;
};

const BonfireMenu = styled(Menu)(({ theme }) => ({
    "--ListItem-paddingY": "12px",
    "--List-gap": theme.spacing(0.5),
    "--ListItem-radius": theme.vars.radius.md, 
    // - 10 due to 5px padding
    width: 320 - 10,
    left: `5px !important`
}));

const bonfireDescended = ["tent", "category"]

export default function BonfireListMenu({ campsiteId, top, open, bonfires, onBonfireOpen }: Props) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const lowestPriorityBonfire = bonfires.sort((a, b) => a.position - b.position).slice(-1)[0]?.position ?? -1;
    const onClose = () => setCreateModalOpen(false);
    const session = useSession();
    const floating = useSnackbars();
    const regularBonfires = bonfires.filter((x) => !x.home);

    const onDropped = (draggedId: string, droppedId: string, _group?: string, draggableGroup?: string) => {
        console.log({ draggedId, droppedId, draggableGroup });
        if (bonfireDescended.includes(draggableGroup as "tent" | "category"))
            return session
                .http
                [draggableGroup === "tent" ? "tents" : "categories"]
                .move(draggedId, {
                    bonfireId: droppedId,
                    categoryId: null,
                })
                .then(handleAnyRestErrorWith(floating));
        const bonfireMovedToPosition = droppedId === "b:" ? (regularBonfires.slice(-1)[0]?.position ?? -1) + 1 : bonfires.find((x) => x.id === droppedId)?.position;

        return typeof bonfireMovedToPosition !== "undefined" && (
            session
                .http
                .bonfires
                .move(draggedId, {
                    position: bonfireMovedToPosition
                })
                .then(handleAnyRestErrorWith(floating))
        );
    };

    return (
        <>
            <BonfireMenu variant="soft" open={open} sx={{ top: `${top}px !important`, }}>
                <DragDropProvider onDropped={onDropped}>
                    {bonfires.filter((x) => x.home).map((bonfire) =>
                        <BonfireItem bonfire={bonfire} onBonfireOpen={onBonfireOpen} />
                    )}
                    <Divider sx={{ mt: "var(--List-gap)" }} />
                    {regularBonfires.map((bonfire) =>
                        <BonfireItem bonfire={bonfire} onBonfireOpen={onBonfireOpen} />
                    )}
                    <ItemBottomMover categoryId="" group="bonfire" bottomItemId={regularBonfires.slice(-1)[0]?.id} />
                </DragDropProvider>
                <MenuItem sx={(theme) => ({ border: `dashed 1px ${theme.vars.palette.neutral[700]}` })} onClick={() => setCreateModalOpen(true)}>
                    <ListItemDecorator>
                        <IconPlus />
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="title-md" fontWeight="bolder">
                            <FormattedMessage
                                id="tent.bonfires.create"
                                defaultMessage="Create bonfire"
                                description="Bonfire creation button in the bonfire list"
                            />
                        </Typography>
                    </ListItemContent>
                </MenuItem>
            </BonfireMenu>
            <Modal open={createModalOpen} onClose={onClose}>
                <BonfireCreationModal campsiteId={campsiteId} lowestPriorityBonfire={lowestPriorityBonfire} onClose={onClose} />
            </Modal>
        </>
    );
}