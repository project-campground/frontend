import {
    ListItem,
    ListItemButton,
    ListItemContent,
    ListItemDecorator,
    MenuItem,
    Modal,
} from "@mui/joy";
import { GradientTypography } from "components";
import { useState, type MouseEvent } from "react";
import type {
    CampsiteMemberViewBasic,
    CampsiteRoleView,
} from "types/campsites";
import UserAvatar from "~/components/UserAvatar";
import { useRightClick } from "~/context/mouse";
import { colorToDecimal } from "~/util/color";
import { useCampsiteContext } from "../_global._campsite/context";
import { GeneralPermissionConsts, isAboveUser } from "~/util/permissions";
import { IconHammer, IconSignature, IconUserMinus } from "@tabler/icons-react";
import ChangeNicknameModal from "~/layout/ChangeNicknameModal";
import { useSession } from "~/context/session";
import { handleAnyRestErrorWith } from "~/util/rest";
import { useSnackbars } from "~/context/snackbar";
import BanMemberModal from "~/layout/BanMemberModal";
import { FormattedMessage } from "react-intl";

type ModalType = "nickname" | "ban";

type Props = {
    campsiteId: string;
    member: CampsiteMemberViewBasic;
    roles: CampsiteRoleView[];
    onClick: (ev: MouseEvent<HTMLDivElement>) => unknown;
};

export default function MemberItem({
    campsiteId,
    member,
    roles,
    onClick,
}: Props) {
    const {
        permissions,
        campsite: { owner, me },
    } = useCampsiteContext();
    const session = useSession();
    const snackbars = useSnackbars();
    const meAboveUser = isAboveUser(member, me, owner, roles);
    const mePermissions = permissions.role.general;
    const [openModal, setOpenModal] = useState<ModalType | null>(null);
    const closeModal = () => setOpenModal(null);

    const removeMember = () =>
        session.http.members
            .remove(campsiteId, member.user.did)
            .then(handleAnyRestErrorWith(snackbars));

    const { listeners } = useRightClick({
        menuProps: {},
        // TODO: Actual prompts whether they want to ban user and whatnot
        MenuComponent: () => (
            <>
                {((meAboveUser &&
                    !!(
                        mePermissions &
                        GeneralPermissionConsts.MANAGE_OTHERS_IDENTITY
                    )) ||
                    (me.user.did === member.user.did &&
                        !!(
                            mePermissions &
                            GeneralPermissionConsts.MANAGE_SELF_IDENTITY
                        ))) && (
                    <MenuItem onClick={() => setOpenModal("nickname")}>
                        <ListItemDecorator>
                            <IconSignature />
                        </ListItemDecorator>
                        <ListItemContent>
                            <FormattedMessage id="app.members.nickname.change" />
                        </ListItemContent>
                    </MenuItem>
                )}
                {meAboveUser &&
                    !!(
                        mePermissions & GeneralPermissionConsts.KICK_MEMBERS
                    ) && (
                        <MenuItem
                            variant="plain"
                            color="danger"
                            onClick={removeMember}
                        >
                            <ListItemDecorator>
                                <IconUserMinus />
                            </ListItemDecorator>
                            <ListItemContent>
                                <FormattedMessage id="app.members.kick" />
                            </ListItemContent>
                        </MenuItem>
                    )}
                {meAboveUser &&
                    !!(mePermissions & GeneralPermissionConsts.BAN_MEMBERS) && (
                        <MenuItem
                            variant="plain"
                            color="danger"
                            onClick={() => setOpenModal("ban")}
                        >
                            <ListItemDecorator>
                                <IconHammer />
                            </ListItemDecorator>
                            <ListItemContent>
                                <FormattedMessage id="app.members.ban" />
                            </ListItemContent>
                        </MenuItem>
                    )}
            </>
        ),
    });
    const colorRoles = roles.filter(
        (x) => x.colors.length && member.roles.includes(x.id),
    );
    const highestColorRole = colorRoles[0];

    return (
        <ListItem sx={{ userSelect: "none" }}>
            <ListItemButton {...listeners} onClick={onClick}>
                <ListItemDecorator>
                    <UserAvatar
                        withStatus
                        size="md"
                        did={member.user.did}
                        avatar={member.user.avatar}
                    />
                </ListItemDecorator>
                <ListItemContent>
                    <GradientTypography
                        motion={highestColorRole?.motion ?? "none"}
                        colors={colorToDecimal(highestColorRole?.colors)}
                        fontWeight={700}
                    >
                        {member.nickname ?? member.user.displayName}
                    </GradientTypography>
                </ListItemContent>
            </ListItemButton>
            <Modal open={openModal === "nickname"}>
                <ChangeNicknameModal
                    campsiteId={campsiteId}
                    member={member}
                    onClose={closeModal}
                />
            </Modal>
            <Modal open={openModal === "ban"}>
                <BanMemberModal
                    campsiteId={campsiteId}
                    member={member}
                    onClose={closeModal}
                />
            </Modal>
        </ListItem>
    );
}
