import { redirect } from "react-router";
import type { Route } from "./+types/_global._campsite.c.$campId._index";
import { sessionRouterContext } from "~/context/session";
import { loginRequiredMiddleware } from "~/middleware/login";
import { authMiddleware } from "~/middleware/auth";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
    authMiddleware
];

export async function clientLoader({ params: { campId }, context }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    const campsite = await session.restClient.getCampsite(campId);

    if (campsite?.status === 404)
        return { status: 404 };
    else if (!campsite?.ok)
        throw redirect("/");

    throw redirect(session.auth.authenticated ? `/c/${campId}/t/bulletin` : `/`);
}

export default function Index({ loaderData: { status } }: Route.ComponentProps) {
    if (status === 404)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title="Campsite not found">
                This campsite could not be found. Try typing a valid campsite identifier.
            </PagePlaceholder>
        );

    return (
        <PagePlaceholder icon={PagePlaceholderIcon.Empty} title="No available tents">
            It seems that you do not have the permission to view any of the tents.
        </PagePlaceholder>
    );
}