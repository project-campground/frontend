import { Card, CardContent, Link, Stack, Typography } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useState } from "react";
import type { User } from "types/user";
import UserAvatar from "../UserAvatar";
import { Group, PrimaryButton } from "components";
import BlockTextEditor from "./BlockTextEditor";
import withCgMarkdown from "~/editor/withCgMarkdown";
import { withHistory } from "slate-history";
import { withReact } from "slate-react";
import { createEditor } from "slate";
import type { RichEditor } from "~/editor/editor";
import { IconArrowRight } from "@tabler/icons-react";
import { mdastifyEditor } from "~/editor/mdast";
import { toMarkdown } from "mdast-util-to-markdown";

type Props = {
    user: User;
    content?: string;
    placeholder?: string;
    sx?: SxProps;
    onPost: (content: string) => void | Promise<void>;
};

export default function PostInput({ user, placeholder, onPost, sx }: Props) {
    const [open, setOpen] = useState(false);
    const [editor] = useState(() => withCgMarkdown(withHistory(withReact(createEditor()))) as RichEditor);

    return (
        <Card variant="soft" sx={sx}>
            <CardContent>
                {open
                    ? <Group gap={1.5} alignItems="center">
                        <UserAvatar did={user.did} avatar={user.avatar} size="lg" />
                        <Stack gap={1} sx={{ flex: 1 }}>
                            <BlockTextEditor editor={editor} sx={(theme) => ({ color: theme.vars.palette.text.secondary })} placeholder="What is your current mood?" />
                            <Group gap={2} alignItems="center">
                                <PrimaryButton endDecorator={<IconArrowRight />} onClick={() => (setOpen(false), onPost(toMarkdown(mdastifyEditor(editor), { bullet: "-", emphasis: "_" })))}>Post</PrimaryButton>
                                <Link color="neutral" onClick={() => setOpen(false)}>Cancel</Link>
                            </Group>
                        </Stack>
                    </Group>
                    : <Link overlay underline="none" component="button" level="body-md" onClick={() => setOpen(!open)} gap={1.5} color="neutral" startDecorator={<UserAvatar did={user.did} avatar={user.avatar} size="lg" />}>
                        <Typography level="title-lg">
                            {placeholder ?? "What are you thinking?"}
                        </Typography>
                      </Link>
                }
            </CardContent>
        </Card>
    );
}