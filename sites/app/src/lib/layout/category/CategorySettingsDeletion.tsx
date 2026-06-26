import { Alert, Button } from '@mui/joy';
import type { SettingsComponentProps } from '../settings';
import { IconExclamationCircleFilled, IconTrashFilled } from '@tabler/icons-react';
import type { CategorySettingsProps } from './CategorySettingsModal';
import { useSnackbars } from '~/context/snackbar';
import { useContext } from 'react';
import CloseModalContext from '@mui/joy/Modal/CloseModalContext';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import SettingsPageWrapper from '../settings/page';
import { useCampsiteContext } from '~/routes/_global._campsite/context';

export default function CategorySettingsDeletion({
	settingsProps: { category },
}: SettingsComponentProps<CategorySettingsProps>) {
	const { api } = useCampsiteContext();
	const floating = useSnackbars();
	const modalClose = useContext(CloseModalContext);

	return (
		<SettingsPageWrapper
			startDecorator={<IconTrashFilled />}
			header={<FormattedMessageGlobal id='app.tentCategories.delete' />}
			gap={2}
			alignItems='start'
		>
			<Alert
				variant='soft'
				color='danger'
				startDecorator={<IconExclamationCircleFilled />}
			>
				<FormattedMessage
					id='app.tentCategories.settings.deleteWarning'
					defaultMessage="Deleting this tent category will result in permanent deletion of all of its messages, tents and content. If you are sure you want to delete this tent category, type the name of the category and press ''{buttonText}''."
					description='The warning about the consequences of deleting tent category'
					values={{ buttonText: <FormattedMessageGlobal id='form.confirmDelete' /> }}
				/>
			</Alert>
			<Button
				variant='glow'
				color='danger'
				onClick={(ev) =>
					api.categories.delete(category.id).then((resp) => {
						if (!resp.ok) return floating.notifyApiError(resp);
						return modalClose?.(ev, 'closeClick');
					})
				}
			>
				<FormattedMessageGlobal id='form.confirmDelete' />
			</Button>
		</SettingsPageWrapper>
	);
}
