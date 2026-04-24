import type { Route } from "./+types/route";
import ProfileView from "~/routes/_global.profile.$id/ProfileView";
import { authMiddleware } from "~/middleware/auth";
import { useSession } from "~/context/session";
import { BackendApiContext } from "~/context/api";
import HTTPBackendClient from "~/api/http/HTTPBackendClient";
import { defaultBackendDomain } from "api.config";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `Campground — Profile` },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
    return {
        id,
    };
}

export default function Index({ loaderData: { id } }: Route.ComponentProps) {
    const session = useSession();

    return (
        <BackendApiContext value={new HTTPBackendClient(session, defaultBackendDomain)}>
            <ProfileView did={id} />
        </BackendApiContext>
    );
}