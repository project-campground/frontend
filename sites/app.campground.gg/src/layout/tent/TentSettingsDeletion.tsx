import { Alert, Button } from "@mui/joy";
import type { SettingsComponentProps } from "../settings";
import {
    IconExclamationCircleFilled,
    IconTrashFilled,
} from "@tabler/icons-react";
import type { TentSettingsProps } from "./TentSettingsModal";
import { useSession } from "~/context/session";
import { useSnackbars } from "~/context/snackbar";
import { useContext } from "react";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";
import { FormattedMessage } from "react-intl";
import { FormattedMessageGlobal } from "~/i18n";
import SettingsPageWrapper from "../settings/page";

export default function TentSettingsDeletion({
    settingsProps: { tent },
}: SettingsComponentProps<TentSettingsProps>) {
    const session = useSession();
    const floating = useSnackbars();
    const modalClose = useContext(CloseModalContext);

    return (
        <SettingsPageWrapper
            startDecorator={<IconTrashFilled />}
            header={<FormattedMessageGlobal id="app.tents.delete" />}
            gap={2}
            alignItems="start"
        >
            <Alert
                variant="soft"
                color="danger"
                startDecorator={<IconExclamationCircleFilled />}
            >
                <FormattedMessage
                    id="app.tents.delete.warning"
                    defaultMessage="Deleting this tent will result in permanent deletion of all of its permissions, messages and content. If you are sure you want to delete this tent, type the name of the tent and press ''{buttonText}''."
                    description="The warning about the consequences of deleting tent"
                    values={{
                        buttonText: (
                            <FormattedMessageGlobal id="form.confirmDelete" />
                        ),
                    }}
                />
            </Alert>
            <Button
                variant="glow"
                color="danger"
                onClick={(ev) =>
                    session.http.tents.delete(tent.id).then((resp) => {
                        if (!resp.ok) return floating.notifyApiError(resp);

                        return modalClose?.(ev, "closeClick");
                    })
                }
            >
                <FormattedMessageGlobal id="form.confirmDelete" />
            </Button>
        </SettingsPageWrapper>
    );
}
