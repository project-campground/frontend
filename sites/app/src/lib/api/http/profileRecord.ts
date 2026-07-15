import type { CampgroundProfileRecord } from '$lib/types/campground/user';
import HTTPAtprotoObjectManager from './base-atproto';

export default class HTTPProfileRecordManager extends HTTPAtprotoObjectManager {
	public get(actor: string) {
		return this.client.getRecord<CampgroundProfileRecord>({
			repo: actor,
			collection: `gg.campground.actor.profile`,
			rkey: 'self',
		});
	}

	public create(record: CampgroundProfileRecord) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.putRecord({
			repo: this.client.actorDid,
			collection: 'gg.campground.actor.profile',
			rkey: 'self',
			record,
		});
	}

	public update(record: Partial<CampgroundProfileRecord>) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.putRecord({
			repo: this.client.actorDid,
			collection: 'gg.campground.actor.profile',
			rkey: 'self',
			record: { ...record, updatedAt: new Date().toISOString() },
		});
	}

	public delete() {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.deleteRecord({
			repo: this.client.actorDid,
			collection: 'gg.campground.actor.profile',
			rkey: 'self',
		});
	}
}
