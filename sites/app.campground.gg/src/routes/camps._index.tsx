import Home from "~/layout/Home";
import type { Route } from "./+types/camps._index";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index(...args: unknown[]) {
    return <Home />;
}