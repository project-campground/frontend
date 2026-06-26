import { styled, Stack, Divider, Typography, type StackProps } from '@mui/joy';
import type { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren, StackProps {
	header?: ReactNode[] | ReactNode;
	subheader?: ReactNode[] | ReactNode;
	startDecorator?: ReactNode[] | ReactNode;
	endDecorator?: ReactNode[] | ReactNode;
}

const SettingsPage = styled(Stack, { name: 'SettingsPageWrapper', slot: 'root' })(({ theme }) => ({
	backgroundColor: theme.vars.palette.background.level1,
	height: '100%',
	width: '100%',
	borderRadius: theme.vars.radius.lg,
	border: `solid 1px ${theme.vars.palette.neutral.border}`,
}));
const SettingsPageContent = styled(Stack, { name: 'SettingsModal', slot: 'page-content' })(
	({ theme }) => ({
		height: '100%',
		overflow: 'hidden',
		overflowY: 'auto',
		flex: 1,
		padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
		[theme.breakpoints.down('lg')]: { padding: `${theme.spacing(1)} ${theme.spacing(3)}` },
	}),
);

export default function SettingsPageWrapper({
	children,
	header,
	subheader,
	startDecorator,
	endDecorator,
	...props
}: Props) {
	return (
		<SettingsPage>
			<Stack sx={{ px: 3, py: 2 }}>
				<Typography
					level='title-lg'
					startDecorator={startDecorator}
					endDecorator={endDecorator}
				>
					{header}
				</Typography>
				{subheader}
			</Stack>
			<Divider
				sx={{ bgcolor: 'background.body', height: 2, left: -1, right: -1, width: 'calc(100% + 2px)' }}
			/>
			<SettingsPageContent {...props}>{children}</SettingsPageContent>
		</SettingsPage>
	);
}
