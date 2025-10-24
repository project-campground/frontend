import { Card, CardContent, Link, Typography } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useEditor } from "@tiptap/react"; 
import { StarterKit } from "@tiptap/starter-kit"; 
import { useState } from "react";
import type { User } from "types/user";
import UserAvatar from "../UserAvatar";
import MarkdownEditor from "./MarkdownEditor";
import { Group } from "components";

type Props = {
    user: User;
    content?: string;
    placeholder?: string;
    sx?: SxProps;
};

export default function PostInput({ user, content, placeholder, sx }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
    });

    editor.commands.focus();

    const [open, setOpen] = useState(false);

    return (
        <Card variant="soft" sx={sx}>
            <CardContent>
                {open
                    ? <Group gap={1.5} alignItems="center">
                        <UserAvatar did={user.did} avatar={user.avatar} size="lg" />
                        <MarkdownEditor editor={editor} sx={(theme) => ({ flex: 1, color: theme.vars.palette.text.secondary })} />
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