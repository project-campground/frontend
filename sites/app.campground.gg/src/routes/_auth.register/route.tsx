import type { Route } from "./+types/route";
import RegisterPage from "./RegisterPage";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Register" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    return <RegisterPage />;
}