import { ListItemContent, ListItemDecorator, Menu, MenuItem, Modal } from '@mui/joy';
import { IconMountainFilled, IconTable } from '@tabler/icons-react';
import { useSlate } from 'slate-react';
import ImageInputModal from '../../layout/ImageInputModal';
import { useState } from 'react';
import CampgroundEditor from './CampgroundEditor';

export default function MessageEditorMenu() {
	const editor = useSlate();
	const [imageModal, setImageModal] = useState(false);
	const closeImageModal = () => setImageModal(false);
	const onSubmitImage = (url: string, title: string | null | undefined) =>
		CampgroundEditor.insertImageFormatting(editor, url, title);

	return (
		<>
			<Menu variant='soft'>
				<MenuItem onClick={() => CampgroundEditor.insertTableFormatting(editor)}>
					<ListItemDecorator>
						<IconTable />
					</ListItemDecorator>
					<ListItemContent>Add a table</ListItemContent>
				</MenuItem>
				<MenuItem onClick={() => setImageModal(true)}>
					<ListItemDecorator>
						<IconMountainFilled />
					</ListItemDecorator>
					<ListItemContent>Add image</ListItemContent>
				</MenuItem>
			</Menu>
			<Modal
				open={imageModal}
				onClose={closeImageModal}
			>
				<ImageInputModal
					onSubmit={onSubmitImage}
					onClose={closeImageModal}
					allowTitle
				/>
			</Modal>
		</>
	);
}
