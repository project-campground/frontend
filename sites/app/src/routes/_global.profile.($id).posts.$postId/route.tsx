import type { Route } from "./+types/route";
import { redirect } from "react-router";
import ProfilePostView from "~/routes/_global.profile.($id).posts.$postId/ProfilePostView";
import { authMiddleware } from "~/middleware/auth";
import { useSession } from "~/context/session";
import { BackendApiContext } from "~/context/api";
import HTTPBackendClient from "~/api/http/HTTPBackendClient";
import { defaultBackendDomain } from "api.config";

export function meta({}: Route.MetaArgs) {
    return [
        { title: `Campground — Profile post` },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export async function clientLoader({ params: { id, postId } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/profile");

    return { profileId: id, postId };
}

export default function ProfilePosts_Id({ loaderData: { profileId, postId } }: Route.ComponentProps) {
    const session = useSession();

    return (
        <BackendApiContext.Provider value={new HTTPBackendClient(session, defaultBackendDomain)}>
            <ProfilePostView profileId={profileId} postId={postId} />
        </BackendApiContext.Provider>
    );
}