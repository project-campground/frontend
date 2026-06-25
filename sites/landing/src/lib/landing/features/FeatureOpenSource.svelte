<script lang="ts" module>
	function* chunkArray<T>(array: T[], amountPerArray: number): Generator<T[]> {
		const total = Math.ceil(array.length / amountPerArray);

		for (let i = 0; i < total; i++) {
			yield array.slice(i * amountPerArray, (i + 1) * amountPerArray);
		}
	}
</script>

<script lang="ts">
	import { Svg } from '@campground/ui';

	const text = [
		'#[get("...")]',
		'pub async fn get_tents(',
		"    auth: Auth<'_>",
		') -> Result<',
		'    Json<GetTentsOutput>',
		'> {',
		'    // ...',
		'    // ...',
		'    // ...',
		'    // ...',
		'}'
	].join('\n');

	let obfuscated = $state.raw(new Uint8Array(256));

	$effect(() => {
		const timeout = setInterval(
			() => (obfuscated = new Uint8Array(window.crypto.getRandomValues(obfuscated))),
			250
		);
		return () => (console.log('Clearing interval'), clearInterval(timeout));
	});
</script>

<div class="FeatureOpenSource container">
	<div class="FeatureOpenSource wrapper">
		<div class="FeatureOpenSource unobfuscated">
			<pre class="FeatureOpenSource code">{text}</pre>
		</div>
		<div class="FeatureOpenSource obfuscated">
			<span class="FeatureOpenSource code">
				{[
					...chunkArray(
						[...obfuscated].map((x) => x.toString(16).padStart(2, '0')),
						9
					)
				]
					.map((x) => x.join(' '))
					.join('\n')}
			</span>
		</div>
		<div class="FeatureOpenSource logo-wrapper">
			<div class="FeatureOpenSource logo">
				<Svg.Logo size={8} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	$mask-size-times: 5;
	$mask-size-percentage: $mask-size-times * 100%;
	@keyframes shine {
		0% {
			mask-position-x: -#{240px * $mask-size-times};
		}
		50% {
			mask-position-x: 0;
		}
		100% {
			mask-position-x: #{240px * $mask-size-times};
		}
	}

	.container {
		padding: 16px;
		width: 240px;
		height: 240px;
		color: var(--foreground-background);
		background-color: var(--background-subtle);
		border-radius: var(--radius-xl);
		font-weight: bold;
		font-size: 1em;
	}
	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		mask-image: linear-gradient(to bottom, white 0%, white 90%, transparent 100%);
	}
	.unobfuscated {
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		animation: shine 10s linear infinite;
		mask-image: linear-gradient(
			to bottom right,
			transparent 0%,
			transparent 40%,
			white 41%,
			white 60%,
			transparent 61%,
			transparent 100%
		);
		mask-position: 0 -240px;
		mask-size: $mask-size-percentage $mask-size-percentage;
	}
	.obfuscated {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 100%;
		height: 100%;
		color: var(--foreground-level7);
		animation: shine 10s linear infinite;
		mask-image: linear-gradient(
			to bottom right,
			white 0%,
			white 40%,
			transparent 41%,
			transparent 60%,
			white 61%,
			white 100%
		);
		mask-position: 0 -240px;
		mask-size: $mask-size-percentage $mask-size-percentage;
	}
	.logo-wrapper {
		position: absolute;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: var(--primary-500);
		z-index: 20;
	}
	.logo {
		position: relative;
		padding: 16px;
		&::after {
			position: absolute;
			content: '';
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: var(--radius-xl);
			z-index: -1;
			opacity: 85%;
			background-color: var(--background-content);
		}
	}
	.code {
		margin: 0;
		font-family: var(--font-monospace);
	}
</style>
