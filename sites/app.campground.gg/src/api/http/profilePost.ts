import type { ProfilePostViewBasic, ProfilePostViewDetailed, ProfilePostViewParented } from "types/campground/user";
import HTTPClientObjectManager from "./base";

export default class HTTPClientProfilePostManager extends HTTPClientObjectManager {
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

    create(record: { parentUri?: string | undefined; content: string; tags: string[]; createdAt: string; updatedAt: string; }) {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");
        
        return this.client.putRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.profile.post",
            rkey: "",
            record: {
                ...record,
                "$type": "gg.campground.profile.post",
            },
        });
    }
    
    update(uri: string, record: { content?: string; tags?: string[]; }) {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");
        
        return this.client.putRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.profile.post",
            rkey: uri.split("/")[4],
            record: {
                ...record,
                "updatedAt": new Date().toISOString(),
                "$type": "gg.campground.profile.post",
            },
        });
    }
    
    async delete(uri: string) {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");

        const a = await this.client.deleteRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.profile.post",
            // at://did:.../gg.campground.profile.post/...
            rkey: uri.split("/")[4],
        });
        await this.unindex(uri);
        return a;
    }
}