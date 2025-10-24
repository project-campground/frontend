import type { Route } from "./+types/profile.$id";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import ProfileView from "~/layout/profile/ProfileView";
import { authMiddleware } from "~/middleware/auth";
import { loginRequiredMiddleware } from "~/middleware/login";
import { sessionRouterContext } from "~/session";

export function meta({ loaderData }: Route.MetaArgs) {
    return [
        { title: `Campground — ${loaderData.ok ? loaderData.user!.displayName : `Profile`}` },
        { name: "description", content: loaderData.ok ? loaderData.user!.tagline : "Gather around the fire, friends" },
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
    const postsRequest = await session.restClient.fetchPosts(id);
    console.log(userRequest, postsRequest);

    const { errorDescription, errorHeader, content, ok, status } = userRequest;

    return {
        id,
        status,
        errorHeader,
        errorDescription,
        ok,
        user: content,
        isSelf: session.auth.authenticated && session.auth.user.did === content?.did,
        posts: postsRequest.content?.posts!,
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { status, ok, isSelf, user, posts, errorHeader, errorDescription } }: Route.ComponentProps) {


    return (
        ok
        ? <ProfileView user={user!} posts={posts} isSelf={isSelf} />
        : status === 404
        ? <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title="Cannot find that user">
            There is no such user with that DID. Have you entered the wrong DID?
        </PagePlaceholder>
        : <PagePlaceholder icon={PagePlaceholderIcon.Error} title={errorHeader ?? `Error ${status}`}>
            An error occurred while fetching a profile. {errorDescription}
        </PagePlaceholder>
    );
}