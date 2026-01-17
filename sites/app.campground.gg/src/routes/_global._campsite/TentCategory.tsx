import { IconButton, Skeleton, Stack, Typography } from "@mui/joy";
import { IconPlus } from "@tabler/icons-react";
import type { TentCategoryView } from "types/tent";
import ContentCategory from "~/components/content/ContentCategory";

export default function TentCategory({ onCreate, category, children }: React.PropsWithChildren & { onCreate: () => unknown; category: TentCategoryView }) {
    return (
        <ContentCategory header={
            <>
                <Stack flex={1}>
                    <Typography level="title-md">{category.name}</Typography>
                    {category.description && <Typography level="body-sm">{category.description}</Typography>}
                </Stack>
                <IconButton sx={{ "--IconButton-size": "1.5rem" }} onClick={onCreate}>
                    <IconPlus size="16px" />
                </IconButton>
            </>
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