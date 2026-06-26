import { CircularProgress, Link as JoyLink, type LinkProps, styled } from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const LinkRoot = styled(JoyLink, { slot: 'root' })(() => ({}));

export default function Link({ children, href, ...props }: LinkProps) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	return (
		<LinkRoot
			component='span'
			{...props}
			startDecorator={loading ? <CircularProgress /> : props.startDecorator}
			onClick={href ? () => (setLoading(true), navigate(href)) : undefined}
		>
			{children}
		</LinkRoot>
	);
}
