import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import Form from "../components/form/Form";
import type { MemberViewBasic } from "types/membership";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith as handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessage } from "react-intl";

type Props = {
    campsiteId: string;
    member: MemberViewBasic;
    onClose: () => unknown;
};

export default function ChangeNicknameModal({ campsiteId, member, onClose }: Props) {
    const session = useSession();
    const floating = useSnackbars();
    const onSubmit = (nickname: string) =>
        session
            .http
            .members
            .update(campsiteId, member.user.did, { nickname })
            .then(handleAnyRestErrorWith(floating))

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessage
                    id="app.members.nickname.change"
                />
            </DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="app.members.nickname.change.description"
                    defaultMessage="The nickname will be displayed only on this campsite for every member to see"
                    description="Note about the nickname change in change nickname modal"
                />
            </DialogContent>
            <Form
                sections={[
                    {
                        id: "nickname",
                        fields: [
                            {
                                id: "nickname",
                                type: "text",
                                header: <FormattedMessage
                                    id="app.members.nickname"
                                    defaultMessage="Member nickname"
                                    description="The title of nickname change field"
                                />,
                                placeholder: member.user.displayName ?? member.user.handle,
                                defaultValue: member.nickname ?? undefined,
                            }
                        ],
                    },
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.nickname ?? ""))}
                onCancel={() => onClose()}
                submitText={
                    <FormattedMessage
                        id="app.members.nickname.change"
                    />
                }
            />
        </ModalDialog>
    )
}