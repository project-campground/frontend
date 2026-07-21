import type { TentViewBasic, TentViewDetailed } from 'campground/tent.js';
import { createContext, useContext } from 'react';
import type { CampsiteViewDetailed } from 'campground/campsites.js';
import { ContextBase } from '~/context/session/base';
import type { ContextSuite } from '~/context/context-suite';
import type PermissionsManager from '~/context/permissions/PermissionsManager';
import type HTTPBackendClient from '~/api/http/HTTPBackendClient';

export class CurrentTentContext extends ContextBase<TentViewBasic> {}

export const TentContext = createContext<CurrentTentContext>(null!);

export const useCampsite = () => useContext(CampsiteContext).campsite;
export const useCampsiteContext = () => useContext(CampsiteContext);
export interface CampsiteContext extends ContextSuite {
	api: HTTPBackendClient;
	permissions: PermissionsManager;
	campsite: CampsiteViewDetailed;
	updateCampsite: (update: Partial<CampsiteViewDetailed>) => unknown;
}
export const CampsiteContext = createContext<CampsiteContext>(null!);
