import type { Route } from "./+types/route";
import CampsiteCreation from "./CampsiteCreation";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Home" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}


export default function Index() {
    return (
        <CampsiteCreation />
    )
}