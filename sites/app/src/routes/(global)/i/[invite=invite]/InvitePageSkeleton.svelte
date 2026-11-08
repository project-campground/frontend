<script lang="ts">
	import { CampsiteCard } from '#lib/components/pages/index.js';
	import { localeStrings } from '#lib/locale/index.js';
	import { LocaleMessage } from '@campground/locale';
	import { Button, Group, loremIpsum, Para, Skeleton, Stack } from '@campground/ui';
</script>

<Stack
	align="stretch"
	gap={0.5}
>
	<CampsiteCard.Skeleton
		size="lg"
		hideDescription
		hideName
	/>
	<Para
		mt="lg"
		level="sub0"
		textAlign="center"
	>
		<Skeleton>
			{loremIpsum.md}
		</Skeleton>
	</Para>
	<Para
		level="h2"
		textAlign="center"
	>
		<Skeleton>
			{loremIpsum.sm}
		</Skeleton>
	</Para>
	<Para textAlign="center">
		<Skeleton>
			{loremIpsum.md}
		</Skeleton>
	</Para>
	<Para
		level="sub0"
		textAlign="center"
		align="center"
	>
		<Skeleton>
			{loremIpsum.sm}
		</Skeleton>
	</Para>
</Stack>
<Group
	justify="center"
	align="center"
	gap={1}
>
	<Button
		color="neutral"
		variant="soft"
		size="lg"
		padding="double"
	>
		<Skeleton>
			<LocaleMessage {...localeStrings.common.accept} />
		</Skeleton>
	</Button>
	<Button
		color="neutral"
		variant="soft"
		size="lg"
		padding="double"
	>
		<Skeleton>
			<LocaleMessage {...localeStrings.common.deny} />
		</Skeleton>
	</Button>
</Group>
