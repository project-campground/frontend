import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Form from '../../lib/components/form/Form';
import { Alert, Link, FormControl, FormLabel, FormHelperText } from '@mui/joy';
import { useSession } from '~/context/session';
import { IconArrowRight, IconExclamationCircleFilled } from '@tabler/icons-react';
import { FormattedMessageGlobal } from '~/i18n';
import FormSection from '~/components/form/FormSection';
import FormFieldText from '~/components/form/FormFieldText';
import FormSubmit from '~/components/form/FormSubmit';

export default function LoginPage() {
	const session = useSession();
	const [error, setError] = useState<Error | null>(null);

	const onSubmit = async (
		event: React.MouseEvent<Element, MouseEvent> | undefined,
		fieldValues: Record<string, any>,
	) => {
		event?.preventDefault();

		// TODO: Stronger check on the identifier
		const details = { identifier: fieldValues.identifier, password: fieldValues.password };

		return await session
			.login(details)
			.then(() => ((window.location.href = '/'), undefined))
			.catch((err) => setError(err));
	};

	return (
		<Form onSubmit={onSubmit}>
			<FormSection>
				<FormControl required>
					<FormLabel>
						<FormattedMessageGlobal id='info.handleOrEmail' />
					</FormLabel>
					<FormFieldText
						required
						id='identifier'
						placeholder='example@example.com'
						format={/^(?:([A-Za-z0-9._%+-]+)@)?((?:[A-Za-z0-9-]+[.])+[A-Za-z]{2,})$/}
					/>
				</FormControl>
				<FormControl required>
					<FormLabel>
						<FormattedMessageGlobal id='info.password' />
					</FormLabel>
					<FormFieldText
						required
						id='password'
						inputType='password'
						placeholder='Password here'
					/>
					<FormHelperText>
						<Link
							color='neutral'
							textColor='neutral.300'
							level='body-md'
							href='/reset-password'
						>
							<FormattedMessage
								id='form.resetPassword'
								defaultMessage='Forgot password? Change it'
								description='Reset password link in login page'
							/>
						</Link>
					</FormHelperText>
				</FormControl>
			</FormSection>
			<FormSection>
				<FormSubmit endDecorator={<IconArrowRight />}>
					<FormattedMessageGlobal id='form.login' />
				</FormSubmit>
			</FormSection>
			<FormSection layout='footer'>
				<Link
					color='neutral'
					textColor='neutral.300'
					level='body-md'
					href='/register'
				>
					<FormattedMessage
						id='form.noAccount'
						defaultMessage='No account? Create one'
						description='Link for navigating to registration page in login page'
					/>
				</Link>
				{error && (
					<Alert
						color='danger'
						startDecorator={<IconExclamationCircleFilled />}
					>
						{error.message}
					</Alert>
				)}
			</FormSection>
		</Form>
	);
}
