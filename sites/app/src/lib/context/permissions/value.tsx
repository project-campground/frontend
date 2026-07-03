import type {
	PermissionsDictionary,
	PermissionsStateDictionary,
} from '$lib/types/campground/permissions';
import type { GetTentsOutput } from '$lib/types/campground/tent';

export class CurrentTentListContext extends ContextBase<GetTentsOutput> {}
