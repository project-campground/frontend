import { IconButton, ListItemContent, ListItemDecorator, MenuItem, Skeleton, Stack, Typography } from "@mui/joy";
import { IconPlus, IconTrashFilled } from "@tabler/icons-react";
import { Group } from "components";
import type { TentCategoryView } from "types/tent";
import ContentCategory from "~/components/content/ContentCategory";
import { useRightClick } from "~/context/mouse";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";

export default function TentCategory({ onCreate, category, children }: React.PropsWithChildren & { onCreate: () => unknown; category: TentCategoryView }) {
    const session = useSession();
    const floating = useSnackbars();
    const onCategoryDelete = () =>
        session
            .restClient
            .deleteCategory(category.id)
            .then((resp) => {
                if (!resp.ok)
                    return floating.notifyApiError(resp);
            });
    const { listeners } = useRightClick({
        MenuComponent: () => (
            <>
                <MenuItem color="danger" variant="plain" onClick={onCategoryDelete}>
                    <ListItemDecorator>
                        <IconTrashFilled />
                    </ListItemDecorator>
                    <ListItemContent>
                        Delete category
                    </ListItemContent>
                </MenuItem>
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