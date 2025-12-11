import { redirect } from "react-router";
import type { Route } from "./+types/profile._index";
import HomeSidebar from "~/routes/_home/HomeSidebar";
import { sessionRouterContext } from "~/session";

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    throw redirect(session.auth.authenticated ? `/profile/${session.auth.user.did}` : `/`);
}
clientLoader.hydrate = true as const;

export default function Index() {
    return <HomeSidebar page="/" />;
}