import type { ComponentColor } from '@campground/ui';
import config from '../../../config.json' with { type: 'json' };

export type KnownInstanceIcon = 'campground' | 'bluesky';
export interface KnownInstance {
	url: string;
	icon?: KnownInstanceIcon;
	name?: string;
	color?: ComponentColor;
}
export const knownPds = config.knownPds as KnownInstance[];
export const knownAppviews = config.knownAppviews as KnownInstance[];
export const defaultPds = knownPds[0];
export const defaultAppview = knownAppviews[0];
export const defaultXrpcPrefix = `/xrpc/`;
export const defaultAvatar = `/DefaultAvatar0.png`;
