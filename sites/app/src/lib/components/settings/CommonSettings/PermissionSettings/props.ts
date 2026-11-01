import type { CampsitePermissionView } from '#lib/types/campground/permissions.js';

export type QueryProps = { tentId: string } | { categoryId: string } | { bonfireId: string };

export type PageProps = QueryProps;
