import {
	Box,
	Button,
	CircularProgress,
	Divider,
	ModalClose,
	ModalDialog,
	Sheet,
	Stack,
	styled,
	Typography,
} from '@mui/joy';
import { Group } from '@campground/ui';
import React, { type PropsWithChildren, type ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import PageSidebar from '~/components/pages/PageSidebar';
import { FormattedMessageGlobal } from '~/i18n';

type Props<TPage extends string, TProps> = PropsWithChildren & {
	header: ReactNode[] | ReactNode;
	settingsProps: TProps;
	// sections: PageSidebarSection[];
	defaultPage: TPage;
	settingsPages: SettingsPages<TPage, TProps>;
	onSubmit: (page: TPage, values: Record<string, any>) => Promise<unknown>;
};
export type SettingsComponentProps<T> = {
	settingsProps: T;
	setResetHandler: (onReset: () => unknown) => void;
	onValuesChanged: (isValid: boolean, notDefault: boolean, values: Record<string, any>) => unknown;
};

export type SettingsPageProps<TProps> =
	| { new (props: any, context?: any): React.Component }
	| ((props: SettingsComponentProps<TProps>) => React.ReactNode | React.ReactNode[]);
export type SettingsPages<TPage extends string, TProps> = Record<TPage, SettingsPageProps<TProps>>;

const SubmitBox = styled(Sheet)(({ theme }) => ({
	position: 'absolute',
	padding: '12px 16px',
	display: 'flex',
	flexDirection: 'column',
	backgroundColor: theme.vars.palette.background.level2,
	borderRadius: theme.vars.radius.md,
	boxShadow: theme.vars.shadow.md,
	gap: 12,
	bottom: -200,
	left: 0,
	right: 0,
	transition: 'bottom ease-out 0.2s',
	'&.visible': { bottom: 0 },
}));

const SettingsPage = styled(Stack, { name: 'SettingsModal', slot: 'page' })(({ theme }) => ({
	backgroundColor: theme.vars.palette.background.level1,
	height: '100%',
	width: '100%',
	borderRadius: theme.vars.radius.lg,
	border: `solid 1px ${theme.vars.palette.neutral.border}`,
}));
const SettingsPageContent = styled(Stack, { name: 'SettingsModal', slot: 'page-content' })(
	({ theme }) => ({
		height: '100%',
		overflow: 'hidden',
		overflowY: 'auto',
		flex: 1,
		padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
		[theme.breakpoints.down('lg')]: { padding: `${theme.spacing(1)} ${theme.spacing(3)}` },
	}),
);

export const SettingsSidebar = styled(Stack)(({ theme }) => ({
	backgroundColor: theme.vars.palette.background.level1,
	height: '100%',
	width: 300,
	minWidth: 300,
	position: 'relative',
	padding: `${theme.spacing(3)} ${theme.spacing(3)}`,
	borderRadius: theme.vars.radius.lg,
	overflow: 'hidden',
	gap: theme.spacing(2),
	border: `solid 1px ${theme.vars.palette.neutral.border}`,
}));

type State<TPage extends string> = {
	page: TPage;
	submitting: boolean;
	changed: boolean;
	valid: boolean;
	values: Record<string, any>;
};

export default class SettingsModal<TPage extends string, TProps> extends React.Component<
	Props<TPage, TProps>,
	State<TPage>
> {
	private _resetHandler: null | (() => unknown) = null;

	constructor(props: Props<TPage, TProps>) {
		super(props);

		this.state = {
			page: props.defaultPage,
			values: {},
			valid: false,
			changed: false,
			submitting: false,
		};
	}

	get Component() {
		return this.props.settingsPages[this.state.page];
	}

	resetValues = () => {
		this._resetHandler?.();
		this.setState({ values: {}, valid: false, changed: false, submitting: false });
	};

	render() {
		const { Component } = this;
		const { header, onSubmit, settingsProps, children, defaultPage } = this.props;
		const { page, values, valid, changed, submitting } = this.state;

		return (
			<ModalDialog
				layout='fullscreen'
				sx={{ padding: 0, bgcolor: 'background.body' }}
			>
				<ModalClose />
				<Stack sx={{ width: '100%', height: '100%', overflow: 'hidden', px: 0.5, py: 0.5 }}>
					<Group
						sx={{ width: '100%', height: '100%', overflow: 'hidden' }}
						flex={1}
						gap={0.5}
					>
						<SettingsSidebar>
							<Typography
								level='title-lg'
								sx={{ mx: 1 }}
							>
								{header}
							</Typography>
							<Box
								flex={1}
								sx={{ overflowY: 'auto', px: 1 }}
							>
								<PageSidebar
									defaultActive={defaultPage}
									onItemChange={(item) => this.setState({ page: item as TPage })}
								>
									{children}
								</PageSidebar>
							</Box>
							<SubmitBox className={changed ? 'visible' : ''}>
								<Typography>
									<FormattedMessage
										id='app.settings.unsavedChanges'
										defaultMessage='You have unsaved changes'
										description='The text that appears in the pop up when you change values in settings'
									/>
								</Typography>
								<Group gap={2}>
									<Button
										variant='plain'
										color='neutral'
										onClick={this.resetValues}
									>
										<FormattedMessageGlobal id='common.cancel' />
									</Button>
									<Button
										variant='glow'
										color='success'
										disabled={!valid}
										onClick={async () => {
											this.setState({ ...values, submitting: true });
											return onSubmit(page, values).then(() => {
												this.setState({ ...values, valid: false, changed: false, submitting: false });
											});
										}}
									>
										{submitting ?
											<CircularProgress color='neutral' />
										:	<FormattedMessage
												id='app.settings.save'
												defaultMessage='Save changes'
												description='Button for saving changes in settings'
											/>
										}
									</Button>
								</Group>
							</SubmitBox>
						</SettingsSidebar>
						<Box flex={1}>
							<Component
								settingsProps={settingsProps}
								setResetHandler={(handler) => ((this._resetHandler = handler), undefined)}
								onValuesChanged={(valid, changed, values) =>
									this.setState({ submitting: false, values, valid, changed })
								}
							/>
						</Box>
					</Group>
				</Stack>
			</ModalDialog>
		);
	}
}
