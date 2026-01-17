import type { Route } from "./+types/route";
import { authMiddleware } from "~/middleware/auth";
import { sessionRouterContext, useSession } from "~/context/session";
import { useContext } from "react";
import { CampsiteContext, TentContext } from "../_global._campsite/context";
import TentLayout from "./TentLayout";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import { redirect } from "react-router";
import WebSocketClient from "api/WebSocketClient";
import { defaultAppBackendUrl } from "api.config";

export function meta({ loaderData: { tentId, tent } }: Route.MetaArgs) {
    return [
        { title: `Campground — ${tent?.name ?? tentId}` },
        { name: "description", content: tent?.description ?? "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export async function clientLoader({ context, params: { campId, tentId } }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    const tent = await session.restClient!.getTent(tentId);

    if (!tent.ok)
        return { err: tent.status, errorDescription: tent.errorDescription, errorHeader: tent.errorHeader, campsiteId: campId, tentId, tent: null };
    // Wrong ID for the campsite channel
    else if (tent.content.campsiteId !== campId)
        throw redirect(`/c/${tent.content.campsiteId}/t/${tent.content.id}`);

    return {
        err: null,
        campsiteId: campId,
        tentId,
        tent: tent.content,
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { errorDescription, errorHeader, err, campsiteId, tent } }: Route.ComponentProps) {
    if (err === 404)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title="Could not find this tent">
                This tent does not exist.
            </PagePlaceholder>
        );
    else if (err)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.Error} title={errorHeader ?? errorDescription ?? err}>
                {errorDescription}
            </PagePlaceholder>
        );


    const tentContext = useContext(TentContext);
    const campsite = useContext(CampsiteContext);

    tentContext?.setNewValue(tent);

    return (
        <TentLayout campsiteId={campsiteId} tent={tent!} campsite={campsite!} />
    );
}