import { sessionRouterContext } from "~/context/session";
import type { Route } from "./+types/route";
import CampsiteInvite from "./CampsiteInvite";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Invite" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ context, params: { inviteId } }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    const invite = await session.restClient!.getInvite(inviteId);

    if (!invite.ok)
        return { err: invite.status, errorDescription: invite.errorDescription, errorHeader: invite.errorHeader, inviteId, invite: null };

    return {
        err: null,
        inviteId,
        invite: invite.content,
    };
}

export default function Index({ loaderData: { invite, inviteId, err, errorDescription, errorHeader } }: Route.ComponentProps) {
    if (err)
        return (
            <PagePlaceholder icon={err === 404 ? PagePlaceholderIcon.NotFound : PagePlaceholderIcon.Error} title={`${err} ${errorHeader}`}>
                {errorDescription}
            </PagePlaceholder>
        );

    return (
        <CampsiteInvite inviteId={inviteId} invite={invite!} />
    );
}