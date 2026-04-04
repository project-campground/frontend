import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import Form from "../components/form/Form";
import type { CampsiteMemberViewBasic } from "types/campsites";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith as handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
    campsiteId: string;
    member: CampsiteMemberViewBasic;
    onClose: () => unknown;
};

export default function BanMemberModal({ campsiteId, member, onClose }: Props) {
    const session = useSession();
    const floating = useSnackbars();
    const intl = useIntl();
    const onSubmit = (reason: string) =>
        session
            .http
            .memberBans
            .create(campsiteId, member.user.did, { reason })
            .then(handleAnyRestErrorWith(floating))

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>
                <FormattedMessage
                    id="app.members.ban"
                />
            </DialogTitle>
            <DialogContent>
                <FormattedMessage
                    id="app.members.ban.description"
                    defaultMessage="The member will lose all their roles, be kicked from the campsite and be unable to join back until their ban is lifted."
                    description="Note about what the user ban will imply when banning a user"
                />
            </DialogContent>
            <Form
                sections={[
                    {
                        id: "reason",
                        fields: [
                            {
                                id: "reason",
                                type: "text",
                                header: intl.formatMessage({
                                    id: "app.bans.reason"
                                }),
                                placeholder: intl.formatMessage({
                                    id: "app.bans.reason.example",
                                    defaultMessage: "Have been spamming",
                                    description: "Example of a ban reason when banning user",
                                }),
                            }
                        ],
                    },
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.reason))}
                onCancel={() => onClose()}
                submitText={
                    <FormattedMessage
                        id="app.members.ban"
                    />
                }
                submitColor="danger"
            />
        </ModalDialog>
    )
}