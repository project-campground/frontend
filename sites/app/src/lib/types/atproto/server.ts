export interface DescribedServer {
	did: string;
	availableUserDomains: string[];
	inviteCodeRequired: boolean;
	phoneVerificationRequired: boolean;
	links?: Partial<{ privacyPolicy: string; termsOfService: string }>;
}
