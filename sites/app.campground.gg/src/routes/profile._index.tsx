import { redirect } from "react-router";
import type { Route } from "./+types/profile._index";
import Home from "~/layout/Home";

export async function clientLoader({}: Route.ClientLoaderArgs) {
    throw redirect("/");
}
clientLoader.hydrate = true as const;

export default function Index() {
    return <Home />;
}