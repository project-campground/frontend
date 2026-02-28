import { Alert, Button, Divider, List, Modal, Stack, styled, Typography } from "@mui/joy";
import { IconInfoCircleFilled, IconTent } from "@tabler/icons-react";
import React from "react";
import type { GetTentsOutput, TentCategoryView, TentViewBasic, TentViewDetailed } from "types/tent";
import type { Session } from "~/context/session/types";
import TentCreationModal from "./TentCreationModal";
import TentItem from "./TentItem";
import TentCategory from "./TentCategory";
import type { NavigateFunction } from "react-router";
import type { TentSettingsPage } from "~/layout/tent/TentSettingsModal";
import TentSettingsModal from "~/layout/tent/TentSettingsModal";
import { CampsiteContextSuiteContext, type CampsiteContextSuite } from "./context";
import type { CategorySettingsPage } from "~/layout/category/CategorySettingsModal";
import CategorySettingsModal from "~/layout/category/CategorySettingsModal";
import { CampsitePermissionConsts } from "~/util/permissions";

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
    settingsOpen: { category?: TentCategoryView; tent?: TentViewBasic, page?: TentSettingsPage | CategorySettingsPage; } | null;
};
export const TentStyledList = styled(List)(() => ({
    "--ListItemDecorator-size": "32px",
}));

function TentCategorizedList({ tents, tentSelected, onSettingsOpen: onTentSettingsOpen }: { tents: TentViewBasic[], tentSelected?: string | null; onSettingsOpen: (props: { tent?: TentViewBasic, category?: TentCategoryView, page?: TentSettingsPage }) => unknown; }) {
    return (
        <TentStyledList sx={{ "--List-padding": 0 }}>
            {tents.map((x) =>
                <TentItem key={x.id} tent={x} isActive={x.id === tentSelected} onSettingsOpen={onTentSettingsOpen} />
            )}
        </TentStyledList>
    )
}

export default class TentList extends React.Component<Props, State, Session> {
    static contextType?: React.Context<any> | undefined = CampsiteContextSuiteContext;

    constructor(props: Props, context: CampsiteContextSuite) {
        super(props, context);

        this.state = {
            createModalOpen: false,
            modalCategoryId: null,
            sortedTents: this.props.tents.tents.sort((a, b) => a.priority - b.priority),
            sortedCategories: this.props.tents.categories.sort((a, b) => a.priority - b.priority),
            settingsOpen: null,
        };
    }
    componentDidUpdate(prevProps: Readonly<Props>, _prevState: Readonly<State>, _snapshot?: Session | undefined): void {
        if (prevProps.tents === this.props.tents)
            return;

        this.setState({
            sortedTents: this.props.tents.tents.sort((a, b) => a.priority - b.priority),
            sortedCategories: this.props.tents.categories.sort((a, b) => a.priority - b.priority)
        });
    }
    get lowestPriorityTent() {
        return this.state.sortedTents.slice(-1)[0]?.priority ?? -1;
    }
    get lowestPriorityCategory() {
        return this.state.sortedCategories.slice(-1)[0]?.priority ?? -1;
    }
    get tentsUncategorized() {
        return this.state.sortedTents.filter((x) => !x.categoryId);
    }
    get tentsCategorized() {
        const { sortedTents: tents } = this.state;
    
        return this.state.sortedCategories.map((x) => ({ category: x, tents: tents.filter((y) => y.categoryId === x.id) }));
    }
    onModalClose() {
        this.setState({ createModalOpen: false, modalCategoryId: null });
    }
    onCategoryTentCreate(categoryId: string) {
        this.setState({ createModalOpen: true, modalCategoryId: categoryId });
    }
    private _setSettingsOpenBind = this.setSettingsOpen.bind(this);
    private async setSettingsOpen(props: State["settingsOpen"]) {
        this.setState({ settingsOpen: props });
    }
    render() {
        const { lowestPriorityTent, lowestPriorityCategory, tentsUncategorized, tentsCategorized, props: { tentSelected, campsiteId } } = this;
        const { permissions } = this.context as CampsiteContextSuite;
        const onModalClose = this.onModalClose.bind(this);
        const canManageTents = !!(permissions.bonfire.campsite & CampsitePermissionConsts.MANAGE_TENTS);

        return (
            <>
                <Stack gap={2}>
                    <TentCategorizedList
                        onSettingsOpen={this._setSettingsOpenBind}
                        tentSelected={tentSelected}
                        tents={[
                            { id: "bulletin", campsiteId, name: "Bulletin Board", type: "bulletin" },
                            { id: "members", campsiteId, name: "Members", type: "members" },
                        ] as unknown[] as TentViewBasic[]}
                    />
                    <Divider />
                    {tentsUncategorized.length
                        ? <TentCategorizedList onSettingsOpen={this._setSettingsOpenBind} tents={tentsUncategorized} tentSelected={tentSelected} />
                        : null
                    }
                    {tentsCategorized.map((x) =>
                        <TentCategory onSettingsOpen={this._setSettingsOpenBind} key={x.category.id} category={x.category} onCreate={this.onCategoryTentCreate.bind(this, x.category.id)}>
                            <TentCategorizedList onSettingsOpen={this._setSettingsOpenBind} tents={x.tents} tentSelected={tentSelected} />
                        </TentCategory>
                    )}
                    <Stack gap={1}>
                        {(tentsCategorized.length + tentsUncategorized.length)
                        ? null
                        : <Alert variant="soft" color="neutral" startDecorator={<IconInfoCircleFilled />}>
                            <Stack>
                                <Typography>
                                    This bonfire has no visible tents.
                                </Typography>
                            </Stack>
                        </Alert>}
                        {canManageTents && <Button startDecorator={<IconTent />} color="neutral" variant="outlined" sx={{ borderWidth: 3, borderStyle: "dashed" }} onClick={() => this.setState({ createModalOpen: true })}>
                            Create tent
                        </Button>}
                    </Stack>
                </Stack>
                <Modal open={this.state.createModalOpen} onClose={onModalClose}>
                    <TentCreationModal
                        campsiteId={this.props.campsiteId}
                        bonfireId={this.props.bonfireId}
                        categories={this.state.sortedCategories}
                        onTentCreated={this.props.onTentCreated}
                        categoryId={this.state.modalCategoryId}
                        onClose={onModalClose}
                        lowestPriorityTent={lowestPriorityTent}
                        lowestPriorityCategory={lowestPriorityCategory}
                    />
                </Modal>
                {this.state.settingsOpen?.tent && <Modal open onClose={() => this.setState({ settingsOpen: null })}>
                    <TentSettingsModal
                        tentId={this.state.settingsOpen.tent.id}
                        tent={this.state.settingsOpen.tent}
                        defaultPage={this.state.settingsOpen.page}
                        permissions={(this.context as CampsiteContextSuite).permissions}
                    />
                </Modal>}
                {this.state.settingsOpen?.category && <Modal open onClose={() => this.setState({ settingsOpen: null })}>
                    <CategorySettingsModal
                        categoryId={this.state.settingsOpen.category.id}
                        category={this.state.settingsOpen.category}
                        defaultPage={this.state.settingsOpen.page}
                        permissions={(this.context as CampsiteContextSuite).permissions}
                    />
                </Modal>}
            </>
        );
    }
}