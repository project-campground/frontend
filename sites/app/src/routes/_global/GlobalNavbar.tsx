import { Box, CircularProgress, Divider, Typography, Alert, styled } from '@mui/joy';
import NavbarCamp from '~/components/pages/NavbarCamp';
import GlobalNavProfile from './GlobalNavProfile';
import NavbarButton from '~/components/pages/NavbarButton';
import { IconCompassFilled, IconExclamationCircleFilled, IconPlus } from '@tabler/icons-react';
import { useAccount } from '~/context/account';
import { useSession } from '~/context/session';
import type { CampsiteViewWithDomain } from 'types/campground/campsites';
import { FormattedMessageGlobal } from '~/i18n';

type Props = { loadedCampsites: boolean; page: string | undefined | null };

const homePages = ['friends'];

const GlobalNavbarRoot = styled(Box, { name: 'GlobalNavbarRoot', slot: 'root' })(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'stretch',
	scrollSnapAlign: 'start',

	flex: 1,
	gridRow: '1',
	gridColumn: '1',
	[theme.breakpoints.up('lg')]: {
		width: '100vw',
		alignItems: 'center',
		flexDirection: 'row',
		gridColumn: '1 / 4',
	},
}));
const GlobalNavbarButtonStack = styled(Box, { name: 'GlobalNavbarRoot', slot: 'stack' })(
	({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		margin: theme.spacing(1),
		gap: theme.spacing(1),

		[theme.breakpoints.up('lg')]: { alignItems: 'center', flexDirection: 'row' },
	}),
);
const GlobalNavbarCampsiteStack = styled(Box, { name: 'GlobalNavbarRoot', slot: 'stack' })(
	({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		margin: theme.spacing(1),
		gap: theme.spacing(1),
		overflowX: 'hidden',
		overflowY: 'auto',

		[theme.breakpoints.up('lg')]: {
			alignItems: 'center',
			flexDirection: 'row',
			overflowX: 'auto',
			overflowY: 'hidden',
		},
	}),
);

export default function GlobalNavbar({ page, loadedCampsites: loaded }: Props) {
	const account = useAccount();
	const session = useSession();

	const campsites =
		account.authenticated ?
			((session.preferences.full.campsites?.campsites
				.map((campsiteHandle) => {
					const [domain, campsiteId] = campsiteHandle.split('@');

					return account.campsites.find(
						(campsite) => campsite._domain === domain && campsite.id === campsiteId,
					);
				})
				.filter((x) => x) as CampsiteViewWithDomain[]) ?? [])
		:	[];

	return (
		<GlobalNavbarRoot>
			<GlobalNavbarButtonStack>
				<NavbarButton
					icon={
						<Typography
							component='svg'
							sx={{ height: 36, width: 36, color: 'var(--svg-color)', transition: 'color 0.4s' }}
						>
							<use href='#cg-logo' />
						</Typography>
					}
					href='/'
					isActive={!page || homePages.includes(page)}
				>
					Campground
				</NavbarButton>
			</GlobalNavbarButtonStack>
			{account.authenticated && !account.sessionInfo.active ?
				<Alert
					sx={{ flex: 1, borderRadius: 'lg' }}
					variant='soft'
					color='danger'
					startDecorator={<IconExclamationCircleFilled />}
				>
					Your account is inactive
				</Alert>
			:	<>
					<Divider
						orientation='vertical'
						sx={{ width: 2, mt: 1, mb: 1 }}
					/>
					<GlobalNavbarCampsiteStack flex={1}>
						{campsites.map((x) => (
							<NavbarCamp
								key={x.id}
								id={x.id}
								domain={x._domain}
								avatar={x.avatarUri ?? undefined}
								name={x.name}
								memberCount={x.memberCount}
								isActive={page === x.id}
							/>
						))}
						{!loaded && <CircularProgress />}
						{account.authenticated && (
							<NavbarButton
								icon={<IconPlus />}
								href='/c/create'
								isActive={page === 'create'}
							>
								<FormattedMessageGlobal id='common.create' />
							</NavbarButton>
						)}
						<NavbarButton
							icon={<IconCompassFilled />}
							href='/discover'
							isActive={page === 'discover'}
						>
							<FormattedMessageGlobal id='site.discovery' />
						</NavbarButton>
					</GlobalNavbarCampsiteStack>
				</>
			}
			<GlobalNavbarButtonStack>
				<GlobalNavProfile />
			</GlobalNavbarButtonStack>
		</GlobalNavbarRoot>
	);
}
