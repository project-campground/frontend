import type { IFormControl } from '#lib/FieldControl/index.ts';
import type { LocaleContext } from '@campground/locale';
import type { MessageDescriptor } from '@formatjs/svelte-intl';

export function fieldAssert<T>(
	value: boolean,
	control: IFormControl<T>,
	intl: LocaleContext,
	descriptor: MessageDescriptor,
	values?: Record<string, any>,
) {
	if (value) control.error = intl.formatMessage(descriptor, values);

	return value;
}
