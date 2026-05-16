<script lang="ts">
	import { createIntersectionObservable, Group, Para } from "@campground/ui";
	import type { Snippet } from "svelte";

    const { id, subtitle, title, children }: { id: string; subtitle: Snippet; title: string; children: Snippet; } = $props();
</script>

<section class="FeatureItem container" {...createIntersectionObservable(id)}>
    <Para level="sub0" class="FeatureItem subtitle">
        <Group alignVertically="center">
            {@render subtitle()}
        </Group>
    </Para>
    <Para level="h1" class="FeatureItem title" tMargin="md" bMargin="sm" letterSpacing={2}>
        {title}
    </Para>
    <Para class="FeatureItem description">
        {@render children()}
    </Para>
</section>

<style lang="scss">
    .FeatureItem.container {
        height: max(calc(100vh - 128px), 512px);
    }
</style>