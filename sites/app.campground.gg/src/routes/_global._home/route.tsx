import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import HomeSidebar from "./HomeSidebar";
import { Group } from "components";
import { loginRequiredMiddleware } from "~/middleware/login";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Home" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
];

export default function Index({ matches }: Route.ComponentProps) {
    const page = matches.slice(-1)[0]!.pathname;

    return (
        <Group withMobile sx={{ height: "100%", alignItems: "stretch" }}>
            <HomeSidebar page={page} />
            <Outlet />
        </Group>
    );
}