import { Avatar, ListItemContent, ListItemDecorator, MenuItem, Stack, Typography } from "@mui/joy";
import type { BonfireViewBasic } from "types/campsites";
import { useDroppable } from "~/draggable";

type Props = {
    bonfire: BonfireViewBasic;
    onBonfireOpen: (bonfire: BonfireViewBasic) => unknown;
};

export default function BonfireItem({ bonfire, onBonfireOpen }: Props) {
    const { attributes: droppableAttributes } = useDroppable({
        id: bonfire.id,
        group: "bonfire",
        allowAnyGroup: true,
    });

    return (
        <MenuItem {...droppableAttributes} key={bonfire.id} onClick={() => onBonfireOpen(bonfire)}>
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
    )
}