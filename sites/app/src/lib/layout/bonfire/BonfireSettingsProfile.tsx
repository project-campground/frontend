import { Box, FieldControl, FieldLabel, FormHelperText } from '@mui/joy';
import Form from '~/components/form/Form';
import type { SettingsComponentProps } from '../settings';
import type { BonfireViewBasic } from 'types/campground/bonfires';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';
import FormSection from '~/components/form/FormSection';
import FormFieldImage from '~/components/form/FormFieldImage';
import FormFieldAvatar from '~/components/form/FormFieldAvatar';
import FormFieldText from '~/components/form/FormFieldText';
import FormFieldTextArea from '~/components/form/FormFieldTextArea';
import SettingsPageWrapper from '../settings/page';
import { IconLayoutBoardFilled } from '@tabler/icons-react';

export default function BonfireSettingsProfile({
	setResetHandler,
	onValuesChanged,
	settingsProps: { bonfire },
}: SettingsComponentProps<{ bonfire: BonfireViewBasic }>) {
	const defaultValues = useMemo(
		() => ({
			name: bonfire.name,
			description: bonfire.description,
			avatarUri: bonfire.avatarUri ?? undefined,
			bannerUri: bonfire.bannerUri ?? undefined,
		}),
		[bonfire.id],
	);
	const oneOfNotDefault = (fieldValues: Record<string, any>) =>
		Object.entries(fieldValues).some(
			([key, value]) => defaultValues[key as keyof typeof defaultValues] != value,
		);

	return (
		<SettingsPageWrapper
			startDecorator={<IconLayoutBoardFilled />}
			header={bonfire.name}
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
									id='global.banner'
									defaultMessage='Banner'
									description='The banner of campsites, bonfires and users'
								/>
							</FieldLabel>
							<FormFieldImage
								id='bannerUri'
								borderRadius='md'
								width={310}
								sizeRatio={3.647}
								defaultValue={defaultValues.bannerUri}
							/>
							<FormHelperText>
								<FormattedMessage
									id='app.bonfires.settings.bannerNote'
									defaultMessage='The banner shows up at the top of the tent list'
									description="Notifying that bonfire's banner shows up at the top of tent list"
								/>
							</FormHelperText>
						</FieldControl>
					</FormSection>
					<FormSection
						layout='inline'
						alignItems='center'
						gap={2}
					>
						<FieldControl>
							<FormFieldAvatar
								id='avatarUri'
								size='lg'
								borderRadius='md'
								variant='solid'
								defaultValue={defaultValues.avatarUri}
								placeholder={bonfire.name[0]}
							/>
						</FieldControl>
						<FieldControl>
							<FieldLabel>
								<FormattedMessageGlobal id='app.bonfires.settings.name' />
							</FieldLabel>
							<FormFieldText
								required
								id='name'
								defaultValue={bonfire.name}
								flex={1}
							/>
						</FieldControl>
					</FormSection>
					<FormSection header={<FormattedMessageGlobal id='info' />}>
						<FieldControl>
							<FieldLabel>
								<FormattedMessageGlobal id='info.desc' />
							</FieldLabel>
							<FormFieldTextArea
								id='description'
								defaultValue={bonfire.description}
							/>
						</FieldControl>
					</FormSection>
				</Form>
			</Box>
		</SettingsPageWrapper>
	);
}
