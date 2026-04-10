import {
    DialogContent,
    DialogTitle,
    ModalClose,
    ModalDialog,
    Button,
    Alert,
    FormControl,
    FormLabel,
} from "@mui/joy";
import Form from "../components/form/Form";
import type { MemberViewBasic } from "types/membership";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith as handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessage } from "react-intl";
import FormSection from "~/components/form/FormSection";
import FormSubmit from "~/components/form/FormSubmit";
import FormFieldText from "~/components/form/FormFieldText";
import { FormattedMessageGlobal } from "~/i18n";
import { IconInfoCircleFilled } from "@tabler/icons-react";

type Props = {
    campsiteId: string;
    member: MemberViewBasic;
    onClose: () => unknown;
};

export default function ChangeNicknameModal({
    campsiteId,
    member,
    onClose,
}: Props) {
    const session = useSession();
    const floating = useSnackbars();
    const onSubmit = (nickname: string) =>
        session.http.members
            .update(campsiteId, member.user.did, { nickname })
            .then(handleAnyRestErrorWith(floating));

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessageGlobal id="app.members.nickname.change" />
            </DialogTitle>
            <DialogContent>
                <Alert
                    variant="soft"
                    color="info"
                    startDecorator={<IconInfoCircleFilled />}
                >
                    <FormattedMessage
                        id="app.members.nickname.change.desc"
                        defaultMessage="The nickname will be displayed only on this campsite for every member to see"
                        description="Note about the nickname change in change nickname modal"
                    />
                </Alert>
            </DialogContent>
            <Form
                onSubmit={(_, values) => (
                    onClose(),
                    onSubmit(values.nickname ?? "")
                )}
            >
                <FormSection>
                    <FormControl>
                        <FormLabel>
                            <FormattedMessage
                                id="app.members.nickname"
                                defaultMessage="Member nickname"
                                description="The title of nickname change field"
                            />
                        </FormLabel>
                        <FormFieldText
                            id="nickname"
                            placeholder={
                                member.user.displayName ?? member.user.handle
                            }
                            defaultValue={member.nickname ?? undefined}
                        />
                    </FormControl>
                </FormSection>
                <FormSection layout="footer">
                    <FormSubmit>
                        <FormattedMessageGlobal id="app.members.nickname.change" />
                    </FormSubmit>
                    <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => onClose()}
                    >
                        <FormattedMessageGlobal id="common.cancel" />
                    </Button>
                </FormSection>
            </Form>
        </ModalDialog>
    );
}
