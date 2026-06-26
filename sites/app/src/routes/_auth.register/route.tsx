import HTTPAtprotoClient from '~/api/http/HTTPAtprotoClient';
import type { Route } from './+types/route';
import RegisterPage from './RegisterPage';
import { defaultAppApiUrl } from 'api.config';
import { useMemo, useState } from 'react';
import type { DescribedServer } from 'types/atproto/server';

export function meta(_routes: Route.MetaArgs) {
	return [
		{ title: 'Campground — Register' },
		{ name: 'description', content: 'Gather around the fire, friends' },
	];
}

export default function Index() {
	const [loading, setLoading] = useState(true);
	const [serverDescription, setServerDescription] = useState<DescribedServer | null>(null);
	useMemo(
		() =>
			HTTPAtprotoClient.describeServer({ url: defaultAppApiUrl })
				.then((resp) => {
					if (!resp.ok) return null;

					return setServerDescription(resp.content);
				})
				.then(() => {
					setLoading(false);
				}),
		[],
	);

	if (loading) return null;

	return <RegisterPage defaultDescribedServer={serverDescription!} />;
}
