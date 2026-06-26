import { Alert, Button, Stack, Typography } from '@mui/joy';
import type { SettingsComponentProps } from '../settings';
import React, { type ContextType } from 'react';
import SettingsPageWrapper from '../settings/page';
import { IconMailFilled, IconUserFilled } from '@tabler/icons-react';
import { AccountContext, type AccountContextAuthenticated } from '~/context/account';
import { FormattedMessage } from 'react-intl';
import UserHeader from '~/components/users/UserHeader';

type DefaultValues = {};
type State = {};

export default class UserSettingsAccount extends React.Component<
	SettingsComponentProps<{}>,
	State
> {
	static contextType?: React.Context<any> | undefined = AccountContext;
	declare context: AccountContextAuthenticated;
	private _defaultValues: DefaultValues;
	private _init: boolean = false;

	constructor(props: SettingsComponentProps<{}>, context: ContextType<typeof AccountContext>) {
		super(props, context);

		this._defaultValues = {};
	}
	oneOfNotDefault(fieldValues: Record<string, any>) {
		return Object.entries(fieldValues).some(
			([key, value]) => this._defaultValues[key as keyof typeof this._defaultValues] != value,
		);
	}
	componentDidMount(): void {
		if (this._init) return;

		this._init = true;
	}
	render() {
		const me = this.context.profile;
		const sessionInfo = this.context.sessionInfo;

		return (
			<SettingsPageWrapper
				startDecorator={<IconUserFilled />}
				header={me.displayName}
				gap={4}
			>
				<Stack gap={1}>
					<UserHeader
						did={sessionInfo.did}
						avatar={me.avatar}
						banner={me.banner}
						bannerAspectRatio={10}
					/>
					<Stack>
						<Typography level='h2'>{me.displayName}</Typography>
						<Typography
							level='body-lg'
							textColor='text.tertiary'
						>
							@{sessionInfo.handle}
						</Typography>
					</Stack>
				</Stack>
				{this.context.sessionInfo.emailConfirmed ?
					<Alert
						variant='soft'
						color='success'
						startDecorator={<IconMailFilled />}
					>
						<FormattedMessage
							id='app.settings.emailConfirmed'
							defaultMessage='The email is confirmed to belong to this account.'
							description='Notifies user in the settings that their email is already confirmed'
						/>
					</Alert>
				:	<Alert
						variant='soft'
						color='danger'
						startDecorator={<IconMailFilled />}
					>
						<Stack
							gap={1}
							alignItems='start'
						>
							<FormattedMessage
								id='app.settings.emailUnconfirmed'
								defaultMessage='Your email has not been yet confirmed to belong to this account. Make sure to confirm it.'
								description='Notifies user in the settings that their email has not yet been confirmed'
							/>
							<Button color='danger'>
								<FormattedMessage
									id='app.users.settings.emailConfirmButton'
									defaultMessage='Confirm email'
									description='The email confirm button in settings'
								/>
							</Button>
						</Stack>
					</Alert>
				}
			</SettingsPageWrapper>
		);
	}
}
