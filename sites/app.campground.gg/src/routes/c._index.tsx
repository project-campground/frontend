import { redirect } from "react-router";
import type { Route } from "./+types/c.$campId._index";

export async function clientLoader({}: Route.ClientLoaderArgs) {
    throw redirect("/");
}
clientLoader.hydrate = true as const;

export default function Index() {
    return <></>;
}