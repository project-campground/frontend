import { Box, IconButton, Stack, styled } from "@mui/joy";
import { Group } from "@campground/ui";
import React, { useState, type HTMLAttributes } from "react";
import { RotatingCaret } from "./RotatingCaret";

const CategoryContainer = styled(Stack, {
    name: "CategoryContainer",
    slot: "root",
})(({ theme }) => ({
    position: "relative",
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
    "&.CategoryContainer-over::after": {
        backgroundColor: theme.vars.palette.primary[500],
    },
}));

type ContentCategoryPropsOnly = {
    defaultOpen?: boolean;
    header: React.ReactNode | React.ReactNode[];
    isDraggingOver?: boolean;
};
type Props = React.PropsWithChildren & Omit<HTMLAttributes<HTMLDivElement>, keyof ContentCategoryPropsOnly> & ContentCategoryPropsOnly;

export default function ContentCategory({ header, defaultOpen, children, isDraggingOver, ...attributes }: Props) {
    const [open, setOpen] = useState(defaultOpen ?? true);
    const className = [open && "CategoryContainer-open", isDraggingOver && "CategoryContainer-over"].filter((x) => x).join(" ");

    return (
        <CategoryContainer {...attributes} className={className} gap={1}>
            <Group sx={{ minHeight: 24, maxHeight: 44 }} alignItems="center" gap={1}>
                <IconButton sx={{ "--IconButton-size": "1.5rem" }} onClick={() => setOpen(!open)}>
                    <RotatingCaret size={16} className={[className, open && "RotatingCaret-open"].filter((x) => x).join(" ")} />
                </IconButton>
                {header}
            </Group>
            <Box sx={{ display: open ? "block" : "none" }}>
                {children}
            </Box>
        </CategoryContainer>
    );
}