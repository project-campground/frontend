import { Box, IconButton, Stack, styled } from "@mui/joy";
import { Group } from "components";
import React, { useState } from "react";
import { RotatingCaret } from "./RotatingCaret";

const CategoryContainer = styled(Stack)(() => ({
    overflow: "hidden",
}));

type Props = React.PropsWithChildren & {
    header: React.ReactElement | React.ReactElement[];
};

export default function ContentCategory({ header, children }: Props) {
    const [open, setOpen] = useState(true);
    const className = open ? "open" : "";

    return (
        <CategoryContainer className={className} gap={1}>
            <Group sx={{ minHeight: 24, maxHeight: 44 }} alignItems="center" gap={1}>
                <IconButton sx={{ "--IconButton-size": "1.5rem" }} onClick={() => setOpen(!open)}>
                    <RotatingCaret size={16} className={className} />
                </IconButton>
                {header}
            </Group>
            <Box sx={{ display: open ? "block" : "none"}}>
                {children}
            </Box>
        </CategoryContainer>
    );
}