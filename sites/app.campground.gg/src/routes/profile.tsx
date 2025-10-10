import type { Route } from "./+types/profile";
import { Outlet } from "react-router";
import GlobalLayout from "~/layout/GlobalLayout";
import { useSession } from "~/session";

export function meta(routes: Route.MetaArgs) {
    console.log("profiles", routes);

    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    const session = useSession();

    return (
        <GlobalLayout page={null} session={session}>
            <Outlet />
        </GlobalLayout>
    );
}