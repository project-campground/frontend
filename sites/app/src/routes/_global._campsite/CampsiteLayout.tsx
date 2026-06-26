import React, { type ContextType } from 'react';
// import type { CampsiteViewDetailed } from "types/campsites";
import TentSidebar, { TentSidebarSkeleton } from './TentSidebar';
import { CampsiteContext, CurrentTentContext, TentContext } from './context';
import type { CampsiteViewDetailed } from 'types/campground/campsites';
import type { BonfireViewBasic } from 'types/campground/bonfires';
import type { Session } from '~/context/session/types';
import type { HttpResponseError } from '~/api/http/HTTPResponse';
import { ContextSuiteContext } from '~/context/context-suite';
import type { NavigateFunction } from 'react-router';
import type { WSSubscription } from '~/api/WSClient';
import type { TypeToPayload } from 'types/ws';
import PermissionsManager from '~/context/permissions/PermissionsManager';
import { makeRoomForItems } from './sidebar-events';
import HTTPBackendClient from '~/api/http/HTTPBackendClient';
import { TentLayoutSkeleton } from '../_global._campsite.c.$campId.t.$tentId/TentLayout';

type Props = {
	backendDomain: string;
	campsiteId: string;
	navigate: NavigateFunction;
} & React.PropsWithChildren;

type State = {
	init: boolean;
	loading: boolean;
	campsite: CampsiteViewDetailed | null;
	err: HttpResponseError | null;
	bonfireSelected: string | null;
	tentSelected: string | null;
};

export default class CampsiteLayout extends React.Component<Props, State> {
	static contextType?: React.Context<any> | undefined = ContextSuiteContext;
	declare context: ContextType<typeof ContextSuiteContext>;

	private _currentTent: CurrentTentContext;
	private _permissionsManager: PermissionsManager = null!;
	private _apiClient: HTTPBackendClient;
	_updateCampsiteDataBind: (data: Partial<CampsiteViewDetailed>) => unknown;
	private _init: boolean = false;
	private _wsSubscription: WSSubscription | null = null;
	constructor(props: Props, context: any) {
		super(props, context);

		// tentSidebarOpen false by default, so it wouldn't be auto-open on mobile
		this.state = {
			err: null,
			campsite: null,
			init: false,
			loading: true,
			bonfireSelected: null,
			tentSelected: null,
		};

		this._apiClient = new HTTPBackendClient(this.context.session, this.props.backendDomain);
		this._currentTent = new CurrentTentContext(null);
		this._updateCampsiteDataBind = this.updateCampsiteData.bind(this);
		this._currentTent.subscribeToChanges((newValue) =>
			this.setState({
				bonfireSelected: newValue?.bonfireId ?? null,
				tentSelected: newValue?.id ?? null,
			}),
		);
	}

	async fetchCampsite() {
		return this._apiClient.campsites.get(this.props.campsiteId).then((resp) => {
			if (!resp.ok) return this.setState({ err: resp });
			this.sortCampsiteRoles(resp.content);
			this.sortCampsiteBonfires(resp.content);
			this._permissionsManager = new PermissionsManager(resp.content);
			return this.setState({ err: null, campsite: resp.content, init: true, loading: false });
		});
	}
	sortCampsiteRoles(campsite: Pick<CampsiteViewDetailed, 'roles'>) {
		return campsite.roles.sort((a, b) =>
			(a.flags & 1) == (b.flags & 1) ? a.position - b.position : a.flags,
		);
	}
	sortCampsiteBonfires(campsite: Pick<CampsiteViewDetailed, 'bonfires'>) {
		return campsite.bonfires.sort((a, b) => a.position - b.position);
	}
	async componentDidMount(): Promise<void> {
		if (this._init) return;
		this._init = true;
		this.setCampsiteForWebSocket();

		return this.fetchCampsite();
	}
	async componentDidUpdate(
		prevProps: Readonly<Props>,
		_prevState: Readonly<State>,
		_snapshot?: Session | undefined,
	): Promise<void> {
		console.log({ context: this.context, _snapshot });
		if (prevProps.campsiteId === this.props.campsiteId) return;
		else if (prevProps.backendDomain !== this.props.backendDomain)
			this._apiClient = new HTTPBackendClient(this.context.session, this.props.backendDomain);

		// To see campsite events
		this.setCampsiteForWebSocket();

		this.setState({ loading: true });

		return this.fetchCampsite();
	}
	componentWillUnmount(): void {
		this.context.session.ws.unsubscribe(this._wsSubscription!);
	}
	setCampsiteForWebSocket() {
		const ws = this.context.session.ws;
		ws.setCampsite(this.props.campsiteId);
		this._wsSubscription = ws.subscribe(
			(message) => message.op === 1 && this.onWsMessage(message.t, message.payload),
		);
		return ws;
	}
	onWsMessage<T extends keyof TypeToPayload>(type: T, payload: TypeToPayload[T]) {
		const bonfire = payload as BonfireViewBasic;

		switch (type) {
			case 'CampsiteLeft':
				if ((payload as { id: string }).id === this.props.campsiteId) this.props.navigate('/');
				return;
			case 'CampsiteUpdated':
				if ((payload as { id: string }).id !== this.props.campsiteId) return;
				this.setState({ campsite: Object.assign(this.state.campsite!, payload) });
				break;
			case 'BonfireCreated':
				this.setState({
					campsite: Object.assign(this.state.campsite!, {
						bonfires: [...this.state.campsite!.bonfires, bonfire],
					}),
				});
				return;
			// @ts-ignore
			case 'BonfireMoved':
				makeRoomForItems(
					bonfire,
					this.state.campsite!.bonfires.filter((x) => x.id !== bonfire.id),
				);
			case 'BonfireUpdated':
				const modifiedBonfire = this.state.campsite!.bonfires.findIndex((x) => x.id === bonfire.id);
				if (modifiedBonfire < 0) this.state.campsite!.bonfires.push(bonfire);
				else Object.assign(this.state.campsite!.bonfires[modifiedBonfire], bonfire);
				break;
			case 'BonfireDeleted':
				this.setState({
					campsite: Object.assign(this.state.campsite!, {
						bonfires: this.state.campsite!.bonfires.filter((x) => x.id !== bonfire.id),
					}),
				});
				return;
		}
		this.setState({});
	}
	updateCampsiteData(data: Partial<CampsiteViewDetailed>) {
		if (data.roles) this.sortCampsiteRoles(data as Pick<CampsiteViewDetailed, 'roles'>);

		this.setState({ campsite: Object.assign(this.state.campsite!, data) });
	}
	render(): React.ReactNode {
		const { children, navigate } = this.props;
		const { init, loading, bonfireSelected, tentSelected, campsite } = this.state;

		if (!init || loading)
			return (
				<>
					<TentSidebarSkeleton />
					<TentLayoutSkeleton />
				</>
			);

		return (
			<TentContext.Provider value={this._currentTent}>
				<CampsiteContext.Provider
					value={{
						...this.context,
						api: this._apiClient,
						permissions: this._permissionsManager,
						campsite: campsite!,
						updateCampsite: this._updateCampsiteDataBind,
					}}
				>
					<TentSidebar
						campsite={campsite!}
						bonfireSelected={bonfireSelected}
						tentSelected={tentSelected}
						navigate={navigate}
					/>
					{children}
				</CampsiteContext.Provider>
			</TentContext.Provider>
		);
	}
}
