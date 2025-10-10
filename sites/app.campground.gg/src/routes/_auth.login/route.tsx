import type { Route } from "./+types/route";
import LoginPage from "./LoginPage";
import { loginPageRejectionMiddleware } from "~/middleware/login";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginPageRejectionMiddleware
];

export default function Index() {
    return <LoginPage />;
}