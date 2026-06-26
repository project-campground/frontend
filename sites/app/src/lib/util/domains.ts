import { defaultBackendDomain } from 'api.config';

export const getDomainAndId = (value: string): string[] => {
	const splitValue = value.split('@');

	return splitValue.length > 1 ? splitValue : [splitValue[0], defaultBackendDomain];
};
export const withDefaultDomain = (domain: string, id: string) =>
	domain === defaultBackendDomain ? id : `${id}@${domain}`;
export const getCampsiteRoute = (domain: string, campsite: string, route: string): string =>
	`/c/${withDefaultDomain(domain, campsite)}/${route}`;
