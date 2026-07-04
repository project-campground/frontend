import { defaultAppview } from '../api/api.config.js';

const defaultDomain = defaultAppview.split('/')[2];

export const getDomainAndId = (value: string): string[] => {
	const splitValue = value.split('@');

	return splitValue.length > 1 ? splitValue : [splitValue[0], defaultDomain];
};
export const withDefaultDomain = (domain: string, id: string) =>
	domain === defaultAppview ? id : `${id}@${domain}`;
export const getCampsiteRoute = (domain: string, campsite: string, route: string): string =>
	`/c/${withDefaultDomain(domain, campsite)}/${route}`;
