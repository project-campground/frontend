import { styled } from '@mui/joy';
import { Image } from '@campground/ui';

export const EditorImageDisplayRoot = styled(`div`, { name: 'EditorImage', slot: 'root' })(() => ({
	position: 'relative',
	width: 'min-content',
	height: 'min-content',
}));
export const EditorImageWrapperRoot = styled(`div`, { name: 'EditorImage', slot: 'wrapper' })(
	({ theme }) => ({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',
		backgroundColor: theme.vars.palette.background.body,
		borderRadius: theme.vars.radius.sm,
	}),
);
export const EditorImageHeaderRoot = styled(`div`, { name: 'EditorImage', slot: 'header' })(
	({ theme }) => ({
		overflow: 'hidden',
		whiteSpace: 'break-spaces',
		padding: '6px 8px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		color: theme.vars.palette.text.quartary,
		gap: 4,
	}),
);
export const EditorImageAlt = styled(`div`, { name: 'EditorImageAlt', slot: 'root' })(
	({ theme }) => ({
		backgroundColor: theme.vars.palette.background.body,
		color: theme.vars.palette.text.secondary,
		borderRadius: theme.vars.radius.sm,
		whiteSpace: 'break-spaces',
		marginTop: 2,
		padding: '2px 4px',
		'::before': { content: "'Alt: '" },
	}),
);
const EditorImageDisplay = styled(Image, { name: 'EditorImageDisplay', slot: 'image' })(
	({ theme }) => ({
		border: 'solid 1px transparent',
		'&.selected': { border: `solid 1px ${theme.vars.palette.primary[500]}` },
	}),
);
export default EditorImageDisplay;

// export default function EditorImageDisplay({ element }: Props) {
//     return (
//         <ImageWrapper>
//             <Image src={element.url} mw={200} />
//         </ImageWrapper>
//     );
// }
