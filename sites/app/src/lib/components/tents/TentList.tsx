import { List, styled } from '@mui/joy';

const TentList = styled(List, { name: 'TentList', slot: 'root' })(({ theme }) => ({
	'--ListItemDecorator-size': '32px',
	gap: theme.spacing(0.5),
}));
export default TentList;
