import type { CampsiteViewDetailed } from "types/campsites";
import { CurrentTentListContext } from "./value";
import type { GetTentsOutput } from "types/tent";
import type { PermissionsDictionary } from "types/permissions";
import { aggregateAllPermissions, invertCampsitePermission, invertTentPermission, maxPermissions, type AggregatedPermissions } from "~/util/permissions";

export const ownerPermissionsAggregated: AggregatedPermissions = {
    role: maxPermissions,
    bonfire: maxPermissions,
    categories: {},
    tents: {},
};

export default class PermissionsManager {
    public campsite: CampsiteViewDetailed;
    public tentList: CurrentTentListContext;
    public permissions: AggregatedPermissions = ownerPermissionsAggregated;
    private _tentToPermissions: Record<string, PermissionsDictionary> = {};
    constructor(campsite: CampsiteViewDetailed) {
        this.campsite = campsite;
        this.tentList = new CurrentTentListContext(null);
        this.tentList.subscribeToChanges(this.onNewTentList.bind(this));
    }
    public get role() {
        return this.permissions.role;
    }
    public get bonfire() {
        return this.permissions.bonfire;
    }
    public get categories() {
        return this.permissions.categories;
    }
    private onNewTentList(value: GetTentsOutput | null) {
        for (const perm in this._tentToPermissions)
            delete this._tentToPermissions[perm];

        if (this.campsite.me.user.did === this.campsite.owner)
            return;

        this.permissions = aggregateAllPermissions(this.campsite.me, this.campsite.roles, value?.permissions ?? []);
    }
    public getTentPermissions(categoryId: string | null | undefined, tentId: string) {
        if (this.campsite.me.user.did === this.campsite.owner)
            return maxPermissions;
        else if (this._tentToPermissions[tentId])
            return this._tentToPermissions[tentId];

        const categoryPerms = (categoryId ? this.permissions.categories[categoryId] : undefined) ?? this.permissions.bonfire;
        const tentPermsState = this.permissions.tents[tentId];

        if (!tentPermsState)
            return categoryPerms;

        return ((this._tentToPermissions[tentId] as PermissionsDictionary) = {
            general: (categoryPerms.general & invertCampsitePermission(tentPermsState.denied.general)) | categoryPerms.general,
            content: (categoryPerms.content & invertTentPermission(tentPermsState.denied.content)) | categoryPerms.content,
        });
    }
}