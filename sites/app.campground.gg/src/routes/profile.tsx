import type { Route } from "./+types/profile";
import { Outlet } from "react-router";
import GlobalLayout from "~/layout/GlobalLayout";

export function meta(routes: Route.MetaArgs) {
    console.log("profiles", routes);

    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    return (
        <GlobalLayout page={null}>
            <Outlet />
        </GlobalLayout>
    );
}