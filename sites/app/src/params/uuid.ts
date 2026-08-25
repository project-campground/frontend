import type { ParamMatcher } from '@sveltejs/kit';

const uuidSegmentLengths = [8, 4, 4, 4, 12];
// + 4 dashes
const uuidTotalLength = uuidSegmentLengths.reduce((a, b) => a + b, 0) + 4;

export const match = ((
	param: string,
): param is `${string}-${string}-${string}-${string}-${string}` => {
	return (
		param.length === uuidTotalLength
		&& /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(param)
	);
}) satisfies ParamMatcher;
