import { Divider, Sheet, styled } from '@mui/joy';
import type { TentViewBasic } from 'types/campground/tent';
import TentContentHeader from './TentContentHeader';

type Props = React.PropsWithChildren & {
	tent: TentViewBasic;
	sidebarToggle: (value: boolean) => unknown;
	sidebarOpen: boolean;
};

export const TentContentBox = styled(Sheet)(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: theme.vars.radius.xl,
	display: 'flex',
	flexDirection: 'column',
	flex: 1,
	// overflow: "hidden",
	boxShadow: theme.vars.shadow.lg,
	border: `solid 1px ${theme.vars.palette.neutral.border}`,
	position: 'relative',
	backgroundColor: theme.vars.palette.background.surface,
	color: theme.vars.palette.text.secondary,
	scrollSnapAlign: 'start',
	scrollSnapStop: 'always',
}));

export const TentContentDivider = styled(Divider)(({ theme }) => ({
	backgroundColor: theme.vars.palette.background.body,
	height: 2,
	left: '-1px',
	right: '-1px',
	zIndex: 200,
	width: 'calc(100% + 2px)',
	// position: "absolute",
}));

export default function TentContentWrapper({ sidebarOpen, sidebarToggle, tent, children }: Props) {
	return (
		<TentContentBox>
			<TentContentHeader
				tent={tent}
				sidebarToggle={sidebarToggle}
				sidebarOpen={sidebarOpen}
			/>
			<TentContentDivider />
			{children}
		</TentContentBox>
	);
}
