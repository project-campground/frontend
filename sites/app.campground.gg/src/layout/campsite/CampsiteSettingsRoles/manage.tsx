import { Stack, Box, Typography, Button, Alert } from "@mui/joy";
import { useState } from "react";
import type { RoleView } from "types/roles";
import ContentDeleteModal from "~/layout/ContentDeleteModal";
import RoleItem from "../RoleItem";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { FormattedMessageGlobal } from "~/i18n";

export default function RolePageManage({ role, onRoleDelete }: { role: RoleView; onRoleDelete: (role: RoleView) => unknown; }) {
    const [promptDelete, setPromptDelete] = useState(false);
    const isDefaultRole = (role.flags & 1) === 1;
    
    return (
        <Stack>
            <Box>
                <Typography level="title-md">Delete role</Typography>
                <Typography level="body-md">Permanently deletes this role.</Typography>
                <Button color="danger" variant="outlined" sx={{ mt: 1 }} onClick={() => setPromptDelete(true)} disabled={isDefaultRole}>Delete</Button>
                {isDefaultRole && <Alert sx={{ mt: 2 }} variant="soft" color="warning" startDecorator={<IconExclamationCircleFilled />}>This role cannot be deleted, as it is the default member role for this campsite.</Alert>}
            </Box>
            <ContentDeleteModal
                nominativeCase={<FormattedMessageGlobal id="app.roles.nominativeCase" />}
                accusativeCase={<FormattedMessageGlobal id="app.roles.accusativeCase" />}
                open={promptDelete}
                onClose={() => setPromptDelete(false)}
                onConfirm={() => (setPromptDelete(false), onRoleDelete(role))}
                ContentRender={() => <RoleItem {...role} immovable={true} />}
            />
        </Stack>
    );
}