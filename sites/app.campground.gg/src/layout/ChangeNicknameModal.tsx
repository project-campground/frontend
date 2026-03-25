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
            <DialogTitle>Change member nickname</DialogTitle>
            <DialogContent>Nickname will be displayed for all members only on this campsite.</DialogContent>
            <Form
                sections={[
                    {
                        id: "nickname",
                        fields: [
                            {
                                id: "nickname",
                                type: "text",
                                header: "Member nickname",
                                placeholder: member.user.displayName ?? member.user.handle,
                                defaultValue: member.nickname ?? undefined,
                            }
                        ],
                    },
                ]}
                onSubmit={(_, values) => (onClose(), onSubmit(values.nickname ?? ""))}
                onCancel={() => onClose()}
                cancelText="Cancel"
                submitText="Change nickname"
            />
        </ModalDialog>
    )
}