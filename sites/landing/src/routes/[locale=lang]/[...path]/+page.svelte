<script lang="ts">
	import ErrorPage from "$lib/layout/ErrorPage.svelte";
	import type { PageProps } from "./$types";

    const { params }: PageProps = $props();
</script>

<ErrorPage status={404}>
    {#snippet title()}
        Not found
    {/snippet}
    Page '{params.path}' not found.
</ErrorPage>