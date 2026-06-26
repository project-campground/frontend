import { redirect } from 'react-router';
import type { Route } from './+types/c.$campId.t._index';

export async function clientLoader({ params: { campId } }: Route.ClientLoaderArgs) {
	throw redirect(`/c/${campId}`);
}

export default function Index() {
	return <></>;
}
