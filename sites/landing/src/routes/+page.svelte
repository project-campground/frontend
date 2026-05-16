<script lang="ts" module>
    const locale = defineMessages({
        'landing.inBrowser': {
            id: 'landing.inBrowser',
            defaultMessage: 'Open in Browser',
            description: 'Open Campground in browser button'
        }
    });
</script>
<script lang="ts">
	import BottomSection from "$lib/landing/BottomSection.svelte";

	import FeatureItem from "$lib/landing/FeatureItem.svelte";

	import FeatureList from "$lib/landing/FeatureList.svelte";

	import { FormattedMessage, FormattedMessageGlobal } from "@campground/locale";

    import { Button, Para } from "@campground/ui";
	import { defineMessages } from "@formatjs/svelte-intl";
	import { IconBrandDebian, IconHash } from "@tabler/icons-svelte";
</script>

<div class="Index container">
    <div class="Index padded">
        <section class="Index initial" id="try-campground">
            <div class="Index initial-left">
                <div class="Index motto">
                    <Para level="h1" fontSize={3} letterSpacing={2.5}>
                        <FormattedMessageGlobal id="site.motto" />
                    </Para>
                    <Para level="paragraph" fontSize={1.25} letterSpacing={1} tMargin="md" align="justify">
                        <FormattedMessageGlobal id="site.desc" />
                    </Para>
                </div>
                <div class="Index buttons">
                    <a href="/download">
                        <Button size="lg">
                            <IconBrandDebian />
                            <FormattedMessageGlobal id="common.download" />
                            <span class="Index buttons-label">(Debian)</span>
                        </Button>
                    </a>
                    <a href="/app">
                        <Button size="lg" variant="outlined">
                            <FormattedMessage {...locale['landing.inBrowser']} />
                        </Button>
                    </a>
                </div>
            </div>
            <aside class="Index initial-right">
            </aside>
        </section>
        <FeatureList>
            {#snippet side(observedItem)}
                {observedItem}
            {/snippet}
            <FeatureItem id="abc" title="abc">
                {#snippet subtitle()}
                    <IconHash />
                    <span>
                        Bbbb
                    </span>
                {/snippet}
                Asdasdassdasd
            </FeatureItem>
            <FeatureItem id="123" title="123">
                {#snippet subtitle()}
                    <IconHash />
                    <span>
                        Bbbb
                    </span>
                {/snippet}
                Asdasdassdasd
            </FeatureItem>
            <FeatureItem id="aaa" title="aaa">
                {#snippet subtitle()}
                    <IconHash />
                    <span>
                        Bbbb
                    </span>
                {/snippet}
                Asdasdassdasd
            </FeatureItem>
            <FeatureItem id="bbb" title="bbb">
                {#snippet subtitle()}
                    <IconHash />
                    <span>
                        Bbbb
                    </span>
                {/snippet}
                Asdasdassdasd
            </FeatureItem>
        </FeatureList>
    </div>
    <BottomSection />
</div>

<style lang="scss">
    .Index {
        &.padded {
            padding: 0 var(--Layout-paddingX);
        }
        &.initial {
            height: calc(100vh - 72px);
            display: grid;
            grid-template-columns: 5fr 4fr;
        }
        &.initial-left {
            display: flex;
            flex-direction: column;
            
            padding-top: 128px;
            gap: 24px;
        }
        &.buttons {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
        }
        &.buttons-label {
            padding: 2px 4px;
            border-radius: var(--radius-sm);
            background-color: var(--palette-primary-950);
            color: var(--palette-primary-secondary);
            font-weight: bold;
        }
        &.buttons > a {
            display: inline-flex;
            text-decoration: none;
        }
    }
</style>