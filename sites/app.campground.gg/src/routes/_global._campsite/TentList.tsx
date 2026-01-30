import { Alert, Button, Divider, List, Modal, Stack, styled, Typography } from "@mui/joy";
import { IconInfoCircleFilled, IconTent } from "@tabler/icons-react";
import React from "react";
import type { GetTentsOutput, TentCategoryView, TentViewBasic, TentViewDetailed } from "types/tent";
import { SessionContext } from "~/context/session";
import type { Session } from "~/context/session/types";
import TentCreationModal from "./TentCreationModal";
import TentItem from "./TentItem";
import TentCategory from "./TentCategory";

type Props = {
    campsiteId: string;
    bonfireId: string;
    tentSelected: string | null;
    tents: GetTentsOutput;
    onTentCreated: (tent: TentViewDetailed) => void | unknown;
};

type State = {
    createModalOpen: boolean;
    modalCategoryId: string | null;
};
export const TentStyledList = styled(List)(() => ({
    "--ListItemDecorator-size": "32px",
}));

function TentCategorizedList({ tents, tentSelected }: { tents: TentViewBasic[], tentSelected?: string | null }) {
    return (
        <TentStyledList sx={{ "--List-padding": 0 }}>
            {tents.map((x) =>
                <TentItem key={x.id} tent={x} isActive={x.id === tentSelected} />
            )}
        </TentStyledList>
    )
}

export default class TentList extends React.Component<Props, State, Session> {
    static contextType?: React.Context<any> | undefined = SessionContext;
    private sortedTents: TentViewBasic[];
    private sortedCategories: TentCategoryView[];

    constructor(props: Props, context: Session) {
        super(props, context);

        this.state = { createModalOpen: false, modalCategoryId: null };
        this.sortedTents = this.props.tents.tents.sort((a, b) => a.priority - b.priority);
        this.sortedCategories = this.props.tents.categories.sort((a, b) => a.priority - b.priority);
    }
    get lowestPriorityTent() {
        return this.sortedTents.slice(-1)[0]?.priority ?? -1;
    }
    get lowestPriorityCategory() {
        return this.sortedCategories.slice(-1)[0]?.priority ?? -1;
    }
    get tentsUncategorized() {
        return this.sortedTents.filter((x) => !x.categoryId);
    }
    get tentsCategorized() {
        const { sortedTents: tents } = this;
    
        return this.sortedCategories.map((x) => ({ category: x, tents: tents.filter((y) => y.categoryId === x.id) }));
    }
    onModalClose() {
        this.setState({ createModalOpen: false, modalCategoryId: null });
    }
    onCategoryTentCreate(categoryId: string) {
        console.log({ categoryId });
        this.setState({ createModalOpen: true, modalCategoryId: categoryId });
    }
    render() {
        const { lowestPriorityTent, lowestPriorityCategory, tentsUncategorized, tentsCategorized, props: { tentSelected, campsiteId } } = this;
        const onModalClose = this.onModalClose.bind(this);

        return (
            <>
                <Stack gap={2}>
                    <TentCategorizedList
                        tentSelected={tentSelected}
                        tents={[
                            { id: "bulletin", campsiteId, name: "Bulletin Board", type: "bulletin" }
                        ] as unknown[] as TentViewBasic[]}
                    />
                    <Divider />
                    {tentsUncategorized.length
                        ? <TentCategorizedList tents={tentsUncategorized} tentSelected={tentSelected} />
                        : null
                    }
                    {tentsCategorized.map((x) =>
                        <TentCategory key={x.category.id} category={x.category} onCreate={this.onCategoryTentCreate.bind(this, x.category.id)}>
                            <TentCategorizedList tents={x.tents} tentSelected={tentSelected} />
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
                        <Button startDecorator={<IconTent />} color="neutral" variant="outlined" sx={{ borderWidth: 3, borderStyle: "dashed" }} onClick={() => this.setState({ createModalOpen: true })}>
                            Create tent
                        </Button>
                    </Stack>
                </Stack>
                <Modal open={this.state.createModalOpen} onClose={onModalClose}>
                    <TentCreationModal
                        campsiteId={this.props.campsiteId}
                        bonfireId={this.props.bonfireId}
                        categories={this.sortedCategories}
                        onTentCreated={this.props.onTentCreated}
                        categoryId={this.state.modalCategoryId}
                        onClose={onModalClose}
                        lowestPriorityTent={lowestPriorityTent}
                        lowestPriorityCategory={lowestPriorityCategory}
                    />
                </Modal>
            </>
        );
    }
}