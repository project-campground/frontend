import {
	DialogContent,
	DialogTitle,
	ModalClose,
	ModalDialog,
	FormControl,
	FormLabel,
	Button,
} from '@mui/joy';
import Form from '../components/form/Form';
import type { MemberViewBasic } from 'types/campground/membership';
import { handleAnyRestErrorWith as handleAnyRestErrorWith } from '~/util/rest';
import { useSnackbars } from '~/context/snackbar';
import { FormattedMessage, useIntl } from 'react-intl';
import FormSection from '~/components/form/FormSection';
import FormSubmit from '~/components/form/FormSubmit';
import FormFieldText from '~/components/form/FormFieldText';
import { FormattedMessageGlobal, globalIntlDeclarations } from '~/i18n';
import { useCampsiteContext } from '~/routes/_global._campsite/context';

type Props = { campsiteId: string; member: MemberViewBasic; onClose: () => unknown };

export default function BanMemberModal({ campsiteId, member, onClose }: Props) {
	const { api } = useCampsiteContext();
	const floating = useSnackbars();
	const intl = useIntl();
	const onSubmit = (reason: string) =>
		api.memberBans
			.create(campsiteId, member.user.did, { reason })
			.then(handleAnyRestErrorWith(floating));

	return (
		<ModalDialog>
			<ModalClose />
			<DialogTitle>
				<FormattedMessageGlobal id='app.members.ban' />
			</DialogTitle>
			<DialogContent>
				<FormattedMessage
					id='app.members.ban.desc'
					defaultMessage='The member will lose all their roles, be kicked from the campsite and be unable to join back until their ban is lifted.'
					description='Note about what the user ban will imply when banning a user'
				/>
			</DialogContent>
			<Form onSubmit={(_, values) => (onClose(), onSubmit(values.reason))}>
				<FormSection>
					<FormControl>
						<FormLabel>{intl.formatMessage({ ...globalIntlDeclarations['app.bans.reason'] })}</FormLabel>
						<FormFieldText
							id='reason'
							placeholder={intl.formatMessage({
								id: 'app.bans.reason.example',
								defaultMessage: 'Have been spamming',
								description: 'Example of a ban reason when banning user',
							})}
						/>
					</FormControl>
				</FormSection>
				<FormSection layout='footer'>
					<FormSubmit color='danger'>
						<FormattedMessageGlobal id='app.members.ban' />
					</FormSubmit>
					<Button
						variant='plain'
						color='neutral'
						onClick={() => onClose()}
					>
						<FormattedMessageGlobal id='common.cancel' />
					</Button>
				</FormSection>
			</Form>
		</ModalDialog>
	);
}
