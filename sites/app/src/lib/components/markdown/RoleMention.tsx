import { styled } from '@mui/joy';
import RoleDisplay from '../campsite/RoleDisplay';
import { useCampsite } from '~/routes/_global._campsite/context';
import type { RoleView } from 'types/campground/roles';
import { IconAt } from '@tabler/icons-react';
import { useIntl } from 'react-intl';

type Props = { id: string };

const RoleMentionWrapper = styled('span', { name: 'ActorMention', slot: 'root' })(() => ({
	display: 'inline-flex',
	flexDirection: 'row',
	alignItems: 'center',
}));

const defaultUnknownRole: Omit<RoleView, 'id' | 'campsiteId' | 'name'> = {
	colors: [],
	motion: 'none',
	raised: false,
	pingable: false,
	permissions: { general: 0, content: 0 },
	position: 0,
	flags: 0,
	createdAt: new Date().toISOString(),
	createdBy: 'did:null',
	updatedAt: new Date().toISOString(),
	updatedBy: 'did:null',
};

export default function RoleMention({ id }: Props) {
	const campsite = useCampsite();
	const intl = useIntl();
	const role = campsite.roles.find((x) => x.id === id) ?? {
		...defaultUnknownRole,
		id,
		name: intl.formatMessage({
			id: 'app.roles.unknown',
			defaultMessage: 'Unknown role',
			description: 'The title of the role when the role has not been found in role mention',
		}),
		campsiteId: campsite.id,
	};

	return (
		<RoleMentionWrapper>
			<RoleDisplay
				startDecorator={<IconAt size={20} />}
				size='sm'
				role={role}
				radius='md'
			/>
		</RoleMentionWrapper>
	);
}
