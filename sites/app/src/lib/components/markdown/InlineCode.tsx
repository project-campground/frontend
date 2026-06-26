import { Typography } from '@mui/joy';

type Props = { children: string; language: string | undefined | null };

export default function InlineCode({ children, language }: Props) {
	return (
		<Typography
			component='code'
			level='code'
			className={language ? `language-${language}` : ``}
		>
			{children}
		</Typography>
	);
}
