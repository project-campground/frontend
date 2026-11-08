import type { HandleClientError } from '@sveltejs/kit/hooks';

export const handleError: HandleClientError = async ({ error }) => {
	console.error(error);

	return { error };
};
