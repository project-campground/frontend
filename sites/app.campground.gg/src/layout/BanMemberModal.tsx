import { DialogContent, DialogTitle, ModalClose, ModalDialog } from "@mui/joy";
import Form from "../components/form/Form";
import type { CampsiteMemberViewBasic } from "types/campsites";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith as handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";

type Props = {
    campsiteId: string;
    member: CampsiteMemberViewBasic;
    onClose: () => unknown;
};

export default function BanMemberModal({ campsiteId, member, onClose }: Props) {
    const session = useSession();
    const floating = useSnackbars();
    const onSubmit = (reason: string) =>
        session
            .http
            .memberBans
            .create(campsiteId, member.user.did, { reason })
            .then(handleAnyRestErrorWith(floating))

    return (
        <ModalDialog>
            <ModalClose />
            <DialogTitle>Ban member</DialogTitle>
            <DialogContent>The user will be kicked from this campsite and permanently banned until their ban is removed.</DialogContent>
            <Form
                sections={[
                    {
                        id: "reason",
                        fields: [
                            {
                                id: "reason",
                                type: "text",
                                header: "Ban reason",
                                placeholder: "Have been a bad member",
                            }
                        ],
                    },
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.reason))}
                onCancel={() => onClose()}
                cancelText="Cancel"
                submitText="Ban member"
                submitColor="danger"
            />
        </ModalDialog>
    )
}