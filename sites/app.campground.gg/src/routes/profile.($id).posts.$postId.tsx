import type { Route } from "./+types/profile.($id).posts.$postId";
import { Typography } from "@mui/joy";
import { requestGetUserProfile } from "api/profiles";
import { redirect } from "react-router";
import { exampleComments, examplePosts } from "~/example/profile";
import ProfilePostView from "~/layout/profile/ProfilePostView";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ params: { id, postId } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/");

    const userRequest = await requestGetUserProfile(id)
        .then((x) => ({ error: null, user: x }))
        .catch((x) => ({ error: x.status, user: null }));
    console.log(userRequest);
    const post = examplePosts.find((x) => x.id === postId);

    const { error, user } = userRequest;

    return {
        id,
        error,
        me: user,
        user,
        post,
        comments: exampleComments.slice(0, post?.comments ?? 0),
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { error, user, post, comments } }: Route.ComponentProps) {
    return (
        error == null
        ? <ProfilePostView user={user!} post={{ profileUser: user!, author: user!, ...post! }} comments={comments.map((x) => ({ author: user!, ...x }))} />
        : <Typography>Error {error}</Typography>
    );
}