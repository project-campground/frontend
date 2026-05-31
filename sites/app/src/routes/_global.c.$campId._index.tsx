import { redirect } from "react-router";
import type { Route } from "./+types/_global.c.$campId._index";

export async function clientLoader({ params: { campId } }: Route.ClientLoaderArgs) {
    throw redirect(`/c/${campId}/t/bulletin`);
}

export default function Index({ }: Route.ComponentProps) {
    return null;
}