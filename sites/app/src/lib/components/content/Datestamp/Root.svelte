<script
	lang="ts"
	module
>
	const datestampFormatByType = defineMessages({
		ago: {
			id: 'app.time.ago',
			defaultMessage: '{timestamp} ago',
			description: "When something happened 'ago'",
		},
		now: {
			id: 'app.time.now',
			defaultMessage: 'Just now',
			description: 'When something happened just now (less than a minute ago)',
		},
		in: {
			id: 'app.time.in',
			defaultMessage: 'In {timestamp}',
			description: 'When something will happen in specific time',
		},
		none: { id: 'app.time.none', defaultMessage: '{timestamp}', description: 'Unformatted timestamp' },
	});
	const timeUnits: Record<
		DatestampUnit,
		{ id: string; defaultMessage: string; description: string }
	> = {
		y: defineMessage({
			id: 'app.time.years',
			defaultMessage: '{time} years',
			description: 'Time in years',
		}),
		mon: defineMessage({
			id: 'app.time.months',
			defaultMessage: '{time} months',
			description: 'Time in months',
		}),
		w: defineMessage({
			id: 'app.time.weeks',
			defaultMessage: '{time} weeks',
			description: 'Time in weeks',
		}),
		d: defineMessage({
			id: 'app.time.days',
			defaultMessage: '{time} days',
			description: 'Time in days',
		}),
		h: defineMessage({
			id: 'app.time.hours',
			defaultMessage: '{time} hours',
			description: 'Time in hours',
		}),
		min: defineMessage({
			id: 'app.time.minutes',
			defaultMessage: '{time} minutes',
			description: 'Time in minutes',
		}),
		s: defineMessage({
			id: 'app.time.seconds',
			defaultMessage: '{time} seconds',
			description: 'Time in seconds',
		}),
		ms: defineMessage({
			id: 'app.time.milliseconds',
			defaultMessage: '{time} milliseconds',
			description: 'Time in milliseconds',
		}),
	};
</script>

<script lang="ts">
	import { FormattedMessage, getLocaleContext } from '@campground/locale';

	import { getMenuPortal, tooltip, MenuPortalInstance, Tooltip } from '@campground/ui';
	import { defineMessage, defineMessages } from '@formatjs/svelte-intl';
	import { SvelteDate } from 'svelte/reactivity';
	import type { DatestampProps, DatestampUnit } from './props.ts';
	import { getUnitAndValue } from './values.ts';

	const { date, when, long }: DatestampProps = $props();

	const menuPortal = getMenuPortal();
	const dateUsed: Date = $derived(typeof date === 'string' ? new Date(date) : date);
	const dateNow = new SvelteDate();
	const delta = $derived(dateNow.getTime() - dateUsed.getTime());
	const dateType: 'ago' | 'now' | 'in' | 'none' = $derived(
		when ?
			delta < -1000 ? 'in'
			: delta > 1000 ? 'ago'
			: 'now'
		:	'none',
	);
	const intl = getLocaleContext();
	const time = $derived(getUnitAndValue(Math.abs(delta)));
</script>

{#snippet timeDisplay()}
    {const timeFormatted = $derived($intl.formatMessage({ ...timeUnits[time[1]] }, { time: Math.round(time[0]) }))}
	<FormattedMessage
		{...datestampFormatByType[dateType]}
		values={{ timestamp: timeFormatted }}
	/>
{/snippet}
{#snippet dateDisplay()}
	{dateUsed.toLocaleString($intl.locale)}
{/snippet}

{#snippet dateTooltip(instance: MenuPortalInstance)}
	<Tooltip {instance}>
		{#if long}
			{@render timeDisplay()}
		{:else}
			{@render dateDisplay()}
		{/if}
	</Tooltip>
{/snippet}

<span {@attach tooltip(menuPortal, dateTooltip)}>
	{#if long}
		{@render dateDisplay()}
	{:else}
		{@render timeDisplay()}
	{/if}
</span>
