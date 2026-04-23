import type { ProfilePostViewBasic, ProfilePostViewDetailed, ProfilePostViewParented } from "types/campground/user";
import HTTPBackendObjectManager from "./base-backend";

export default class HTTPProfilePostManager extends HTTPBackendObjectManager {
    getMany(actor: string, replies: boolean = false, offset: number = 0, limit: number = 50) {
        return this.client.get<{ posts: ProfilePostViewParented[] }>({
            route: `gg.campground.profile.getPosts`,
            queries: {
                actor: actor,
                limit,
                offset,
                replies,
            },
        });
    }

    getReplies(actor: string, post_tid: string, offset: number = 0) {
        return this.client.get<{ posts: ProfilePostViewBasic[] }>({
            route: `gg.campground.profile.getReplies`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
                limit: "50",
                offset: offset.toString(),
            },
        });
    }

    get(actor: string, post_tid: string) {
        return this.client.get<ProfilePostViewDetailed>({
            route: `gg.campground.profile.getPost`,
            queries: {
                uri: `at://${actor}/gg.campground.profile.post/${post_tid}`,
            },
        });
    }

    unindex(uri: string) {
        return this.client.post<ProfilePostViewDetailed>({
            route: `gg.campground.profile.unindexPost`,
            queries: {
                uri,
            },
        });
    }

    async delete(uri: string) {
        if (!this.client.atproto.actorDid)
            throw new Error("Operation not allowed while unauthenticated");

        const a = await this.atproto.deleteRecord({
            repo: this.client.atproto.actorDid,
            collection: "gg.campground.profile.post",
            // at://did:.../gg.campground.profile.post/...
            rkey: uri.split("/")[4],
        });
        await this.unindex(uri);
        return a;
    }
}