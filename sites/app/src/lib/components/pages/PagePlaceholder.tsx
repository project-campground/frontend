import { Stack, Typography } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';
import { TextBlock } from '@campground/ui';
import React, { ReactNode } from 'react';
import type { HttpResponseWithContent } from '~/api/http/HTTPResponse';

type Props = {
	icon: PagePlaceholderIcon;
	title: ReactNode[] | ReactNode;
	status?: ReactNode[] | ReactNode;
	children: ReactNode[] | ReactNode;
	sx?: SxProps;
};

export enum PagePlaceholderIcon {
	Welcome,
	Ok,
	NotOk,
	Appreciation,
	Error,
	NotFound,
	Unrecognized,
	Empty,
	NoMore,
	WIP,
}

export const iconToText: Record<PagePlaceholderIcon, string> = {
	[PagePlaceholderIcon.Welcome]: '(￣▽￣)ノ',
	[PagePlaceholderIcon.Error]: '(✖╭╮✖)',
	[PagePlaceholderIcon.NotFound]: '┐(￣ ヘ￣)┌',
	[PagePlaceholderIcon.NoMore]: '(づ ◕‿◕ )づ',
	[PagePlaceholderIcon.Empty]: 'd(￣◇￣)b',
	[PagePlaceholderIcon.WIP]: '（◞‸◟）',
	[PagePlaceholderIcon.NotOk]: '(╥﹏╥)',
	[PagePlaceholderIcon.Unrecognized]: '(>⌓<｡)',
	[PagePlaceholderIcon.Appreciation]: '(ɔˆ ³(ˆ⌣ˆc)',
	[PagePlaceholderIcon.Ok]: '(｡^‿^｡)',
};

const statusToIcon: Record<number, PagePlaceholderIcon> = {
	200: PagePlaceholderIcon.Ok,
	400: PagePlaceholderIcon.NotOk,
	401: PagePlaceholderIcon.Unrecognized,
	403: PagePlaceholderIcon.WIP,
	404: PagePlaceholderIcon.NotFound,
};

export function PagePlaceholderFromApi({
	response,
}: {
	response: HttpResponseWithContent<unknown>;
}) {
	const iconType = statusToIcon[response.status] ?? PagePlaceholderIcon.Error;

	return (
		<PagePlaceholder
			icon={iconType}
			status={response.status}
			title={response.errorHeader || `Error ${response.status}`}
		>
			{response.errorDescription}
		</PagePlaceholder>
	);
}

export default class PagePlaceholder extends React.Component<Props> {
	render() {
		const { icon, title, status, sx, children } = this.props;

		return (
			<Stack
				direction='row'
				alignItems='center'
				sx={[{ width: '100%', height: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}
			>
				<Stack
					direction='column'
					alignItems='center'
					sx={{ width: '100%' }}
				>
					<Typography
						level='h1'
						textColor='text.tertiary'
						fontWeight={900}
						sx={{ mb: 2 }}
					>
						{iconToText[icon]}
					</Typography>
					<Typography level='h2'>
						{status && (
							<>
								<TextBlock>
									<Typography textColor='text.tertiary'>{status}</Typography>
								</TextBlock>{' '}
							</>
						)}
						<TextBlock>{title}</TextBlock>
					</Typography>
					<Typography level='body-md'>{children}</Typography>
				</Stack>
			</Stack>
		);
	}
}
