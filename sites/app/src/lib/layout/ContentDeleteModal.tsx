import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Link,
	Modal,
	ModalDialog,
	Sheet,
	styled,
} from '@mui/joy';
import type { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';

type Props = {
	accusativeCase: ReactNode[] | ReactNode;
	nominativeCase: ReactNode[] | ReactNode;
	open: boolean;
	ContentRender: () => React.ReactNode | React.ReactNode[];
	onClose: () => unknown;
	onConfirm: () => unknown;
};

const ContentDeleteModalFade = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 100,
	left: 0,
	right: 0,
	height: 100,
	zIndex: 3,
	background: `linear-gradient(to bottom, transparent, ${theme.vars.palette.background.level1})`,
}));

export default function ContentDeleteModal({
	accusativeCase,
	nominativeCase,
	open,
	ContentRender,
	onClose,
	onConfirm,
}: Props) {
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<ModalDialog>
				<DialogTitle>
					<FormattedMessage
						id='app.delete.header'
						defaultMessage='Delete this {accusativeCase}?'
						description='The header for deleting any content'
						values={{ accusativeCase }}
					/>
				</DialogTitle>
				<DialogContent>
					<FormattedMessage
						id='app.delete.header'
						defaultMessage='This cannot be reversed and the {nominativeCase} will be permanently deleted.'
						description='The description for deleting any content'
						values={{ nominativeCase }}
					/>
				</DialogContent>
				<Sheet
					variant='outlined'
					sx={{
						minWidth: 500,
						maxHeight: 200,
						borderRadius: 'md',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<Box>
						<ContentRender />
					</Box>
					<ContentDeleteModalFade />
				</Sheet>
				<DialogActions>
					<Button
						color='danger'
						variant='solid'
						onClick={onConfirm}
					>
						<FormattedMessageGlobal id='common.delete' />
					</Button>
					<Link
						color='neutral'
						onClick={onClose}
					>
						<FormattedMessageGlobal id='common.cancel' />
					</Link>
				</DialogActions>
			</ModalDialog>
		</Modal>
	);
}
