import { ButtonGroup } from "@mui/joy";
import { Group } from "components";
import { ReactNode } from "react"
import MarkNodeToggle from "./MarkNodeToggle";
import { IconBlockquote, IconBold, IconBraces, IconCode, IconItalic, IconList, IconListNumbers, IconQuote, IconSeparatorHorizontal, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import BlockNodeToggle from "./BlockNodeToggle";
import ListNodeToggle from "./ListNodeToggle";
import CodeNodeToggle from "./CodeNodeToggle";
import BlockNodeInsert from "./BlockNodeInsert";
import InlineNodeToggle from "./InlineNodeToggle";

type Props = {
    children: ReactNode[] | ReactNode;
}

export function RichEditorToolbarInlineFormatting() {
    return (
        <ButtonGroup variant="plain">
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
            <InlineNodeToggle format="inline-quote">
                <IconQuote />
            </InlineNodeToggle>
        </ButtonGroup>
    );
}

export function RichEditorToolbarBlockFormatting() {
    return (
        <ButtonGroup variant="plain">
            <BlockNodeToggle format="block-quote">
                <IconBlockquote />
            </BlockNodeToggle>
            <CodeNodeToggle format="code-block" itemFormat="code-line">
                <IconCode />
            </CodeNodeToggle>
            <ListNodeToggle format="unordered-list" itemFormat="list-item">
                <IconList />
            </ListNodeToggle>
            <CodeNodeToggle format="ordered-list" itemFormat="list-item">
                <IconListNumbers />
            </CodeNodeToggle>
            <BlockNodeInsert format="divider">
                <IconSeparatorHorizontal />
            </BlockNodeInsert>
        </ButtonGroup>
    );
}

export default function RichEditorToolbar({ children }: Props) {
    return (
        <Group gap={1}>
            {children}
        </Group>
    )
}