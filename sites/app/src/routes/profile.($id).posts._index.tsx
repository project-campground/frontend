import type { Route } from './+types/profile.($id).posts._index';
import { redirect } from 'react-router';

export async function clientLoader({ params: { id } }: Route.ClientLoaderArgs) {
	throw redirect(id ? `/profile/${id}` : '/profile');
}

export default function ProfilePostsIndex() {
	return null;
}
