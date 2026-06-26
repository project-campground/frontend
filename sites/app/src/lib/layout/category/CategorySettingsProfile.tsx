import { Box, FormControl, FormLabel } from '@mui/joy';
import Form from '~/components/form/Form';
import type { SettingsComponentProps } from '../settings';
import { useMemo } from 'react';
import type { CategorySettingsProps } from './CategorySettingsModal';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import FormSection from '~/components/form/FormSection';
import FormFieldText from '~/components/form/FormFieldText';
import FormFieldTextArea from '~/components/form/FormFieldTextArea';
import SettingsPageWrapper from '../settings/page';
import { IconLayoutBoardFilled } from '@tabler/icons-react';

export default function CategorySettingsProfile({
	setResetHandler,
	onValuesChanged,
	settingsProps: { category },
}: SettingsComponentProps<CategorySettingsProps>) {
	const defaultValues = useMemo(
		() => ({ name: category.name, description: category.description }),
		[category.id],
	);
	const oneOfNotDefault = (fieldValues: Record<string, any>) =>
		Object.entries(fieldValues).some(
			([key, value]) => defaultValues[key as keyof typeof defaultValues] != value,
		);

	return (
		<SettingsPageWrapper
			startDecorator={<IconLayoutBoardFilled />}
			header={category.name}
		>
			<Box sx={{ maxWidth: 500 }}>
				<Form
					ref={(form) => (form as Form | undefined) && setResetHandler(form!.reset)}
					onChange={(isValid, values) => onValuesChanged(isValid, oneOfNotDefault(values), values)}
				>
					<FormSection>
						<FormControl>
							<FormLabel>
								<FormattedMessage
									id='app.tentCategories.settings.name'
									defaultMessage='Category name'
									description='The header of the category name field in settings'
								/>
							</FormLabel>
							<FormFieldText
								required
								flex={1}
								id='name'
								defaultValue={category.name}
							/>
						</FormControl>
						<FormControl>
							<FormLabel>
								<FormattedMessageGlobal id='info.topic' />
							</FormLabel>
							<FormFieldTextArea
								required
								id='description'
								defaultValue={category.description}
							/>
						</FormControl>
					</FormSection>
				</Form>
			</Box>
		</SettingsPageWrapper>
	);
}
