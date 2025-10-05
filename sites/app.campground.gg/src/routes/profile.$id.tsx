import type { Route } from "./+types/profile.$id";
import { requestGetUserProfile } from "api/profiles";
import PagePlaceholder, { PagePlaceholderIcon } from "~/components/PagePlaceholder";
import ProfileView from "~/layout/profile/ProfileView";

export function meta(_routes: Route.MetaArgs) {
    return [
        { title: "Campground — Camp" },
        { name: "description", content: "Gather around the fire, friends" },
    ];
}

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
    const userRequest = await requestGetUserProfile(id)
        .then((x) => ({ error: null, user: x }))
        .catch((x) => ({ error: x.status, user: null }));
    console.log(userRequest);

    const { error, user } = userRequest;

    return {
        id,
        error,
        user
    };
}
clientLoader.hydrate = true as const;

export default function Index({ loaderData: { error, user } }: Route.ComponentProps) {
    return (
        error == null
        ? <ProfileView user={user!} />
        : error === 404
        ? <PagePlaceholder icon={PagePlaceholderIcon.NotFound} title="Cannot find that user">
            There is no such user with that DID. Have you entered the wrong DID?
        </PagePlaceholder>
        : <PagePlaceholder icon={PagePlaceholderIcon.Error} title={`Error ${error}`}>
            An error occurred while fetching a profile.
        </PagePlaceholder>
    );
}