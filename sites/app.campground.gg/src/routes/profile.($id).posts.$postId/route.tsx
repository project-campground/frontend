import type { Route } from "./+types/route";
import { Typography } from "@mui/joy";
import { redirect } from "react-router";
import ProfilePostView from "~/routes/profile.($id).posts.$postId/ProfilePostView";
import { authGetUserMiddleware, authMiddleware } from "~/middleware/auth";
import { loginRequiredMiddleware } from "~/middleware/login";
import { sessionRouterContext, sessionUserRouterContext } from "~/session";

export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: `Campground — ${loaderData.ok ? loaderData.post!.author.displayName : `Profile`}` },
        { name: "description", content: loaderData.ok ? loaderData.post!.author.tagline : "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
    authGetUserMiddleware,
    loginRequiredMiddleware,
];


export async function clientLoader({ context, params: { id, postId } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/profile");

    const session = context.get(sessionRouterContext);
    const user = context.get(sessionUserRouterContext);

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
    const parentPostRequest = ok && content.parentUri ? await session.restClient.fetchPost(id, content.parentUri.split("/")[4]) : null;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        currentUser: user,
        post: content,
        parentPostDeleted: parentPostRequest?.status === 404,
        parentPost: parentPostRequest?.content,
    };
}
clientLoader.hydrate = true as const;

export default function ProfilePosts_Id({ loaderData: { ok, errorHeader, status, currentUser, post, parentPostDeleted, parentPost } }: Route.ComponentProps) {
    return (
        ok
        ? <ProfilePostView currentUser={currentUser} post={post!} parentPost={parentPost} parentPostDeleted={parentPostDeleted} />
        : <Typography>Error {errorHeader ?? status}</Typography>
    );
}