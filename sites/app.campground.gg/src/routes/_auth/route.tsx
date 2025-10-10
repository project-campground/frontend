import { Outlet } from "react-router";
import type { Route } from "./+types/route";
import AuthWrapper from "./AuthWrapper";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Authentication" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    return (
        <AuthWrapper header="form.login">
            <Outlet />
        </AuthWrapper>
    );
}