import type { ParamMatcher } from '@sveltejs/kit';

const plcPrefix = 'did:plc:';

export const match = ((param: string): param is `did:plc:${string}` => {
	return (
		param.startsWith(plcPrefix)
		// Taken from ATProto docs
		&& /^[a-zA-Z0-9]{10,30}$/.test(param.slice(plcPrefix.length))
	);
}) satisfies ParamMatcher;
