import XrpcError from '../XrpcError.ts';
import HTTPAtprotoObjectManager from './base-atproto.ts';

export default class HTTPIdentityManager extends HTTPAtprotoObjectManager {
	public async resolveHandle(handle: string) {
		return this.client
			.get<{ did: string }>({ route: `com.atproto.identity.resolveHandle`, queries: { handle } })
			.then((value) => value.did)
			.catch((err) => {
				// No did with that handle, so it shouldn't be an error, but a value
				if (
					err instanceof XrpcError
					&& (err.code === 'HandleNotFound'
						|| (err.code === 'InvalidRequest' && err.description === 'Unable to resolve handle'))
				)
					return null;

				throw err;
			});
	}
}
