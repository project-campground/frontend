import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import HomeSidebar from "./HomeSidebar";
import GlobalLayout from "~/layout/GlobalLayout";
import { loginRequiredMiddleware } from "~/middleware/login";
import { useSession } from "~/session";
import { Group } from "components";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Home" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware
];


export default function Index() {
    const session = useSession();

    return (
        <GlobalLayout page={null} session={session}>
            <Group sx={{ height: "100%" }}>
                <HomeSidebar page="/" />
                <Outlet />
            </Group>
        </GlobalLayout>
    );
}