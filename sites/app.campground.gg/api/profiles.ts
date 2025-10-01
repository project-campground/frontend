import type { User } from "types/user";
import { cgFetch } from "./requests";

export function requestGetUserProfile(did: string) {
    return cgFetch({
        method: "GET",
        route: `actor.getProfile`,
        queries: {
            actor: did,
        },
    })
        .then((x) => {
            if (!x.ok)
                throw x;
            return x.json() as Promise<User>;
        });
}