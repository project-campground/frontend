import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, Skeleton, styled, Typography } from "@mui/joy";
import { IconHash } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { TentViewBasic } from "types/tent"
import TentIcon from "~/components/tents/TentIcon";

type Props = {
    tent: TentViewBasic;
    isActive?: boolean;
}

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.vars.radius.sm,
}));

export default function TentItem({ tent, isActive }: Props) {
    const navigate = useNavigate();

    return (
        <ListItem>
            <ListItemButtonStyled variant={isActive ? "soft" : "plain"} onClick={() => navigate(`/c/${tent.campsiteId}/t/${tent.id}`)}>
                <ListItemDecorator>
                    <TentIcon type={tent.type} viewType={tent.viewType} />
                </ListItemDecorator>
                <ListItemContent>
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