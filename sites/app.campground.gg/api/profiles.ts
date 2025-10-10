import type { User } from "types/user";
import RESTClient from "./RESTClient";

export function requestGetUserProfile(did: string) {
    return RESTClient.atprotoFetch({
        method: "GET",
        route: `gg.campground.actor.getProfile`,
        queries: {
            actor: did,
        },
    })
        .then((x) => {
            if (!x.ok)
                throw new Error(x.errorDescription);
            return x.content as User;
        });
}