import { List, styled } from '@mui/joy';

const GridList = styled(List)(({ theme }) => ({
	'--List-gap': 0,
	'--ListItem-paddingY': theme.spacing(2),
	'--ListItem-radius': theme.radius.md,
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	gap: theme.spacing(1),
}));
export default GridList;
