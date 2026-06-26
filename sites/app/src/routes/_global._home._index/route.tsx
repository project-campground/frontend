import type { Route } from './+types/route';
import { Box } from '@mui/joy';
import HomeActivity from './HomeActivity';

export function meta(_routes: Route.MetaArgs) {
	return [
		{ title: 'Campground — Home' },
		{ name: 'description', content: 'Gather around the fire, friends' },
	];
}

export default function Index() {
	return (
		<Box
			sx={{
				mx: 4,
				my: 2,
				display: 'grid',
				gridTemplateColumns: '1fr 1fr 1fr',
				gridTemplateRows: '1fr 1fr',
				width: '100%',
				height: '100%',
			}}
		>
			<HomeActivity />
		</Box>
	);
}
