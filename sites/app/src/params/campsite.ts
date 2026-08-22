import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((
	param: string,
): param is `${string}@localhost:${number}` | `${string}@${string}` => {
	return /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}@(?:localhost[:][0-9]{2,}|([A-Za-z0-9_+-]+[.])+([A-Za-z0-9_+-]{2,}))$/.test(
		param,
	);
}) satisfies ParamMatcher;
