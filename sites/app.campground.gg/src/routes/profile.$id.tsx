import type { Route } from "./+types/profile.$id";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import ProfileView from "~/layout/profile/ProfileView";
import { authMiddleware } from "~/middleware/auth";
import { loginRequiredMiddleware } from "~/middleware/login";
import { sessionRouterContext } from "~/session";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export const clientMiddleware: Route.ClientMiddlewareFunction[] = [
    authMiddleware,
    loginRequiredMiddleware,
];

export async function clientLoader({ context, params: { id } }: Route.ClientLoaderArgs) {
    const session = context.get(sessionRouterContext);

    // Can't fetch
    if (!session.restClient)
        return {
            id,
            error: 401,
        };

    const userRequest = await session.restClient.fetchProfile(id);
    console.log(userRequest);

    const { errorDescription, errorHeader, content, ok, status } = userRequest;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        user: content
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { status, ok, user, errorHeader, errorDescription } }: Route.ComponentProps) {
    return (
        ok
        ? <ProfileView user={user!} />
        : status === 404
        ? <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title="Cannot find that user">
            There is no such user with that DID. Have you entered the wrong DID?
        </PagePlaceholder>
        : <PagePlaceholder icon={PagePlaceholderIcon.Error} title={errorHeader ?? `Error ${status}`}>
            An error occurred while fetching a profile. {errorDescription}
        </PagePlaceholder>
    );
}