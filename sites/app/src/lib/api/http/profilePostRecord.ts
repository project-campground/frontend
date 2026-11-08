import HTTPAtprotoObjectManager from './base-atproto.js';
import { TID } from '@atproto/common-web';

export default class HTTPProfilePostRecordManager extends HTTPAtprotoObjectManager {
	public static RecordType: string = 'gg.campground.profile.post';

	create(record: {
		parentUri?: string | undefined;
		content: string;
		createdAt: string;
		updatedAt: string;
	}) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.putRecord({
			repo: this.client.actorDid,
			collection: HTTPProfilePostRecordManager.RecordType,
			rkey: TID.next().toString(),
			record: { ...record, $type: HTTPProfilePostRecordManager.RecordType },
		});
	}

	update(uri: string, record: { content?: string }) {
		if (!this.client.actorDid) throw new Error('Operation not allowed while unauthenticated');

		return this.client.putRecord({
			repo: this.client.actorDid,
			collection: HTTPProfilePostRecordManager.RecordType,
			rkey: uri.split('/')[4],
			record: {
				...record,
				updatedAt: new Date().toISOString(),
				$type: HTTPProfilePostRecordManager.RecordType,
			},
		});
	}

	async delete(uri: string) {
		const a = await this.client.deleteRecord({
			repo: this.client.actorDid!,
			collection: HTTPProfilePostRecordManager.RecordType,
			// at://did:.../gg.campground.profile.post/...
			rkey: uri.split('/')[4],
		});
		return a;
	}
}
