import type { ComponentColor } from '@campground/ui';
import config from '../../../config.json' with { type: 'json' };

interface KnownPds {
	url: string;
	name?: string;
	color?: ComponentColor;
}
export const defaultPds = config.defaultPds;
export const knownPds = config.knownPds as KnownPds[];
export const defaultAppview = config.defaultAppview;
export const defaultXrpcPrefix = `/xrpc/`;
