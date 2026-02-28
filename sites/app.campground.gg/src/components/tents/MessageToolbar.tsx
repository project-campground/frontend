import { ButtonGroup, Divider, Dropdown, IconButton, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, styled } from "@mui/joy";
import { IconArrowForwardUp, IconDots, IconMoodPlus, IconPencil, IconTrash, IconX } from "@tabler/icons-react";

type Props = {
    // message: TentMessageViewWithReplies;
    addReply?: () => unknown;
    onEdit?: () => unknown;
    onDelete?: () => unknown;
    beingRepliedTo?: boolean;
    onlyAllowDeletion?: boolean;
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

export default function MessageToolbar({ onlyAllowDeletion, onEdit, addReply, onDelete, beingRepliedTo }: Props) {
    return (
        <>
            <ToolbarWrapper variant="soft">
                {!onlyAllowDeletion
                ? <>
                    <IconButton>
                        <IconMoodPlus />
                    </IconButton>
                    <Divider />
                    {onEdit && <IconButton onClick={onEdit}>
                        <IconPencil />
                    </IconButton>}
                    {addReply && <IconButton onClick={addReply}>
                        <IconArrowForwardUp />{beingRepliedTo && <IconX size={12} />}
                    </IconButton>}
                    {onDelete && <Dropdown>
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
                    </Dropdown>}
                </>
                : <>
                    <IconButton onClick={onDelete}>
                        <IconTrash />
                    </IconButton>
                </>
                }
            </ToolbarWrapper>
        </>
    );
}