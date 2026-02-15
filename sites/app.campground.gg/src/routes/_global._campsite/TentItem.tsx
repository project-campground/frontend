import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, styled, Typography } from "@mui/joy";
import { IconHash, IconTrashFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { TentViewBasic } from "types/tent"
import TentIcon from "~/components/tents/TentIcon";
import { useRightClick } from "~/context/mouse";

type Props = {
    tent: TentViewBasic;
    isActive?: boolean;
    disableMenu?: boolean;
    onTentDelete?: (tent: TentViewBasic) => unknown;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.vars.radius.sm,
    transitionProperty: "background, box-shadow, border",
    transitionDuration: "0.3s",
    border: "solid 1px transparent",
    "&.active": {
        boxShadow: theme.vars.shadow.xs,
        border: `solid 1px ${theme.vars.palette.neutral.border}`,
    }
}));

export default function TentItem({ tent, isActive, onTentDelete }: Props) {
    const navigate = useNavigate();
    const { listeners } = useRightClick({
        MenuComponent: ({ tent }) => (
            <>
                {tent.id !== "bulletin" && onTentDelete && <MenuItem color="danger" variant="plain" onClick={() => onTentDelete(tent)}>
                    <ListItemDecorator>
                        <IconTrashFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Delete tent
                    </ListItemContent>
                </MenuItem>}
            </>
        ),
        menuProps: { tent },
    });

    return (
        <ListItem {...listeners}>
            <ListItemButtonStyled className={isActive ? "active" : ""} variant={isActive ? "soft" : "plain"} onClick={() => navigate(`/c/${tent.campsiteId}/t/${tent.id}`)}>
                <ListItemDecorator>
                    <TentIcon type={tent.type} viewType={tent.viewType} />
                </ListItemDecorator>
                <ListItemContent sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {tent.name}
                </ListItemContent>
            </ListItemButtonStyled>
        </ListItem>
    );
}

export function TentItemSkeleton({ isActive }: Pick<Props, "isActive">) {
    return (
        <ListItem>
            <ListItemButtonStyled variant={isActive ? "soft" : "plain"}>
                <ListItemDecorator>
                    <Skeleton loading width={24} height={24}/>
                    <IconHash />
                </ListItemDecorator>
                <ListItemContent>
                    <Typography>
                        <Skeleton loading>
                            Loading... Loading...
                        </Skeleton>
                    </Typography>
                </ListItemContent>
            </ListItemButtonStyled>
        </ListItem>
    );
}