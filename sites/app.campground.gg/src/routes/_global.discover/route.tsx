import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import type { Route } from "./+types/route";

export function meta(routes: Route.MetaArgs) {
    return [
        { title: "Campground — Discover" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}


export default function Index() {
    return (
        <PagePlaceholder icon={PagePlaceholderIcon.WIP} title="Work In Progress">
            There is no discovery yet. Come back later!
        </PagePlaceholder>
    )
}