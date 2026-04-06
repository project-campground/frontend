import { Outlet } from "react-router";
import GlobalLayout from "./GlobalLayout";
import { authMiddleware } from "~/middleware/auth";
import type { Route } from "./+types/route";

export function meta() {
    return [
        { title: `Campground` },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
];

export default function Index({ params: { campId }, matches }: Route.ComponentProps) {
    const lastMatch = matches.slice(-1)[0]?.pathname;

    return (
        <GlobalLayout page={campId ?? lastMatch?.split("/").slice(-1)[0]}>
            <Outlet />
        </GlobalLayout>
    );
}