import { Box, FieldControl, FieldLabel } from '@mui/joy';
import Form from '~/components/form/Form';
import type { SettingsComponentProps } from '../settings';
import { useMemo } from 'react';
import type { TentSettingsProps } from './TentSettingsModal';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import FormSection from '~/components/form/FormSection';
import FormFieldText from '~/components/form/FormFieldText';
import FormFieldTextArea from '~/components/form/FormFieldTextArea';
import SettingsPageWrapper from '../settings/page';
import { IconHash } from '@tabler/icons-react';

export default function TentSettingsProfile({
	onValuesChanged,
	setResetHandler,
	settingsProps: { tent },
}: SettingsComponentProps<TentSettingsProps>) {
	const defaultValues = useMemo(
		() => ({ name: tent.name, description: tent.description, viewType: tent.viewType }),
		[tent.id],
	);
	const oneOfNotDefault = (fieldValues: Record<string, any>) =>
		Object.entries(fieldValues).some(
			([key, value]) => defaultValues[key as keyof typeof defaultValues] != value,
		);

	return (
		<SettingsPageWrapper
			startDecorator={<IconHash />}
			header={tent.name}
		>
			<Box sx={{ maxWidth: 500 }}>
				<Form
					ref={(form) => (form as Form | undefined) && setResetHandler(form!.reset)}
					onChange={(isValid, values) => onValuesChanged(isValid, oneOfNotDefault(values), values)}
				>
					<FormSection>
						<FieldControl>
							<FieldLabel>
								<FormattedMessage
									id='app.tents.settings.name'
									defaultMessage='Tent name'
									description='The header of the tent name field in settings'
								/>
							</FieldLabel>
							<FormFieldText
								required
								flex={1}
								id='name'
								defaultValue={tent.name}
							/>
						</FieldControl>
						<FieldControl>
							<FieldLabel>
								<FormattedMessageGlobal id='info.topic' />
							</FieldLabel>
							<FormFieldTextArea
								required
								id='description'
								defaultValue={tent.description}
							/>
						</FieldControl>
					</FormSection>
				</Form>
			</Box>
		</SettingsPageWrapper>
	);
}
