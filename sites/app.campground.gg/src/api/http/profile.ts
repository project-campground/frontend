import type { CampgroundProfileRecord, ProfileView } from "types/campground/user";
import HTTPClientObjectManager from "./base";

export default class HTTPClientProfileManager extends HTTPClientObjectManager {
    public get(actor: string) {
        return this.client.get<ProfileView>({
            route: `gg.campground.actor.getProfile`,
            queries: {
                actor,
            },
        });
    }

    public create(record: CampgroundProfileRecord) {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");
        
        return this.client.putRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.actor.profile",
            rkey: "self",
            record,
        });
    }
    
    public update(record: Partial<CampgroundProfileRecord>) {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");
        
        return this.client.putRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.actor.profile",
            rkey: "self",
            record: {
                ...record,
                "updatedAt": new Date().toISOString(),
            },
        });
    }
    
    public delete() {
        if (!this.client.actorDid)
            throw new Error("Operation not allowed while unauthenticated");

        return this.client.deleteRecord({
            repo: this.client.actorDid,
            collection: "gg.campground.actor.profile",
            rkey: "self",
        });
    }
}