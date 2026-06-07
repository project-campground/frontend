import type { FormContext, FormFields } from '$lib/Form/context.js';
import type { Snippet } from 'svelte';
import type { AriaAttributes } from 'svelte/elements';

export default interface FormReactiveProps extends AriaAttributes {
	render: Snippet<[FormFields, FormContext]>;
}
