import { Alert, Button, Divider, Modal, Stack, Typography } from '@mui/joy';
import { IconInfoCircleFilled, IconTent } from '@tabler/icons-react';
import React, { type ContextType, type ReactNode } from 'react';
import type {
	GetTentsOutput,
	TentCategoryView,
	TentViewBasic,
	TentViewDetailed,
} from 'types/campground/tent';
import type { Session } from '~/context/session/types';
import TentCreationModal from '../../lib/layout/sidebar/TentCreationModal';
import TentCategory from '../../lib/components/tents/TentCategory';
import type { NavigateFunction } from 'react-router';
import type { TentSettingsPage } from '~/layout/tent/TentSettingsModal';
import TentSettingsModal from '~/layout/tent/TentSettingsModal';
import { CampsiteContext, type CampsiteContext } from './context';
import type { CategorySettingsPage } from '~/layout/category/CategorySettingsModal';
import CategorySettingsModal from '~/layout/category/CategorySettingsModal';
import { GeneralPermissionConsts } from '~/util/permissions';
import { DragDropProvider } from '~/draggable';
import ItemBottomMover from '../../lib/components/ItemBottomMover';
import TentList from '~/components/tents/TentList';
import TentItem from '~/components/tents/TentItem';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageGlobal } from '~/i18n';

type Props = {
	campsiteId: string;
	bonfireId: string;
	tentSelected: string | null;
	tents: GetTentsOutput;
	onTentCreated: (tent: TentViewDetailed) => void | unknown;
	navigate: NavigateFunction;
};

type State = {
	createModalOpen: boolean;
	modalCategoryId: string | null;
	sortedTents: TentViewBasic[];
	sortedCategories: TentCategoryView[];
	settingsOpen: {
		category?: TentCategoryView;
		tent?: TentViewBasic;
		page?: TentSettingsPage | CategorySettingsPage;
	} | null;
};

type TentSidebarItem = Omit<TentViewBasic, 'name'> & { name: ReactNode[] | ReactNode };

export function TentCategorizedList({
	categoryId,
	addBottomMover,
	tents,
	tentSelected,
	onSettingsOpen: onTentSettingsOpen,
}: {
	categoryId: string;
	addBottomMover?: boolean;
	tents: TentSidebarItem[];
	tentSelected?: string | null;
	onSettingsOpen: (props: {
		tent?: TentViewBasic;
		category?: TentCategoryView;
		page?: TentSettingsPage;
	}) => unknown;
}) {
	return (
		<TentList sx={{ '--List-padding': 0 }}>
			{tents.map((x) => (
				<TentItem
					key={x.id}
					tent={x}
					isActive={x.id === tentSelected}
					onSettingsOpen={onTentSettingsOpen}
				/>
			))}
			{addBottomMover && (
				<ItemBottomMover
					categoryId={categoryId}
					bottomItemId={`t:${tents.slice(-1)[0]?.id}`}
				/>
			)}
		</TentList>
	);
}

export default class TentSidebarList extends React.Component<Props, State> {
	static contextType?: React.Context<any> | undefined = CampsiteContext;
	declare context: ContextType<typeof CampsiteContext>;

	constructor(props: Props, context: CampsiteContext) {
		super(props, context);

		this.state = {
			createModalOpen: false,
			modalCategoryId: null,
			sortedTents: this.props.tents.tents.sort((a, b) => a.position - b.position),
			sortedCategories: this.props.tents.categories.sort((a, b) => a.position - b.position),
			settingsOpen: null,
		};
	}
	componentDidUpdate(
		prevProps: Readonly<Props>,
		_prevState: Readonly<State>,
		_snapshot?: Session | undefined,
	): void {
		if (prevProps === this.props) return;

		this.setState({
			sortedTents: this.props.tents.tents.sort((a, b) => a.position - b.position),
			sortedCategories: this.props.tents.categories.sort((a, b) => a.position - b.position),
		});
	}
	get lowestPriorityTent() {
		return this.state.sortedTents.slice(-1)[0]?.position ?? -1;
	}
	get lowestPriorityCategory() {
		return this.state.sortedCategories.slice(-1)[0]?.position ?? -1;
	}
	get tentsUncategorized() {
		return this.state.sortedTents.filter((x) => !x.categoryId);
	}
	get tentsCategorized() {
		const { sortedTents: tents } = this.state;

		return this.state.sortedCategories.map((x) => ({
			category: x,
			tents: tents.filter((y) => y.categoryId === x.id),
		}));
	}
	onModalClose() {
		this.setState({ createModalOpen: false, modalCategoryId: null });
	}
	onCategoryTentCreate(categoryId: string) {
		this.setState({ createModalOpen: true, modalCategoryId: categoryId });
	}
	private _setSettingsOpenBind = this.setSettingsOpen.bind(this);
	private async setSettingsOpen(props: State['settingsOpen']) {
		this.setState({ settingsOpen: props });
	}
	private moveTent(movedId: string, movedTo: string) {
		const { session } = this.context;
		const movedToId = movedTo.slice(2);
		const movedToTent =
			movedTo.startsWith('b') ?
				movedToId === '' ?
					// Since non-categorized bottom has ID "b:"
					this.tentsUncategorized.slice(-1)[0]
				:	this.tentsCategorized.find((x) => x.category.id === movedToId)?.tents.slice(-1)?.[0]
			:	this.props.tents.tents.find((x) => x.id === movedToId);

		return session.atproto.tents.move(movedId, {
			categoryId: movedToTent?.categoryId ?? (movedTo.startsWith('b') ? movedTo.slice(2) : ''),
			// If we are moving to the bottom, then it must be below the lowest tent(+ 1), but if tent is specified instead, we move it higher (- 1)
			position: (movedToTent?.position ?? -1) + Number(movedTo.startsWith('b')),
		});
	}
	private moveCategory(movedId: string, movedTo: string) {
		const { session } = this.context;
		const movedToId = movedTo.slice(2);
		const movedToCategory =
			movedTo.startsWith('b') ?
				this.state.sortedCategories.slice(-1)[0]
			:	this.state.sortedCategories.find((x) => x.id === movedToId);

		return session.atproto.categories.move(movedId, { position: movedToCategory?.position ?? -1 });
	}
	render() {
		const {
			lowestPriorityTent,
			lowestPriorityCategory,
			tentsUncategorized,
			tentsCategorized,
			props: { tentSelected, campsiteId },
		} = this;
		const { permissions } = this.context;
		const onModalClose = this.onModalClose.bind(this);
		const canManageTents = !!(permissions.bonfire.general & GeneralPermissionConsts.MANAGE_TENTS);

		return (
			<>
				<DragDropProvider
					onDropped={(movedId, droppedOnId, group) =>
						group === 'tent' ?
							this.moveTent(movedId, droppedOnId)
						:	this.moveCategory(movedId, droppedOnId)
					}
				>
					<Stack gap={2}>
						{/* Pseudo-tents like bulletin board */}
						<TentCategorizedList
							categoryId=''
							onSettingsOpen={this._setSettingsOpenBind}
							tentSelected={tentSelected}
							tents={
								[
									{
										id: 'bulletin',
										campsiteId,
										name: <FormattedMessageGlobal id='app.tents.bulletin' />,
										type: 'bulletin',
										canView: true,
									},
									{
										id: 'members',
										campsiteId,
										name: <FormattedMessageGlobal id='app.members' />,
										type: 'members',
										canView:
											permissions.role.general
											& (GeneralPermissionConsts.KICK_MEMBERS
												| GeneralPermissionConsts.BAN_MEMBERS
												| GeneralPermissionConsts.MUTE_MEMBERS
												| GeneralPermissionConsts.GIVE_ROLES),
									},
								].filter((x) => x.canView) as unknown[] as TentViewBasic[]
							}
						/>
						<Divider />
						{/* Actual tents */}
						<Stack>
							<TentCategorizedList
								addBottomMover
								categoryId=''
								onSettingsOpen={this._setSettingsOpenBind}
								tents={tentsUncategorized}
								tentSelected={tentSelected}
							/>
							{tentsCategorized.map((x) => (
								<TentCategory
									onSettingsOpen={this._setSettingsOpenBind}
									key={x.category.id}
									category={x.category}
									onCreate={this.onCategoryTentCreate.bind(this, x.category.id)}
								>
									<TentCategorizedList
										addBottomMover
										categoryId={x.category.id}
										onSettingsOpen={this._setSettingsOpenBind}
										tents={x.tents}
										tentSelected={tentSelected}
									/>
								</TentCategory>
							))}
							{!!this.state.sortedCategories.length && (
								<ItemBottomMover
									group='category'
									categoryId=''
									bottomItemId={`t:${this.state.sortedCategories.slice(-1)[0].id}`}
								/>
							)}
							<Stack gap={1}>
								{tentsCategorized.length + tentsUncategorized.length ? null : (
									<Alert
										variant='soft'
										color='neutral'
										startDecorator={<IconInfoCircleFilled />}
									>
										<Stack>
											<Typography>
												<FormattedMessage
													id='app.bonfires.noTents'
													defaultMessage='This bonfire has no visible tents'
													description='Note telling user that the bonfire contains no visible tents for them'
												/>
											</Typography>
										</Stack>
									</Alert>
								)}
								{canManageTents && (
									<Button
										startDecorator={<IconTent />}
										color='neutral'
										variant='outlined'
										sx={{ borderWidth: 3, borderStyle: 'dashed' }}
										onClick={() => this.setState({ createModalOpen: true })}
									>
										<FormattedMessageGlobal id='app.tents.create' />
									</Button>
								)}
							</Stack>
						</Stack>
					</Stack>
				</DragDropProvider>
				<Modal
					open={this.state.createModalOpen}
					onClose={onModalClose}
				>
					<TentCreationModal
						campsiteId={this.props.campsiteId}
						bonfireId={this.props.bonfireId}
						categories={this.state.sortedCategories}
						onTentCreated={this.props.onTentCreated}
						categoryId={this.state.modalCategoryId}
						lowestPriorityTent={lowestPriorityTent}
						lowestPriorityCategory={lowestPriorityCategory}
					/>
				</Modal>
				{this.state.settingsOpen?.tent && (
					<Modal
						open
						onClose={() => this.setState({ settingsOpen: null })}
					>
						<TentSettingsModal
							tentId={this.state.settingsOpen.tent.id}
							tent={this.state.settingsOpen.tent}
							defaultPage={this.state.settingsOpen.page}
							permissions={this.context.permissions}
						/>
					</Modal>
				)}
				{this.state.settingsOpen?.category && (
					<Modal
						open
						onClose={() => this.setState({ settingsOpen: null })}
					>
						<CategorySettingsModal
							categoryId={this.state.settingsOpen.category.id}
							category={this.state.settingsOpen.category}
							defaultPage={this.state.settingsOpen.page}
							permissions={this.context.permissions}
						/>
					</Modal>
				)}
			</>
		);
	}
}
