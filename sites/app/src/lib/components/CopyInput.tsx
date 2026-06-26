import { Button, Input } from '@mui/joy';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useSnackbars } from '~/context/snackbar';
import { FormattedMessageGlobal } from '~/i18n';

type Props = { text?: string; placeholder?: string; onCopy?: () => string | Promise<string> };

export default function CopyInput({ text: copyText, placeholder, onCopy }: Props) {
	if (!(copyText || onCopy)) throw new Error('Expected text or onCopy in the props');

	const floating = useSnackbars();
	const [text, setText] = useState(copyText || placeholder);
	const intl = useIntl();

	const onClick = async () => {
		const fetched = copyText ?? (await onCopy!());
		navigator.clipboard.writeText(fetched);
		setText(fetched);
		floating.notifySuccess(
			intl.formatMessage({
				id: 'common.copy.successful',
				defaultMessage: 'Successfully copied!',
				description: 'User has successfully copied a value',
			}),
		);
	};

	return (
		<Input
			value={text}
			endDecorator={
				<Button
					variant='glow'
					onClick={onClick}
				>
					<FormattedMessageGlobal id='common.copy' />
				</Button>
			}
		/>
	);
}
