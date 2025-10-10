import type { Route } from "./+types/_index";
import Home from "../layout/Home";
import GlobalLayout from "~/layout/GlobalLayout";
import { loginRequiredMiddleware } from "~/middleware/login";
import { useSession } from "~/session";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware
];

export default function Index(...args: unknown[]) {
    console.log("Got args", args);
    const session = useSession();
    console.log("Got session", session);
    return (
        <GlobalLayout page={null} session={session}>
            <Home />
        </GlobalLayout>
    );
}