import { redirect } from "react-router";
import type { Route } from "./+types/c.$campId._index";

export async function clientLoader({ params: { campId } }: Route.ClientLoaderArgs) {
    throw redirect(`/c/${campId}`);
}
clientLoader.hydrate = true as const;

export default function Index() {
    return <></>;
}