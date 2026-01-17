import { ListItemContent, ListItemDecorator, Menu, MenuItem } from "@mui/joy";
import { IconMountainFilled } from "@tabler/icons-react";

type Props = {

};

export default function MessageEditorMenu(props: Props) {
    return (
        <Menu variant="soft">
            <MenuItem>
                <ListItemDecorator>
                    <IconMountainFilled />
                </ListItemDecorator>
                <ListItemContent>
                    Add image
                </ListItemContent>
            </MenuItem>
        </Menu>
    );
}