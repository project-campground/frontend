import { redirect } from "react-router";
import type { Route } from "./+types/_global._campsite.c.$campId._index";
import { sessionRouterContext } from "~/context/session";
import { loginRequiredMiddleware } from "~/middleware/login";
import { authMiddleware } from "~/middleware/auth";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/pages/PagePlaceholder";
import { FormattedMessage } from "react-intl";

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    loginRequiredMiddleware,
    authMiddleware
];

export async function clientLoader({ params: { campId }, context }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    const campsite = await session.http.campsites.get(campId);

    if (campsite?.status === 404)
        return { status: 404 };
    else if (!campsite?.ok)
        throw redirect("/");

    throw redirect(session.auth.authenticated ? `/c/${campId}/t/bulletin` : `/`);
}

export default function Index({ loaderData: { status } }: Route.ComponentProps) {
    if (status === 404)
        return (
            <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title={
                <FormattedMessage
                    id="app.campsites.notFound"
                    defaultMessage="Campsite not found"
                    description="User cannot view the campsite"
                />
            }>
                <FormattedMessage
                    id="app.campsites.notFound.desc"
                    defaultMessage="It seems that this campsite does not exist."
                    description="User cannot view the campsite"
                />
            </PagePlaceholder>
        );

    return null;
}