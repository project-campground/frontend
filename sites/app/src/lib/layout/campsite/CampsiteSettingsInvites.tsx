import type { SettingsComponentProps } from '../settings';
import type { CampsiteSettingsProps } from './CampsiteSettingsModal';
import React from 'react';
import DataDisplay from '~/components/pages/DataDisplay';
import { CampsiteContext } from '~/routes/_global._campsite/context';
import type { TypeToPayload } from 'types/ws';
import type { CampsiteInviteViewBasic } from 'types/campground/invites';
import { Typography } from '@mui/joy';
import Datestamp from '~/components/Datestamp';
import { IconTicket, IconTrashFilled } from '@tabler/icons-react';
import { UserDisplayNoModal } from '~/components/UserDisplay';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import SettingsPageWrapper from '../settings/page';

type State = {};

export default class CampsiteSettingsInvites extends React.Component<
	SettingsComponentProps<CampsiteSettingsProps>,
	State
> {
	static contextType?: React.Context<any> | undefined = CampsiteContext;
	declare context: React.ContextType<typeof CampsiteContext>;

	private onWebSocketEvent<T extends keyof TypeToPayload>(
		invites: CampsiteInviteViewBasic[],
		type: T,
		payload: TypeToPayload[T],
	): boolean {
		const invite = payload as CampsiteInviteViewBasic;
		switch (type) {
			case 'InviteCreated':
				if (invites.length > 50) return false;
				invites.push(invite);
				break;
			case 'InviteDeleted':
				const inviteIndex = invites.findIndex((x) => x.id === invite.id);
				if (inviteIndex < 0) return false;

				invites.splice(inviteIndex, 1);
				break;
		}
		return true;
	}

	private async fetchInvites(offset: number, limit: number) {
		const { api } = this.context;

		return api.invites.getMany(this.props.settingsProps.campsite.id, offset, limit).then((resp) => {
			if (!resp.ok) return resp;

			return { ...resp, content: resp.content.invites };
		});
	}

	private _onInvitesDeleteBind = this.onInvitesDelete.bind(this);
	private onInvitesDelete(selected: CampsiteInviteViewBasic[]) {
		const { api, floaters } = this.context;

		return Promise.all(
			selected.map((invite) =>
				api.invites.delete(invite.campsiteId, invite.id).then((resp) => {
					if (!resp.ok) return floaters.notifyApiError(resp);
				}),
			),
		);
	}

	render(): React.ReactNode {
		return (
			<SettingsPageWrapper
				startDecorator={<IconTicket />}
				header={<FormattedMessageGlobal id='app.invites' />}
			>
				<DataDisplay
					title='invites'
					itemsPerPage={50}
					maxItems={null}
					columns={[
						{ id: 'id', name: <FormattedMessageGlobal id='app.invites.code' />, Component: IdComponent },
						{
							id: 'createdBy',
							name: <FormattedMessageGlobal id='app.common.createdBy' />,
							width: 240,
							Component: CreatedByComponent,
						},
						{
							id: 'createdAt',
							name: <FormattedMessageGlobal id='app.common.createdAt' />,
							width: 120,
							Component: CreatedAtComponent,
							screenSize: 'lg',
						},
						{
							id: 'expires',
							name: <FormattedMessageGlobal id='app.common.expiresAt' />,
							width: 120,
							Component: ExpiresComponent,
							screenSize: 'lg',
						},
						{
							id: 'maxUses',
							name: <FormattedMessageGlobal id='app.invites.allowedAmount' />,
							width: 120,
							Component: MaxUsesComponent,
							screenSize: 'xl',
						},
						{
							id: 'used',
							name: (
								<FormattedMessage
									id='app.invites.used'
									defaultMessage='Times used'
									description='The amount of times invite has been used in invite list'
								/>
							),
							width: 120,
							Component: UsedComponent,
							screenSize: 'xl',
						},
					]}
					menu={[
						{
							startDecorator: <IconTrashFilled />,
							content: (
								<FormattedMessage
									id='app.invites.delete'
									defaultMessage='Delete invites'
									description='Menu button for deleting multiple invites in the invite list'
								/>
							),
							onClick: this._onInvitesDeleteBind,
							variant: 'plain',
							color: 'danger',
						},
					]}
					HeaderComponent={IdComponent}
					fetch={this.fetchInvites.bind(this)}
					updateItems={this.onWebSocketEvent.bind(this)}
				/>
			</SettingsPageWrapper>
		);
	}
}

function IdComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return <Typography>{invite.id}</Typography>;
}
function ExpiresComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return (
		<Datestamp
			when
			long
			date={invite.expiresAt ? new Date(invite.expiresAt) : null}
		/>
	);
}
function CreatedByComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return <UserDisplayNoModal user={invite.createdBy} />;
}
function CreatedAtComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return (
		<Datestamp
			long
			date={new Date(invite.createdAt)}
		/>
	);
}
function MaxUsesComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return (
		<Typography
			level='body-md'
			textColor={invite.allowedAmount ? 'text.tertiary' : 'text.quartary'}
		>
			{invite.allowedAmount ?? <FormattedMessageGlobal id='common.infinite' />}
		</Typography>
	);
}
function UsedComponent({ item: invite }: { item: CampsiteInviteViewBasic }) {
	return (
		<Typography
			level='body-md'
			textColor={invite.used ? 'text.tertiary' : 'text.quartary'}
		>
			{invite.used}
		</Typography>
	);
}
