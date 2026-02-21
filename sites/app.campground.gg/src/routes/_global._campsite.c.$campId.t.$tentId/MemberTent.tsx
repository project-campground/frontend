import { Dropdown, IconButton, ListItem, ListItemContent, Menu, MenuButton } from "@mui/joy";
import React from "react";
import type { TentViewDetailed } from "types/tent";
import { UserDisplayNoModal } from "~/components/UserDisplay";
import { Group } from "components";
import { type ContextSuite } from "~/context/context-suite";
import { CampsiteContextSuiteContext, useCampsite, type CampsiteContextSuite } from "../_global._campsite/context";
import type { CampsiteMemberViewDetailed, CampsiteRoleView } from "types/campsites";
import RoleDisplay from "~/components/campsite/RoleDisplay";
import Datestamp from "~/components/Datestamp";
import { useSession } from "~/context/session";
import { IconHammer, IconLogout2, IconPlus } from "@tabler/icons-react";
import type { TypeToPayload } from "types/ws";
import type { MemberRolesModified } from "types/membership";
import DataDisplay from "~/components/pages/DataDisplay";

type Props = {
    campsiteId: string;
    tent: TentViewDetailed;
};

type State = {
};

export default class MemberTent extends React.Component<Props, State, ContextSuite> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;
    
    private onWebSocketEvent<T extends keyof TypeToPayload>(members: CampsiteMemberViewDetailed[], type: T, payload: TypeToPayload[T]): boolean {
        const memberRolesModified = payload as MemberRolesModified;
        switch(type) {
            case "MemberRolesAdded":
                const membersWithRolesAdded = members.filter((x) => memberRolesModified.members.includes(x.user.did));

                if (!membersWithRolesAdded.length)
                    return false;

                for (const member of membersWithRolesAdded)
                    member.roles.push(memberRolesModified.role.id);
                break;
            case "MemberRolesRemoved":
                const membersWithRolesRemoved = members.filter((x) => memberRolesModified.members.includes(x.user.did));

                if (!membersWithRolesRemoved.length)
                    return false;

                for (const member of membersWithRolesRemoved)
                    member.roles = member.roles.filter((x) => x !== memberRolesModified.role.id);
                break;
        }
        return true;
    }

    async fetchMembers(offset: number, _limit: number) {
        const { session } = this.context as CampsiteContextSuite;

        return session
            .restClient!
            .getMembersDetailed(this.props.campsiteId, offset)
            .then((resp) => {
                if (!resp.ok)
                    return resp;

                return { ...resp, content: resp.content.members };
            });
    }

    private _onKickMembersBind = this.onKickMembers.bind(this);
    private onKickMembers(selected: CampsiteMemberViewDetailed[]) {
        console.log("Kicking", selected);
    }

    private _onBanMembersBind = this.onBanMembers.bind(this);
    private onBanMembers(selected: CampsiteMemberViewDetailed[]) {
        console.log("Banning", selected);
    }

    render(): React.ReactNode {
        const {  } = this.props;
        const { campsite } = (this.context as CampsiteContextSuite);

        return (
            <DataDisplay
                title="members"
                itemsPerPage={50}
                maxItems={campsite.memberCount}
                columns={[
                    { id: "name", name: "Member", width: 240, Component: NameComponent },
                    { id: "joined", name: "Joined At", width: 120, Component: JoinedComponent, screenSize: "lg", },
                    { id: "created", name: "Created At", width: 120, Component: CreatedComponent, screenSize: "xl", },
                    { id: "roles", name: "Roles", Component: RolesComponent },
                ]}
                menu={[
                    { startDecorator: <IconLogout2 />, content: "Kick members", onClick: this._onKickMembersBind, variant: "plain", color: "danger" },
                    { startDecorator: <IconHammer />, content: "Ban members", onClick: this._onBanMembersBind, variant: "plain", color: "danger" },
                ]}
                HeaderComponent={NameComponent}
                Component={RolesComponent}
                fetch={this.fetchMembers.bind(this)}
                updateItems={this.onWebSocketEvent.bind(this)}
            />
        );
    }
}

function NameComponent({ item: member }: { item: CampsiteMemberViewDetailed }) {
    return (
        <UserDisplayNoModal
            user={member.user}
            size="md"
        />
    );
}
function JoinedComponent({ item: member }: { item: CampsiteMemberViewDetailed }) {
    return (
        <Datestamp long date={new Date(member.joinedAt)} />
    );
}
function CreatedComponent({ item: member }: { item: CampsiteMemberViewDetailed }) {
    return (
        <Datestamp long date={new Date(member.user.indexedAt)} />
    );
}
function RolesComponent({ item: member }: { item: CampsiteMemberViewDetailed }) {
    const campsite = useCampsite();
    const session = useSession();
    const roles = campsite.roles;
    const userRoles = roles.filter((x) => member.roles.includes(x.id));
    const nonUserRoles = roles.filter((x) => !member.roles.includes(x.id));
    const onRoleAdd = (role: CampsiteRoleView) =>
        session.restClient
            .addMemberRole(campsite.id, role.id, {
                memberIds: [member.user.did], 
            });
    const onRoleRemove = (role: CampsiteRoleView) =>
        session.restClient
            .removeMemberRole(campsite.id, role.id, {
                memberIds: [member.user.did], 
            });        

    return (
        <Group wrap gap={1} alignItems="center">
            {userRoles.slice(0, 4).map((x) =>
                <RoleDisplay key={x.id} {...x} onRemove={onRoleRemove} />
            )}
            {userRoles.length > 4
            ? <Dropdown>
                <MenuButton size="sm">
                    +{userRoles.length - 4} more
                </MenuButton>
                <Menu variant="soft">
                    {userRoles.slice(4).map((x) =>
                        <ListItem key={x.id}>
                            <ListItemContent>
                                <RoleDisplay {...x} onRemove={onRoleRemove} />
                            </ListItemContent>
                        </ListItem>
                    )}
                </Menu>
            </Dropdown>
            : ""}
            {!!nonUserRoles.length &&
                <Dropdown>
                    <MenuButton slots={{ root: IconButton }} slotProps={{ root: { sx: { "--IconButton-size": "1.5rem" }, variant: "soft", size: "sm" } }}>
                        <IconPlus size={16} />
                    </MenuButton>
                    <Menu variant="soft">
                        {nonUserRoles.map((x) =>
                            <ListItem key={x.id}>
                                <ListItemContent>
                                    <RoleDisplay {...x} onClick={onRoleAdd} endDecorator={<IconPlus size={16} />} />
                                </ListItemContent>
                            </ListItem>
                        )}
                    </Menu>
                </Dropdown>
            }
        </Group>
    );
}