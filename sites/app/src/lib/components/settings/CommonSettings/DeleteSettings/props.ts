export interface PageProps {
	name: string;
	accusative: string;
	requiresConfirmation?: boolean;
	onDelete: () => unknown;
}
