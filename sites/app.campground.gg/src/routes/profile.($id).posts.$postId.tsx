import type { Route } from "./+types/profile.($id).posts.$postId";
import { Typography } from "@mui/joy";
import { redirect } from "react-router";
import { exampleComments, examplePosts } from "~/example/profile";
import ProfilePostView from "~/layout/profile/ProfilePostView";
import { authMiddleware } from "~/middleware/auth";
import { loginRequiredMiddleware } from "~/middleware/login";
import { sessionRouterContext } from "~/session";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
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

    const userRequest = await session.restClient.fetchProfile(id);
    console.log(userRequest);

    const post = examplePosts.find((x) => x.id === postId);

    const { errorDescription, errorHeader, content, ok, status } = userRequest;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        user: content,
        post,
        comments: exampleComments
    };
}
clientLoader.hydrate = true as const;

export default function ProfilePosts_Id({ loaderData: { error, user, post, comments } }: Route.ComponentProps) {
    return (
        error == null
        ? <ProfilePostView user={user!} post={{ profileUser: user!, author: user!, ...post! }} comments={comments.map((x) => ({ author: user!, ...x }))} />
        : <Typography>Error {error}</Typography>
    );
}