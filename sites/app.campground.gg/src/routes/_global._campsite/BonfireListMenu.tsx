import { Avatar, ListItemContent, ListItemDecorator, Menu, MenuItem, Modal, Stack, styled, Typography } from "@mui/joy";
import { IconPlus } from "@tabler/icons-react";
import type { BonfireViewBasic } from "types/campsites";
import BonfireCreationModal from "./BonfireCreationModal";
import { useState } from "react";

type Props = {
    campsiteId: string;
    bonfires: BonfireViewBasic[];
    open: boolean;
    top: number;
    onBonfireOpen: (bonfire: BonfireViewBasic) => unknown;
};

const BonfireMenu = styled(Menu)(({ theme }) => ({
    "--ListItem-paddingY": "12px",
    "--ListItemButton-marginInline": "8px",
    "--ListItem-radius": theme.vars.radius.md, 
    // - 10 due to 5px padding
    width: 320 - 10,
    left: `5px !important`
}));

export default function BonfireListMenu({ campsiteId, top, open, bonfires, onBonfireOpen }: Props) {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const lowestPriorityBonfire = bonfires.sort((a, b) => a.priority - b.priority).slice(-1)[0]?.priority ?? -1;
    const onClose = () => setCreateModalOpen(false);

    return (
        <>
            <BonfireMenu variant="soft" open={open} sx={{ top: `${top}px !important`, }}>
                {bonfires.map((bonfire) =>
                    <MenuItem key={bonfire.id} onClick={() => onBonfireOpen(bonfire)}>
                        <ListItemDecorator sx={{ mr: 0.5 }}>
                            <Avatar src={bonfire.avatarUri ?? undefined} size="md" color="primary" variant="solid" sx={{ borderRadius: "md", fontWeight: "bolder" }}>
                                {bonfire.name[0]}
                            </Avatar>
                        </ListItemDecorator>
                        <ListItemContent>
                            <Stack>
                                <Typography level="title-md" fontWeight="bolder" sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {bonfire.name}
                                </Typography>
                                <Typography level="body-md" sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {bonfire.description}
                                </Typography>
                            </Stack>
                        </ListItemContent>
                    </MenuItem>
                )}
                <MenuItem sx={(theme) => ({ border: `dashed 1px ${theme.vars.palette.neutral[500]}` })} onClick={() => setCreateModalOpen(true)}>
                    <ListItemDecorator>
                        <IconPlus />
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="title-md" fontWeight="bolder">
                            Add new bonfire
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