import { ListItem, ListItemButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, styled, Typography } from "@mui/joy";
import { IconEyeFilled, IconHash, IconSettingsFilled, IconTrashFilled, type ReactNode } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import type { TentCategoryView, TentView } from "types/campground/tent"
import TentIcon from "~/components/tents/TentIcon";
import { useRightClick } from "~/context/mouse";
import type { TentSettingsPage } from "~/layout/tent/TentSettingsModal";
import { useCampsiteContext } from "../../../routes/_global._campsite/context";
import { GeneralPermissionConsts } from "~/util/permissions";
import { PseudoTentType } from "~/util/pseudoTents";
import { useDraggable, useDroppable } from "~/draggable";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";

type TentItemView = Omit<TentView, "name"> & {
    name: ReactNode[] | ReactNode;
};

type Props = {
    tent: TentItemView;
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
    position: "relative",
    ":hover": {
        color: theme.vars.palette.text.secondary,
    },
    "&::after": {
        content: "''",
        position: "absolute",
        top: -2,
        left: 0,
        right: 0,
        height: 2,
        borderRadius: theme.vars.radius.md,
        backgroundColor: "transparent",
        transition: "background 0.3s",
    },
    "&.TentItem-over::after": {
        backgroundColor: theme.vars.palette.primary[500],
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
    const { attributes: draggableAttributes } = useDraggable({
        id: tent.id,
        group: "tent",
        disabled: (tentPermissions.general & GeneralPermissionConsts.MANAGE_TENTS) !== GeneralPermissionConsts.MANAGE_TENTS
    });
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: `t:${tent.id}`,
        disabled: (tentPermissions.general & GeneralPermissionConsts.MANAGE_TENTS) !== GeneralPermissionConsts.MANAGE_TENTS,
        ignoreIds: [tent.id],
        group: "tent",
    });

    const { listeners } = useRightClick({
        MenuComponent: ({ tent }) => (
            <>
                <MenuItem onClick={navigateToTent}>
                    <ListItemDecorator>
                        <IconEyeFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        <FormattedMessage
                            id="app.tents.open"
                            defaultMessage="Open tent"
                            description="The menu button for opening tents"
                        />
                    </ListItemContent>
                </MenuItem>
                {!!(tentPermissions.general & GeneralPermissionConsts.MANAGE_TENTS) && !PseudoTentType.includes(tent.id as PseudoTentType)  && onTentSettingsOpen && <MenuItem onClick={() => onTentSettingsOpen({ tent })}>
                    <ListItemDecorator>
                        <IconSettingsFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        <FormattedMessageGlobal id="app.tents.settings" />
                    </ListItemContent>
                </MenuItem>}
                {!!(tentPermissions.general & GeneralPermissionConsts.MANAGE_TENTS) && !PseudoTentType.includes(tent.id as PseudoTentType) && onTentSettingsOpen && <MenuItem color="danger" variant="plain" onClick={() => onTentSettingsOpen({ tent, page: "delete" })}>
                    <ListItemDecorator>
                        <IconTrashFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        <FormattedMessageGlobal id="app.tents.delete" />
                    </ListItemContent>
                </MenuItem>}
            </>
        ),
        menuProps: { tent },
    });

    return (
        <ListItem {...listeners}>
            <TentItemButton {...draggableAttributes} {...droppableAttributes} className={[isActive && "TentItem-active", isOver && "TentItem-over"].filter((x) => x).join(", ")} onClick={navigateToTent}>
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