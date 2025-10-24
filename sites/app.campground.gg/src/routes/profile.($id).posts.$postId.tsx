import type { Route } from "./+types/profile.($id).posts.$postId";
import { Typography } from "@mui/joy";
import { redirect } from "react-router";
import ProfilePostView from "~/layout/profile/ProfilePostView";
import { authMiddleware } from "~/middleware/auth";
import { loginRequiredMiddleware } from "~/middleware/login";
import { sessionRouterContext } from "~/session";

export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: `Campground — ${loaderData.ok ? loaderData.user!.displayName : `Profile`}` },
        { name: "description", content: loaderData.ok ? loaderData.user!.tagline : "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
    loginRequiredMiddleware,
];


export async function clientLoader({ context, params: { id, postId } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/profile");

    const session = context.get(sessionRouterContext);

    // Can't fetch
    if (!session.restClient)
        return {
            id,
            status: 401,
        };

    // const userRequest = await session.restClient.fetchProfile(id);
    const postRequest = await session.restClient.fetchPost(id, postId);
    console.log(postRequest);

    const { errorDescription, errorHeader, content, ok, status } = postRequest;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        user: content?.author,
        post: content,
    };
}
clientLoader.hydrate = true as const;

export default function ProfilePosts_Id({ loaderData: { ok, errorHeader, errorDescription, status, user, post } }: Route.ComponentProps) {
    return (
        ok
        ? <ProfilePostView user={user!} post={post!} />
        : <Typography>Error {status}</Typography>
    );
}