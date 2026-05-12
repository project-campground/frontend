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
	import { FormattedMessage, FormattedMessageGlobal } from "@campground/locale";

    import { Button, Para } from "@campground/ui";
	import { defineMessages } from "@formatjs/svelte-intl";
	import { IconBrandDebian } from "@tabler/icons-svelte";
</script>

<div class="Index container">
    <section class="Index initial">
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
</div>

<style lang="scss">
    .Index {
        &.container {
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
            gap: 16px;
        }
        &.buttons {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 12px;
        }
        &.buttons > a {
            display: inline-flex;
            text-decoration: none;
        }
    }
</style>