import type { Route } from "./+types/profile.($id).posts._index";
import { Typography } from "@mui/joy";
import { requestGetUserProfile } from "api/profiles";
import { redirect } from "react-router";
import ProfileView from "~/layout/profile/ProfileView";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
    if (!id)
        throw redirect("/");

    const userRequest = await requestGetUserProfile(id)
        .then((x) => ({ error: null, user: x }))
        .catch((x) => ({ error: x.status, user: null }));
    console.log(userRequest);

    const { error, user } = userRequest;

    return {
        id,
        error,
        user
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { error, user } }: Route.ComponentProps) {
    console.log("profile.$id.posts._index");
    return (
        error == null
        ? <ProfileView user={user!} />
        : <Typography>Error {error}</Typography>
    );
}