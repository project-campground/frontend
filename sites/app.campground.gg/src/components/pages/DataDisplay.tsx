import React, { type ReactNode } from "react";
import DataTable, { type DataTableProps } from "./DataTable";
import { Box, Button, ButtonGroup, Dropdown, IconButton, Input, ListItemContent, ListItemDecorator, Menu, MenuButton, MenuItem, Skeleton, Stack, styled, Typography, type ColorPaletteProp, type VariantProp } from "@mui/joy";
import { Group, loremIpsum } from "campground-ui";
import { IconAdjustmentsFilled, IconCaretLeftFilled, IconCaretRightFilled, IconDots, IconSearch } from "@tabler/icons-react";
import type { HttpResponseWithContent } from "~/api/http/HTTPResponse";
import type { TypeToPayload } from "types/ws";
import { ContextSuiteContext, type ContextSuite } from "~/context/context-suite";
import type { WSSubscription } from "~/api/WSClient";
import type { DataCardStackProps } from "./DataCardStack";
import DataCardStack from "./DataCardStack";

type Props<T> = Omit<DataTableProps<T>, "values" | "selected"> & Omit<DataCardStackProps<T>, "values" | "selected"> & {
    title: string;
    itemsPerPage: number;
    maxItems: number | null;
    individuallyManaged?: boolean;
    fetch: (offset: number, limit: number) => Promise<HttpResponseWithContent<T[]>>;
    menu?: Array<{
        startDecorator?: ReactNode[] | ReactNode;
        content: ReactNode[] | ReactNode;
        color?: ColorPaletteProp;
        variant?: VariantProp;
        endDecorator?: ReactNode[] | ReactNode;
        onClick: (selectedValues: T[]) => unknown;
    }>;
    updateItems?: <TEvent extends keyof TypeToPayload>(items: T[], type: TEvent, payload: TypeToPayload[TEvent]) => boolean;
};
type State<T> = {
    page: number;
    items: T[];
    itemsSelected: T[];
};
const SmallScreens = styled(`div`, {
    name: "DataDisplay",
    slot: "small",
})(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("lg")]: {
        display: "block",
    },
}))
const MediumScreens = styled(`div`, {
    name: "DataDisplay",
    slot: "medium",
})(({ theme }) => ({
    display: "none",
    [theme.breakpoints.up("lg")]: {
        display: "block",
    },
}))

export default class DataDisplay<T> extends React.Component<Props<T>, State<T>> {
    static contextType?: React.Context<ContextSuite> | undefined = ContextSuiteContext;
    declare context: React.ContextType<typeof ContextSuiteContext>;
    public state: State<T> = {
        page: 0,
        items: [],
        itemsSelected: [],
    };
    private _maxPage: number | null = null;
    private _init: boolean = false;
    private _lock: boolean = true;
    private _wsSubscription: WSSubscription | null = null;

    constructor(props: Props<T>, context: State<T>) {
        super(props, context);

        this._maxPage = this.props.maxItems !== null ? Math.ceil(this.props.maxItems / this.props.itemsPerPage) : null;
    }

    public async componentDidMount(): Promise<void> {
        if (this._init)
            return;

        this._init = false;

        if (this.props.updateItems)
            this.subscribeToWs();

        return this.fetchData();
    }

    public async componentDidUpdate(_prevProps: Readonly<Props<T>>, prevState: Readonly<State<T>>, _snapshot?: any): Promise<boolean | void> {
        if (prevState.page === this.state.page || this._lock)
            return;

        this._lock = true;

        return this.fetchData();
    }
    public componentWillUnmount(): void {
        if (this._wsSubscription)
            this.context
                .session
                .ws
                .unsubscribe(this._wsSubscription);
    }

    private subscribeToWs() {
        const { session } = this.context;

        this._wsSubscription = session.ws
            .subscribe(ws =>
                ws.op === 1 && this.props.updateItems?.(this.state.items, ws.t, ws.payload) && this.setState({})
            );
    }

    private async fetchData() {
        const { floaters } = this.context;

        this.props.fetch(this.state.page * this.props.itemsPerPage, this.props.itemsPerPage)
            .then((resp) => {
                if (!resp.ok)
                    return floaters.notifyApiError(resp);

                this._lock = false;
                return this.setState({ items: resp.content });
            });
    }

    private _onSelectBind = this.onSelect.bind(this);
    private onSelect(itemSelected: T) {
        this.setState({
            itemsSelected:
            this.state.itemsSelected.includes(itemSelected)
            ? this.state.itemsSelected.filter((x) => x !== itemSelected)
            : (this.state.itemsSelected.push(itemSelected), this.state.itemsSelected)
        });
    }
    private _onSelectAllBind = this.onSelectAll.bind(this);
    private onSelectAll() {
        this.setState({
            itemsSelected:
                this.state.itemsSelected.length === this.state.items.length
                ? []
                : [...this.state.items]
        });
    }

    render() {
        const { title, columns, itemsPerPage, maxItems, individuallyManaged, menu } = this.props;
        const { page, items, itemsSelected } = this.state;
        const maxPage = this._maxPage;

        return (
            <Stack sx={{ px: 2, py: 2 }} gap={1}>
                <Group alignItems="center">
                    {menu && <Box sx={{ transition: "width 0.3s, opacity 0.3s", opacity: itemsSelected.length && 1, overflow: "hidden", width: itemsSelected.length && 48 }}>
                        <Dropdown>
                            <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "outlined", color: "neutral" } }}>
                                <IconDots />
                            </MenuButton>
                            <Menu variant="soft">
                                {menu.map((x, i) =>
                                    <MenuItem key={i} color={x.color} variant={x.variant} onClick={() => x.onClick(itemsSelected)}>
                                        {x.startDecorator && <ListItemDecorator>
                                            {x.startDecorator}
                                        </ListItemDecorator>}
                                        <ListItemContent>
                                            {x.content}
                                        </ListItemContent>
                                        {x.endDecorator && <ListItemDecorator>
                                            {x.endDecorator}
                                        </ListItemDecorator>}
                                    </MenuItem>
                                )}
                            </Menu>
                        </Dropdown>
                    </Box>}
                    <Typography flex={1} sx={{ display: { xs: "none", lg: "block" } }}>
                        <Skeleton loading={this._lock}>
                            {itemsSelected.length || (maxItems ?? items.length)} {title} {itemsSelected.length ? "selected" : ""}
                        </Skeleton>
                    </Typography>
                    <Group gap={1} sx={{ flex: { xs: 1, lg: 0 } }}>
                        <Input
                            variant="outlined"
                            startDecorator={<IconSearch />}
                            placeholder={`Search ${title}`}
                            sx={{ flex: 1 }}
                        />
                        <IconButton variant="outlined" color="neutral">
                            <IconAdjustmentsFilled />
                        </IconButton>
                    </Group>
                </Group>
                {
                    this._lock
                    ? <>
                        <SmallScreens>
                            <DataCardStack
                                unselectable={individuallyManaged}
                                values={Array(10).fill({})}
                                selected={[]}
                                HeaderComponent={SkeletonComponent}
                            />
                        </SmallScreens>
                        <MediumScreens>
                            <DataTable
                                unselectable={individuallyManaged}
                                values={Array(10).fill({})}
                                columns={columns.map((col) => ({
                                    ...col,
                                    name: <Typography>
                                        <Skeleton loading>
                                            {col.name}
                                        </Skeleton>
                                    </Typography>,
                                    Component: SkeletonComponent,
                                }))}
                                selected={[]}
                            />
                        </MediumScreens>
                    </>
                    : <>
                        <SmallScreens>
                            <DataCardStack
                                unselectable={individuallyManaged}
                                values={items}
                                selected={this.state.itemsSelected}
                                HeaderComponent={this.props.HeaderComponent}
                                Component={this.props.Component}
                                onSelect={this._onSelectBind}
                                onSelectAll={this._onSelectAllBind}
                            />
                        </SmallScreens>
                        <MediumScreens>
                            <DataTable
                                unselectable={individuallyManaged}
                                values={items}
                                columns={columns}
                                selected={this.state.itemsSelected}
                                onSelect={this._onSelectBind}
                                onSelectAll={this._onSelectAllBind}
                            />
                        </MediumScreens>
                    </>
                }
                <Stack gap={1} alignItems="center">
                    <Typography>
                        <Skeleton loading={this._lock}>
                            Showing {items.length} {title} of {maxItems} total {"\u2014"} from {page * itemsPerPage + 1} to {page * itemsPerPage + items.length}
                        </Skeleton>
                    </Typography>
                    <ButtonGroup>
                        <Button onClick={() => this.setState({ page: page - 1 })} disabled={page === 0}>
                            <IconCaretLeftFilled />
                        </Button>
                        {page !== 0 && <Button onClick={() => this.setState({ page: 0 })}>
                            1
                        </Button>}
                        <Button disabled>
                            {page + 1}
                        </Button>
                        {maxPage !== null && maxPage > (page + 1) && <Button onClick={() => this.setState({ page: maxPage - 1 })}>
                            {maxPage}
                        </Button>}
                        <Button onClick={() => this.setState({ page: page + 1 })} disabled={(maxPage === null && items.length < itemsPerPage) || (maxPage !== null && (page + 1 === maxPage || maxPage < 2))}>
                            <IconCaretRightFilled />
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Stack>
        );
    }
}

function SkeletonComponent() {
    return (
        <Typography sx={{ display: "block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            <Skeleton loading>
                {loremIpsum.sm}
            </Skeleton>
        </Typography>
    )
}