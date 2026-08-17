import type { ComponentColor } from '@campground/ui';
import config from '../../../config.json' with { type: 'json' };

export type KnownPdsIcon = 'campground' | 'bluesky';
export interface KnownPds {
	url: string;
	icon?: KnownPdsIcon;
	name?: string;
	color?: ComponentColor;
}
export const defaultPds = config.defaultPds;
export const knownPds = config.knownPds as KnownPds[];
export const defaultAppview = config.defaultAppview;
export const defaultXrpcPrefix = `/xrpc/`;
export const defaultAvatar = `/DefaultAvatar0.png`;
