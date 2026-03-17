import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, styled, Typography } from "@mui/joy";
import { IconEyeFilled, IconHash, IconSettingsFilled, IconTrashFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { TentCategoryView, TentView } from "types/tent"
import TentIcon from "~/components/tents/TentIcon";
import { useRightClick } from "~/context/mouse";
import type { TentSettingsPage } from "~/layout/tent/TentSettingsModal";
import { useCampsiteContext } from "./context";
import { CampsitePermissionConsts } from "~/util/permissions";
import { PseudoTentType } from "~/util/pseudoTents";

type Props = {
    tent: TentView;
    unclickable?: boolean;
    disableMenu?: boolean;
    isActive?: boolean;
    onSettingsOpen?: (props: { tent?: TentView, category?: TentCategoryView, page?: TentSettingsPage }) => unknown;
}

export const TentItemButton = styled(ListItemButton, {
    name: "TentItem",
    slot: "root",
})(({ theme }) => ({
    borderRadius: theme.vars.radius.sm,
    border: "solid 1px transparent",
    color: theme.vars.palette.text.tertiary,
    ":hover": {
        color: theme.vars.palette.text.secondary,
    },
    "&.TentItem-active": {
        color: theme.vars.palette.text.tertiary,
        boxShadow: theme.vars.shadow.xs,
        backgroundColor: theme.vars.palette.neutral[850],
        border: `solid 1px ${theme.vars.palette.neutral.border}`,
    },
    "&.TentItem-active:hover": {
        backgroundColor: theme.vars.palette.neutral[800],
    }
}));

export default function TentItem({ isActive, tent, onSettingsOpen: onTentSettingsOpen }: Props) {
    const navigate = useNavigate();
    const { permissions } = useCampsiteContext();
    const tentPermissions = permissions.getTentPermissions(tent.categoryId, tent.id);
    const navigateToTent = () => navigate(`/c/${tent.campsiteId}/t/${tent.id}`);
    const { listeners } = useRightClick({
        MenuComponent: ({ tent }) => (
            <>
                <MenuItem onClick={navigateToTent}>
                    <ListItemDecorator>
                        <IconEyeFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Open tent
                    </ListItemContent>
                </MenuItem>
                {!!(tentPermissions.general & CampsitePermissionConsts.MANAGE_TENTS) && !PseudoTentType.includes(tent.id as PseudoTentType)  && onTentSettingsOpen && <MenuItem onClick={() => onTentSettingsOpen({ tent })}>
                    <ListItemDecorator>
                        <IconSettingsFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Tent settings
                    </ListItemContent>
                </MenuItem>}
                {!!(tentPermissions.general & CampsitePermissionConsts.MANAGE_TENTS) && !PseudoTentType.includes(tent.id as PseudoTentType) && onTentSettingsOpen && <MenuItem color="danger" variant="plain" onClick={() => onTentSettingsOpen({ tent, page: "delete" })}>
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
            <TentItemButton className={isActive ? "TentItem-active" : ""} onClick={navigateToTent}>
                <ListItemDecorator>
                    <TentIcon type={tent.type} viewType={tent.viewType} />
                </ListItemDecorator>
                <ListItemContent sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {tent.name}
                </ListItemContent>
            </TentItemButton>
        </ListItem>
    );
}

export function PseudoTentItem({ isActive, tent }: Pick<Props, "isActive"> & { tent: Pick<TentView, "type" | "viewType" | "name"> }) {
    return (
        <ListItem>
            <TentItemButton className={isActive ? "TentItem-active" : ""}>
                <ListItemDecorator>
                    <TentIcon type={tent.type} viewType={tent.viewType} />
                </ListItemDecorator>
                <ListItemContent sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {tent.name}
                </ListItemContent>
            </TentItemButton>
        </ListItem>
    );
}

export function TentItemSkeleton() {
    return (
        <ListItem>
            <TentItemButton>
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
            </TentItemButton>
        </ListItem>
    );
}