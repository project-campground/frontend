import React from "react";
import DataTable, { type DataTableProps } from "./DataTable";
import { Button, ButtonGroup, IconButton, Input, Skeleton, Stack, Typography } from "@mui/joy";
import { Group, loremIpsum } from "components";
import { IconAdjustmentsFilled, IconCaretLeftFilled, IconCaretRightFilled, IconSearch } from "@tabler/icons-react";
import type { RestResponseWithContent } from "api/RESTResponse";
import type { TypeToPayload } from "types/ws";
import { ContextSuiteContext, type ContextSuite } from "~/context/context-suite";
import type { WebSocketSubscription } from "api/WebSocketClient";

type Props<T> = Omit<DataTableProps<T>, "values"> & {
    title: string;
    itemsPerPage: number;
    maxItems: number | null;
    fetch: (offset: number, limit: number) => Promise<RestResponseWithContent<T[]>>;
    updateItems?: <TEvent extends keyof TypeToPayload>(items: T[], type: TEvent, payload: TypeToPayload[TEvent]) => boolean;
};
type State<T> = {
    page: number;
    items: T[];
};

export default class DataFetchTable<T> extends React.Component<Props<T>, State<T>> {
    static contextType?: React.Context<ContextSuite> | undefined = ContextSuiteContext;
    public state: State<T> = {
        page: 0,
        items: [],
    };
    private _maxPage: number | null = null;
    private _init: boolean = false;
    private _lock: boolean = true;
    private _wsSubscription: WebSocketSubscription | null = null;

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
            (this.context as ContextSuite).session.webSocket
                .unsubscribe(this._wsSubscription);
    }

    private subscribeToWs() {
        const { session } = this.context as ContextSuite;

        this._wsSubscription = session.webSocket
            .subscribe(ws =>
                ws.op === 1 && this.props.updateItems?.(this.state.items, ws.t, ws.payload) && this.setState({})
            );
    }

    private async fetchData() {
        const { floaters } = this.context as ContextSuite;

        this.props.fetch(this.state.page * this.props.itemsPerPage, this.props.itemsPerPage)
            .then((resp) => {
                if (!resp.ok)
                    return floaters.notifyApiError(resp);

                this._lock = false;
                return this.setState({ items: resp.content });
            });
    }

    render() {
        const { title, columns, itemsPerPage, maxItems } = this.props;
        const { page, items } = this.state;
        const maxPage = this._maxPage;

        return (
            <Stack sx={{ px: 2, py: 2 }} gap={1}>
                <Group gap={2} alignItems="center">
                    <Typography flex={1}>
                        <Skeleton loading={this._lock}>
                            {maxItems ?? "Unknown amount of"} {title}
                        </Skeleton>
                    </Typography>
                    <Group gap={1}>
                        <Input
                            variant="outlined"
                            startDecorator={<IconSearch />}
                            placeholder={`Search ${title}`}
                        />
                        <IconButton variant="outlined" color="neutral">
                            <IconAdjustmentsFilled />
                        </IconButton>
                    </Group>
                </Group>
                {
                    this._lock
                    ? <DataTable
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
                    />
                    : <DataTable
                        values={items}
                        columns={columns}
                    />
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