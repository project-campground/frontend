import { Button, Link, Stack } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useState } from "react";
import { Group } from "components";
import BlockTextEditor from "./BlockTextEditor";
import withCgMarkdown from "~/editor/withCgMarkdown";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import type { RichEditor } from "~/editor/editor";
import { IconArrowRight } from "@tabler/icons-react";
import { mdastifyEditor } from "~/editor/mdast";
import { serializeMarkdown } from "~/editor/mdast/markdown";

type Props = {
    content?: string;
    placeholder?: string;
    sx?: SxProps;
    confirmButton?: string;
    onConfirm: (content: string) => void | Promise<void>;
    onCancel?: () => void | Promise<void>;
};

export default function BasicPostEditor({ placeholder, onConfirm, onCancel, content, confirmButton, sx }: Props) {
    const [editor] = useState(() => withCgMarkdown(withHistory(withReact(createEditor()))) as RichEditor);

    return (
        <Stack gap={1} sx={sx}>
            <BlockTextEditor enableToolbar editor={editor} defaultValue={content} sx={(theme) => ({ color: theme.vars.palette.text.secondary })} placeholder={placeholder ?? "What is your current mood?"} />
            <Group gap={2} alignItems="center">
                <Button variant="glow" color="primary" endDecorator={<IconArrowRight />} onClick={() => onConfirm(serializeMarkdown(mdastifyEditor(editor)))}>{confirmButton ?? "Post"}</Button>
                {onCancel && <Link color="neutral" onClick={onCancel}>Cancel</Link>}
            </Group>
        </Stack>
    );
}