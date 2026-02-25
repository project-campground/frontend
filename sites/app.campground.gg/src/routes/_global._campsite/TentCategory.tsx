import { IconButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, Stack, Typography } from "@mui/joy";
import { IconPlus, IconSettings2, IconTrashFilled } from "@tabler/icons-react";
import { Group } from "components";
import type { TentCategoryView, TentViewBasic } from "types/tent";
import ContentCategory from "~/components/content/ContentCategory";
import { useRightClick } from "~/context/mouse";
import type { CategorySettingsPage } from "~/layout/category/CategorySettingsModal";

type Props = React.PropsWithChildren & {
    category: TentCategoryView 
    onCreate: () => unknown;
    onSettingsOpen?: (props: { tent?: TentViewBasic, category?: TentCategoryView, page?: CategorySettingsPage }) => unknown;
};

export default function TentCategory({ onCreate, category, children, onSettingsOpen }: Props) {
    const { listeners } = useRightClick({
        MenuComponent: () => (
            <>
                {onSettingsOpen && <MenuItem onClick={() => onSettingsOpen({ category })}>
                    <ListItemDecorator>
                        <IconSettings2 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Category settings
                    </ListItemContent>
                </MenuItem>}
                {onSettingsOpen && <MenuItem color="danger" variant="plain" onClick={() => onSettingsOpen({ category, page: "delete" })}>
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
        <ContentCategory header={
            <Group flex={1} {...listeners}>
                <Stack flex={1}>
                    <Typography level="title-md">{category.name}</Typography>
                    {category.description && <Typography level="body-sm">{category.description}</Typography>}
                </Stack>
                <IconButton sx={{ "--IconButton-size": "1.5rem" }} onClick={onCreate}>
                    <IconPlus size="16px" />
                </IconButton>
            </Group>
        }>
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