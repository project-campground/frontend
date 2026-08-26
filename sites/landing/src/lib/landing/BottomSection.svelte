<script
	lang="ts"
	module
>
	const locale = defineMessages({
		'landing.try.title': {
			id: 'landing.try.title',
			defaultMessage: 'What are you waiting for?',
			description: 'Try Campground title at the bottom of landing page',
		},
		'landing.try.desc': {
			id: 'landing.try.desc',
			defaultMessage: 'You can use Campground right now!',
			description: 'Try Campground description at the bottom of landing page',
		},
		'landing.try': {
			id: 'landing.try',
			defaultMessage: 'Try Campground now!',
			description: 'Try Campground button at the bottom of landing page',
		},
	});
</script>

<script lang="ts">
	import { FormattedMessage } from '@campground/locale';
	import { Button, Para } from '@campground/ui';
	import { defineMessages } from '@formatjs/svelte-intl';
	import { IconArrowRight } from '@tabler/icons-svelte';
</script>

<section class="container">
	<div
		class="background"
		aria-hidden="true"
	></div>
	<div class="content">
		<div class="motto">
			<Para level="h1">
				<FormattedMessage {...locale['landing.try.title']} />
			</Para>
			<Para level="h4">
				<FormattedMessage {...locale['landing.try.desc']} />
			</Para>
		</div>
		<div class="buttons">
			<a
				href="#try-campground"
				class="button-link"
			>
				<Button
					variant="soft"
					color="primary"
				>
					<FormattedMessage {...locale['landing.try']} />
					<IconArrowRight />
				</Button>
			</a>
		</div>
	</div>
</section>

<style lang="scss">
	@use '@campground/ui' as *;

	.container {
		position: relative;
		z-index: 2;
		padding: 25px * 8 20 * 8px;
		overflow: hidden;
		@include tablet-down {
			padding: 25px * 8 var(--Layout-paddingX);
		}
	}
	.background {
		position: absolute;
		top: 25px;
		left: -10px;
		right: -10px;
		bottom: 25px;
		z-index: -1;
		// transform: rotate(1.5deg);
		background: linear-gradient(90deg, var(--primary-glowFirst), var(--primary-glowSecond));
		mask: radial-gradient(50% 50% at center, white 95.5%, transparent 96%);
		mask-size: 400% 100%;
		mask-position: -150vw;
		mask-repeat: no-repeat;
		&::before {
			position: absolute;
			content: '';
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background: linear-gradient(0deg, var(--info-glowFirst), transparent, var(--warning-glowFirst));
			z-index: 2;
			opacity: 6.25%;
		}
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		z-index: 6;
	}
	.motto {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.buttons {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 8px;
	}
	.button-link {
		text-decoration: none;
		& > :global(button[data-variant='soft'][data-color='primary']) {
			background-color: rgba(255, 255, 255, 0.75);
			&:not(:disabled):hover {
				background-color: rgba(255, 255, 255, 0.85);
			}
			&:not(:disabled):hover:active,
			&:not(:disabled):active {
				background-color: rgba(255, 255, 255, 0.5);
			}
		}
	}
</style>
