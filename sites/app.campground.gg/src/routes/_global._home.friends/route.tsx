import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";
import type { Route } from "./+types/route";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Home" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export default function Index() {
    return (
        <PagePlaceholder icon={PagePlaceholderIcon.WIP} title="Work In Progress">
            Friends feature is unavailable as of now. Come back later!
        </PagePlaceholder>
    );
}