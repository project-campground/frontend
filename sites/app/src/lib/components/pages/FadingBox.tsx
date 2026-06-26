import { Box, styled } from '@mui/joy';

const FadingBox = styled(Box, { name: 'FadingBox', slot: 'root' })(() => ({
	maskImage: `linear-gradient(to bottom, white, transparent)`,
	maskRepeat: 'no-repeat',
	'&.reverse': { maskImage: `linear-gradient(to top, white, transparent)` },
}));

export default FadingBox;
