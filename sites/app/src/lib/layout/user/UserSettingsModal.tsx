import { IconSnowflake, IconUserFilled, type ReactNode } from '@tabler/icons-react';
import SettingsModal, { type SettingsComponentProps } from '../settings';
import { useAccount } from '~/context/account';
import type React from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import PageSidebarItem from '~/components/pages/PageSidebarItem';
import PageSidebarSection from '~/components/pages/PageSidebarSection';
import UserSettingsAccount from './UserSettingsAccount';
import UserSettingsFreeze from './UserSettingsFreeze';

type Page = 'account' | 'deactivate';
const settingsPages: Record<
	Page,
	| { new (props: any, context: any): React.Component }
	| ((props: SettingsComponentProps<UserSettingsProps>) => ReactNode | ReactNode[])
> = { account: UserSettingsAccount, deactivate: UserSettingsFreeze };

export type UserSettingsProps = {};

export default function UserSettingsModal(props: UserSettingsProps) {
	const account = useAccount();
	const callbacks: Record<Page, (fieldValues: Record<string, any>) => unknown> = {
		account: () => {},
		deactivate: () => {},
	};
	console.log('Account', account);

	return (
		<SettingsModal<Page, UserSettingsProps>
			header={<FormattedMessageGlobal id='app.users.settings' />}
			settingsProps={props}
			settingsPages={settingsPages}
			defaultPage='account'
			onSubmit={async (page, values) => callbacks[page](values)}
		>
			<PageSidebarSection header={`@${account?.authenticated ? account.sessionInfo.handle : ''}`}>
				<PageSidebarItem
					id='account'
					startDecorator={<IconUserFilled />}
				>
					<FormattedMessage
						id='app.users.settings.account'
						defaultMessage='Account'
						description='The user account settings tab'
					/>
				</PageSidebarItem>
			</PageSidebarSection>
			<PageSidebarSection header={<FormattedMessageGlobal id='app.settings.other' />}>
				<PageSidebarItem
					id='deactivate'
					startDecorator={<IconSnowflake />}
					color='danger'
				>
					<FormattedMessageGlobal id='app.users.settings.deactivate' />
				</PageSidebarItem>
			</PageSidebarSection>
		</SettingsModal>
	);
}
