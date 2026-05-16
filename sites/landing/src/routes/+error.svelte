<script lang="ts">
    import { page } from "$app/state";
	import { PagePlaceholderIcon, PagePlaceholder } from "@campground/ui";
</script>

<div class="ErrorPage">
    <PagePlaceholder icon={PagePlaceholderIcon.Error} status={page.status}>
        {#snippet title()}
        Error loading this page
        {/snippet}
        {page.error?.message}
    </PagePlaceholder>
</div>

<style lang="scss">
    .ErrorPage {
        padding: 128px 256px 256px 256px;
    }
</style>