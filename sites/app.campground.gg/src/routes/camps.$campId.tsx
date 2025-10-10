import type { Route } from "./+types/camps.$campId";
import { Typography } from "@mui/joy";

export function meta(routes: Route.MetaArgs) {
    console.log("camps.$campId", routes);

    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ params: { campId } }: Route.ClientLoaderArgs) {
    return {
        campId,
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { campId } }: Route.ComponentProps) {
    return <Typography>{campId}</Typography>;
}