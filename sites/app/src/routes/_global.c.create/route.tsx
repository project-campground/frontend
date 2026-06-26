import CampsiteCreation from './CampsiteCreation';

export function meta() {
	return [
		{ title: 'Campground — Create a Campsite' },
		{ name: 'description', content: 'Gather around the fire, friends' },
	];
}

export default function Index() {
	return <CampsiteCreation />;
}
