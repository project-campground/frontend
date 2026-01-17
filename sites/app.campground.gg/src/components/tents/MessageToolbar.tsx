import { ButtonGroup, Divider, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, styled } from "@mui/joy";
import { IconArrowForwardUp, IconDots, IconMoodPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import type { TentMessageViewWithReplies } from "types/content";

type Props = {
    // message: TentMessageViewWithReplies;
    addReply: () => unknown;
    onEdit: () => unknown;
    onDelete: () => unknown;
};

const ToolbarWrapper = styled(ButtonGroup, {
    name: "TentMessage",
    slot: "toolbar"
})(({ theme }) => ({
    position: "absolute",
    top: 5,
    right: 7.5,
    opacity: 0,
    transition: "opacity 0.3s",
    border: `solid 1px ${theme.vars.palette.neutral[600]}`,
    boxShadow: theme.vars.shadow.md,
    ".TentMessage-wrapper:hover &": {
        opacity: 1,
    }
}));

export default function MessageToolbar({ onEdit, addReply, onDelete }: Props) {
    return (
        <>
            <ToolbarWrapper variant="soft">
                <IconButton>
                    <IconMoodPlus />
                </IconButton>
                <Divider />
                <IconButton onClick={onEdit}>
                    <IconPencil />
                </IconButton>
                <IconButton onClick={addReply}>
                    <IconArrowForwardUp />
                </IconButton>
                <Dropdown>
                    <MenuButton slots={{ root: IconButton }}>
                        <IconDots />
                    </MenuButton>
                    <Menu>
                        <MenuItem color="danger" onClick={onDelete}>
                            <ListItemDecorator>
                                <IconTrash />
                            </ListItemDecorator>
                            <ListItemContent>
                                Delete message
                            </ListItemContent>
                        </MenuItem>
                    </Menu>
                </Dropdown>
            </ToolbarWrapper>
        </>
    );
}