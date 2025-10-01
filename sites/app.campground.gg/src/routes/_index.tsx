import type { Route } from "./+types/_index";
import Home from "../layout/Home";
import GlobalLayout from "~/layout/GlobalLayout";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index(...args: unknown[]) {
    console.log("Got args", args);
    return (
        <GlobalLayout page={null}>
            <Home />
        </GlobalLayout>
    );
}