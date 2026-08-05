import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is `@${string}` => {
	return (
		param.startsWith('@')
		// Taken from ATProto docs
		&& /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(
			param.slice(1),
		)
	);
}) satisfies ParamMatcher;
