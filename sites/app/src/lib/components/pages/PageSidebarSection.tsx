import { List } from '@mui/joy';
import type { PropsWithChildren, ReactNode } from 'react';
import ContentCategory from '../content/ContentCategory';

interface Props extends PropsWithChildren {
	header: ReactNode[] | ReactNode;
}

export default function PageSidebarSection({ header, children }: Props) {
	return (
		<ContentCategory header={header}>
			<List sx={{ gap: 0.5 }}>{children}</List>
		</ContentCategory>
	);
}
