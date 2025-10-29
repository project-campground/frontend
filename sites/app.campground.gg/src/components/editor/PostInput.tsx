import { Card, CardContent, Link, Typography } from "@mui/joy";
import type { SxProps } from "@mui/joy/styles/types";
import { useState } from "react";
import type { User } from "types/user";
import UserAvatar from "../UserAvatar";
import { Group } from "components";
import BlockTextEditor from "./BlockTextEditor";

type Props = {
    user: User;
    content?: string;
    placeholder?: string;
    sx?: SxProps;
};

export default function PostInput({ user, placeholder, sx }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Card variant="soft" sx={sx}>
            <CardContent>
                {open
                    ? <Group gap={1.5} alignItems="center">
                        <UserAvatar did={user.did} avatar={user.avatar} size="lg" />
                        <BlockTextEditor sx={(theme) => ({ flex: 1, color: theme.vars.palette.text.secondary })} />
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