import { CardOverflow, Dropdown, Menu, MenuButton, styled } from '@mui/joy';
import { IconDotsVertical } from '@tabler/icons-react';

const OverflowButtonWrapper = styled(CardOverflow, { name: 'CampgroundOverflow' })(() => ({
	position: 'absolute',
	top: 5,
	right: 5,
	zIndex: 10,
	transition: 'opacity 0.5s',
	opacity: 0,
	'.MuiCard-root:hover &, .CampgroundOverflow-parent:hover &': { opacity: 1 },
}));

export default function ContentOverflow({ children }: React.PropsWithChildren) {
	return (
		<OverflowButtonWrapper>
			<Dropdown>
				<MenuButton
					size='sm'
					variant='soft'
				>
					<IconDotsVertical />
				</MenuButton>
				<Menu>{children}</Menu>
			</Dropdown>
		</OverflowButtonWrapper>
	);
}
