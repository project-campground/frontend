import { ButtonGroup, Dropdown, ListItemContent, ListItemDecorator, Menu, MenuButton } from "@mui/joy";
import { Group } from "components";
import { ReactNode } from "react"
import MarkNodeToggle from "./MarkNodeToggle";
import { IconBlockquote, IconBold, IconBraces, IconCaretDownFilled, IconCode, IconH1, IconH2, IconH3, IconH4, IconH6, IconItalic, IconList, IconListNumbers, IconSeparatorHorizontal, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import BlockNodeToggle from "./BlockNodeToggle";
import ListNodeToggle from "./ListNodeToggle";
import CodeNodeToggle from "./CodeNodeToggle";
import BlockNodeInsert from "./BlockNodeInsert";
import BlockNodeMenuItem from "./BlockNodeMenuItem";

type Props = {
    children: ReactNode[] | ReactNode;
}

export function RichEditorToolbarInlineFormatting() {
    return (
        <ButtonGroup variant="soft" sx={{ overflow: "hidden" }}>
            <MarkNodeToggle format="bold">
                <IconBold />
            </MarkNodeToggle>
            <MarkNodeToggle format="italic">
                <IconItalic />
            </MarkNodeToggle>
            <MarkNodeToggle format="underline">
                <IconUnderline />
            </MarkNodeToggle>
            <MarkNodeToggle format="strikethrough">
                <IconStrikethrough />
            </MarkNodeToggle>
            <MarkNodeToggle format="code">
                <IconBraces />
            </MarkNodeToggle>
            {/* <InlineNodeToggle format="inline-quote">
                <IconQuote />
            </InlineNodeToggle> */}
        </ButtonGroup>
    );
}

export function RichEditorToolbarBlockFormatting() {
    return (
        <ButtonGroup variant="soft" sx={{ overflow: "hidden" }}>
            <BlockNodeToggle format="block-quote">
                <IconBlockquote />
            </BlockNodeToggle>
            <CodeNodeToggle format="code-block" itemFormat="code-line">
                <IconCode />
            </CodeNodeToggle>
            <ListNodeToggle format="unordered-list" itemFormat="list-item">
                <IconList />
            </ListNodeToggle>
            <ListNodeToggle format="ordered-list" itemFormat="list-item">
                <IconListNumbers />
            </ListNodeToggle>
            <BlockNodeInsert format="divider">
                <IconSeparatorHorizontal />
            </BlockNodeInsert>
        </ButtonGroup>
    );
}
export function RichEditorToolbarHeading() {
    return (
        <Dropdown>
            <ButtonGroup variant="soft" sx={{ overflow: "hidden" }}>
                <BlockNodeToggle format="heading">
                    <IconH1 />
                </BlockNodeToggle>
                <MenuButton size="sm">
                    <IconCaretDownFilled size={16} />
                </MenuButton>
            </ButtonGroup>
            <Menu>
                <BlockNodeMenuItem format="heading" additionalProps={{ level: 2 }}>
                    <ListItemDecorator>
                        <IconH2 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Heading 2
                    </ListItemContent>
                </BlockNodeMenuItem>
                <BlockNodeMenuItem format="heading" additionalProps={{ level: 3 }}>
                    <ListItemDecorator>
                        <IconH3 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Heading 3
                    </ListItemContent>
                </BlockNodeMenuItem>
                <BlockNodeMenuItem format="heading" additionalProps={{ level: 4 }}>
                    <ListItemDecorator>
                        <IconH4 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Heading 4
                    </ListItemContent>
                </BlockNodeMenuItem>
                <BlockNodeMenuItem format="heading" additionalProps={{ level: 5 }}>
                    <ListItemDecorator>
                        <IconH6 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Heading 5
                    </ListItemContent>
                </BlockNodeMenuItem>
                <BlockNodeMenuItem format="heading" additionalProps={{ level: 6 }}>
                    <ListItemDecorator>
                        <IconH6 />
                    </ListItemDecorator>
                    <ListItemContent>
                        Heading 6
                    </ListItemContent>
                </BlockNodeMenuItem>
            </Menu>
        </Dropdown>
    );
}

export default function RichEditorToolbar({ children }: Props) {
    return (
        <Group gap={0.5} sx={(theme) => ({ p: 1, backgroundColor: theme.vars.palette.background.level1 })}>
            {children}
        </Group>
    )
}