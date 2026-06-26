import type { ReactNode } from 'react';
import AbstractFormField from './AbstractFormField';
import type { FormFieldProps } from './forms';
import { AspectRatio, Modal, Sheet, styled, Typography, type Radius } from '@mui/joy';
import ImageInputModal from '../../layout/ImageInputModal';
import { IconPencil } from '@tabler/icons-react';
import ImageEditBadge from '../ImageEditBadge';
import { FlexCenter, Image } from '@campground/ui';
import type { FormContext } from './context';
import { FormattedMessageGlobal } from '~/i18n';

export interface FormFieldImageProps extends FormFieldProps<string | null> {
	borderRadius?: keyof Radius;
	sizeRatio: number;
	width: number;
}

interface State {
	value: string | null;
	open: boolean;
}

const ImagePlaceholder = styled(Sheet)(({ theme }) => ({
	backgroundColor: theme.vars.palette.neutral.solidBg,
	transition: 'background, color',
	transitionDuration: '0.3s',
	color: theme.vars.palette.neutral.solidColor,
	'&:hover': { backgroundColor: theme.vars.palette.neutral.solidHoverBg },
}));
const FieldImage = styled(Image)<{ radius: keyof Radius }>(({ radius, theme }) => ({
	backgroundColor: theme.vars.palette.background.level4,
	transition: 'background 0.3s',
	position: 'relative',
	borderRadius: theme.vars.radius[radius],
	'&::after': {
		position: 'absolute',
		content: "''",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 2,
		borderRadius: theme.vars.radius[radius],
		backgroundColor: 'transparent',
	},
	'&:hover::after': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
}));

export default class FormFieldImage extends AbstractFormField<
	string | null,
	FormFieldImageProps,
	State
> {
	constructor(props: FormFieldImageProps, context: FormContext) {
		super(props, context, '');
		this.state = { open: false, value: props.defaultValue ?? null };
	}

	private onInputChange(value: string | null) {
		console.log({ value });
		this.setState({ value }, () => value && this.onValueChange());
	}

	public override get isValid(): boolean {
		return this.isNotEmptyOrRequired;
	}

	private get isNotEmptyOrRequired(): boolean {
		return !this.props.required || this.state.value !== null;
	}

	onCloseModal() {
		return this.setState({ open: false });
	}

	public override render(): ReactNode {
		const { borderRadius, sizeRatio, width } = this.props;
		const { open, value } = this.state;
		const onCloseModal = this.onCloseModal.bind(this);

		return (
			<>
				<ImageEditBadge
					onClick={() => this.setState({ open: true })}
					badgeContent={<IconPencil size='20' />}
					variant='soft'
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					color='neutral'
				>
					<AspectRatio
						ratio={sizeRatio}
						sx={{ width }}
					>
						{value ?
							<FieldImage
								radius={borderRadius ?? 'sm'}
								src={value}
							/>
						:	<ImagePlaceholder
								variant='solid'
								sx={{ borderRadius }}
							>
								<FlexCenter>
									<Typography>
										<FormattedMessageGlobal id='form.uploadImage' />
									</Typography>
								</FlexCenter>
							</ImagePlaceholder>
						}
					</AspectRatio>
				</ImageEditBadge>
				<Modal
					open={open}
					onClose={onCloseModal}
				>
					<ImageInputModal
						onClose={onCloseModal}
						currentValue={value}
						onSubmit={this.onInputChange.bind(this)}
						onRemove={() => this.onInputChange(null)}
					/>
				</Modal>
			</>
		);
	}
}
