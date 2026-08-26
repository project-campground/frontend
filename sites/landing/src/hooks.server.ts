import type { Handle } from '@sveltejs/kit';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace('%lang%', event.url.pathname.split('/')[1].split('-')[0]),
	});
