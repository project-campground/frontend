import HTTPAtprotoObjectManager from "./base-atproto";

export default class HTTPProfilePostRecordManager extends HTTPAtprotoObjectManager {
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
}