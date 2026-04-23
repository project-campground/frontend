import { sessionRouterContext } from "~/context/session";
import type { Route } from "./+types/route";
import CampsiteInvite from "./CampsiteInvite";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";
import { defaultBackendDomain } from "api.config";
import { getDomainAndId } from "~/util/domains";

export function meta() {
    return [
        { title: "Campground — Campsite invite" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ context, params: { inviteId: inviteParam } }: Route.ClientLoaderArgs) {
    const inviteSplit = getDomainAndId(inviteParam);

    if (inviteSplit.length > 2)
        return {
            err: 400,
            errorHeader: "InvalidInviteId",
            errorDescription: "The provided invite ID contains more than 2 at symbols.",
            inviteId: inviteParam,
            invite: null,
        };

    const [inviteDomain, inviteId] = inviteSplit.length > 1 ? inviteSplit : ["", inviteSplit[0]];

    const session = context.get(sessionRouterContext);

    const invite = await session.http.invitesGlobal.get(inviteDomain || defaultBackendDomain, inviteId);

    if (!invite.ok)
        return { err: invite.status, errorDescription: invite.errorDescription, errorHeader: invite.errorHeader, inviteId, invite: null };

    return {
        err: null,
        inviteDomain,
        inviteId,
        invite: invite.content,
    };
}

export default function Index({ loaderData: { invite, inviteId, inviteDomain, err, errorDescription, errorHeader } }: Route.ComponentProps) {
    if (err)
        return (
            <PagePlaceholder icon={err === 404 ? PagePlaceholderIcon.NotFound : PagePlaceholderIcon.Error} title={`${err} ${errorHeader}`}>
                {errorDescription}
            </PagePlaceholder>
        );

    return (
        <CampsiteInvite inviteId={inviteId} domain={inviteDomain || defaultBackendDomain} invite={invite!} />
    );
}