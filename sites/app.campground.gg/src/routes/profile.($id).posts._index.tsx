import type { Route } from "./+types/profile.($id).posts._index";
import { Typography } from "@mui/joy";
import { redirect } from "react-router";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
    throw redirect(id ? `/profile/${id}` : "/profile");
}
clientLoader.hydrate = true as const;

export default function ProfilePostsIndex() {
    console.log("profile.$id.posts._index");
    return (
        <Typography>Redirect...</Typography>
    );
}