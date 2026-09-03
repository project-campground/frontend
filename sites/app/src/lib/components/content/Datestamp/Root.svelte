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
	import { getLocale } from '@campground/locale';

	import { getMenuPortal, tooltip, MenuPortalInstance, Tooltip } from '@campground/ui';
	import { defineMessage, defineMessages } from '@formatjs/svelte-intl';
	import { SvelteDate } from 'svelte/reactivity';
	import type { DatestampProps, DatestampUnit } from './props.ts';
	import { getUnitAndValue } from './values.ts';

	const { date, type }: DatestampProps = $props();

	const menuPortal = getMenuPortal();
	const dateUsed: Date = $derived(typeof date === 'string' ? new Date(date) : date);
	const locale = getLocale();
	const dateNow = new SvelteDate();

	function getWhenTypeTime() {
		const delta = dateNow.getTime() - dateUsed.getTime();
		const dateType: 'ago' | 'now' | 'in' =
			delta < -1000 ? 'in'
			: delta > 1000 ? 'ago'
			: 'now';
		const time = getUnitAndValue(Math.abs(delta));
		const timeFormatted = locale.formatMessage(
			{ ...timeUnits[time[1]] },
			{ time: Math.round(time[0]) },
		);

		return locale.formatMessage(datestampFormatByType[dateType], { timestamp: timeFormatted });
	}

	// Time
	const timeShown = $derived(
		!type || type === 'when' ?
			getWhenTypeTime()
		:	dateUsed.toLocaleTimeString(locale.id, { hour: '2-digit', minute: '2-digit' }),
	);
	const dateShown = $derived(dateUsed.toLocaleString(locale.id));
</script>

{#snippet dateTooltip(instance: MenuPortalInstance)}
	<Tooltip {instance}>
		{#if type === 'date-first'}
			{timeShown}
		{:else}
			{dateShown}
		{/if}
	</Tooltip>
{/snippet}

<span {@attach tooltip(menuPortal, dateTooltip)}>
	{#if type === 'date-first'}
		{dateShown}
	{:else}
		{timeShown}
	{/if}
</span>
