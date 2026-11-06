import { defineParams } from '@sveltejs/kit/params';

type Domain = `localhost:${number}` | `${string}.${string}`;

const matchDomain = (param: string): param is Domain => {
	return /^(?:localhost[:][0-9]{2,}|([A-Za-z0-9_+-]+[.])+([A-Za-z0-9_+-]{2,}))$/.test(param);
};

const matchTid = (param: string): param is string => {
	return /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/.test(param);
};

const matchCampsite = (param: string): param is `${string}@${Domain}` => {
	const [tid, domain, ...rest] = param.split('@');

	return !rest.length && matchTid(tid) && matchDomain(domain);
};

const plcPrefix = 'did:plc:';

const matchDidPlc = (param: string): param is `did:plc:${string}` => {
	return (
		param.startsWith(plcPrefix) // Taken from ATProto docs
		&& /^[a-zA-Z0-9]{10,30}$/.test(param.slice(plcPrefix.length))
	);
};

const matchUserHandle = (param: string): param is `@${string}` => {
	return (
		param.startsWith('@') // Taken from ATProto docs
		&& /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(
			param.slice(1),
		)
	);
};

const uuidSegmentLengths = [8, 4, 4, 4, 12];

// + 4 dashes
const uuidTotalLength = uuidSegmentLengths.reduce((a, b) => a + b, 0) + 4;

const matchUuid = (param: string): param is `${string}-${string}-${string}-${string}-${string}` => {
	return (
		param.length === uuidTotalLength
		&& /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(param)
	);
};
const matchInvite = (
	param: string,
): param is `${string}-${string}-${string}-${string}-${string}@${Domain}` => {
	const [id, domain, ...rest] = param.split('@');

	return !rest.length && matchUuid(id) && matchDomain(domain);
};

export const params = defineParams({
	campsite: (param) => (matchCampsite(param) ? param : undefined),
	invite: (param) => (matchInvite(param) ? param : undefined),
	didPlc: (param) => (matchDidPlc(param) ? param : undefined),
	tid: (param) => (matchTid(param) ? param : undefined),
	userHandle: (param) => (matchUserHandle(param) ? param : undefined),
	uuid: (param) => (matchUuid(param) ? param : undefined),
});
