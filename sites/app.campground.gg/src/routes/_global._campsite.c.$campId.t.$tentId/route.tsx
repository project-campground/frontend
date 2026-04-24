import type { Route } from "./+types/route";
import { authMiddleware } from "~/middleware/auth";
import { useContext, useMemo } from "react";
import { TentContext, useCampsiteContext } from "../_global._campsite/context";
import TentLayout from "./TentLayout";
import PagePlaceholder, {
    PagePlaceholderIcon,
} from "~/components/pages/PagePlaceholder";

export function meta({ loaderData: { tentId } }: Route.MetaArgs) {
    return [
        { title: `Campground — ${tentId}` },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export async function clientLoader({
    params: { campId, tentId },
}: Route.ClientLoaderArgs) {
    // if (pseudoTentTypes.includes(tentId as PseudoTentType))
    //     return {
    //         err: null,
    //         campsiteId: campId,
    //         tentId,
    //         tent: { id: tentId, campsiteId: campId, name: pseudoTents[tentId as PseudoTentType].name, bonfireId: "", categoryId: null, permissions: [], description: "", type: tentId, viewType: 0, } as unknown as TentViewDetailed
    //     };

    // const tent = await session.http.tents.get(tentId);

    // if (!tent.ok)
    //     return { err: tent.status, errorDescription: tent.errorDescription, errorHeader: tent.errorHeader, campsiteId: campId, tentId, tent: null };
    // // Wrong ID for the campsite channel
    // else if (tent.content.campsiteId !== campId)
    //     throw redirect(`/c/${tent.content.campsiteId}/t/${tent.content.id}`);

    // return {
    //     err: null,
    //     campsiteId: campId,
    //     tentId,
    //     tent: tent.content,
    // };
    return {
        campsiteId: campId,
        tentId,
    };
}

export default function Index({
    loaderData: { campsiteId, tentId },
}: Route.ComponentProps) {
    return (
        <TentLayout
            campsiteId={campsiteId}
            tentId={tentId}
        />
    );
}
