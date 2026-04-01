import { IconButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, Stack, Typography } from "@mui/joy";
import { IconPlus, IconSettingsFilled, IconTrashFilled } from "@tabler/icons-react";
import { Group } from "components";
import type { TentCategoryView, TentViewBasic } from "types/tent";
import ContentCategory from "~/components/content/ContentCategory";
import { useRightClick } from "~/context/mouse";
import type { CategorySettingsPage } from "~/layout/category/CategorySettingsModal";
import { useCampsiteContext } from "../../routes/_global._campsite/context";
import { GeneralPermissionConsts } from "~/util/permissions";
import { useDraggable, useDroppable } from "~/draggable";

type TentCategoryViewComponent = Pick<TentCategoryView, "id" | "name" | "description">;

type Props<T extends TentCategoryViewComponent> = React.PropsWithChildren & {
    category: T;
    onCreate?: () => unknown;
    onSettingsOpen?: (props: { tent?: TentViewBasic, category?: T, page?: CategorySettingsPage }) => unknown;
};

export default function TentCategory<T extends TentCategoryViewComponent>({ onCreate, category, children, onSettingsOpen }: Props<T>) {
    const { permissions } = useCampsiteContext();
    const categoryPermissions = permissions.permissions.categories[category.id] ?? permissions.permissions.bonfire;
    const canManageCategory = !!(categoryPermissions.general & GeneralPermissionConsts.MANAGE_TENTS);

    const { attributes: draggableAttributes } = useDraggable({
        id: category.id,
        group: "category",
        disabled: !canManageCategory,
    });
    const { attributes: droppableAttributes, isOver } = useDroppable({
        id: `c:${category.id}`,
        disabled: !canManageCategory,
        ignoreIds: [category.id],
        group: "category",
    });

    const { listeners } = useRightClick({
        MenuComponent: () => (
            <>
                {canManageCategory && onSettingsOpen && <MenuItem onClick={() => onSettingsOpen({ category })}>
                    <ListItemDecorator>
                        <IconSettingsFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Category settings
                    </ListItemContent>
                </MenuItem>}
                {canManageCategory && onSettingsOpen && <MenuItem color="danger" variant="plain" onClick={() => onSettingsOpen({ category, page: "delete" })}>
                    <ListItemDecorator>
                        <IconTrashFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Delete category
                    </ListItemContent>
                </MenuItem>}
            </>
        ),
        menuProps: { category },
    });

    return (
        <ContentCategory
            isDraggingOver={isOver}
            header={
                // If it gets applied to the whole category, it can cause the tents that are being dragged to also invoke listeners of the category
                // Which makes categories move, despite moving tents
                <Group flex={1} {...listeners} {...draggableAttributes} {...droppableAttributes}>
                    <Stack flex={1}>
                        <Typography level="title-md">{category.name}</Typography>
                        {category.description && <Typography level="body-sm">{category.description}</Typography>}
                    </Stack>
                    {onCreate && canManageCategory && <IconButton sx={{ "--IconButton-size": "1.5rem" }} onClick={onCreate}>
                        <IconPlus size="16px" />
                    </IconButton>}
                </Group>
            }
        >
            {children}
        </ContentCategory>
    );
}

export function TentCategorySkeleton({ children }: React.PropsWithChildren) {
    return (
        <ContentCategory header={
            <>
                <Stack flex={1}>
                    <Typography level="title-md">
                        <Skeleton loading>
                            Loading...
                        </Skeleton>
                    </Typography>
                </Stack>
                <IconButton sx={{ "--IconButton-size": "1.5rem" }}>
                    <IconPlus size="16px" />
                </IconButton>
            </>
        }>
            {children}
        </ContentCategory>
    );
}