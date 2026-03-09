import type { Route } from "./+types/route";
import { Typography } from "@mui/joy";
import { redirect } from "react-router";
import ProfilePostView from "~/routes/_global.profile.($id).posts.$postId/ProfilePostView";
import { authMiddleware } from "~/middleware/auth";
import { sessionRouterContext } from "~/context/session";

export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: `Campground — ${loaderData.ok ? loaderData.post!.author.displayName : `Profile`}` },
        { name: "description", content: loaderData.ok ? loaderData.post!.author.tagline : "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export async function clientLoader({ context, params: { id, postId } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/profile");

    const session = context.get(sessionRouterContext);

    const postRequest = await session.http.profilePosts.get(id, postId);
    console.log({ postRequest });
    
    const { errorDescription, errorHeader, content, ok, status } = postRequest;
    const parentPostRequest = ok && content.parentUri ? await session.http.profilePosts.get(id, content.parentUri.split("/")[4]) : null;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        post: content,
        parentPostDeleted: parentPostRequest?.status === 404,
        parentPost: parentPostRequest?.content,
    };
}

export default function ProfilePosts_Id({ loaderData: { ok, errorHeader, status, post, parentPostDeleted, parentPost } }: Route.ComponentProps) {
    return (
        ok
        ? <ProfilePostView post={post!} parentPost={parentPost} parentPostDeleted={parentPostDeleted} />
        : <Typography>Error {errorHeader ?? status}</Typography>
    );
}