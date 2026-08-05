<script lang="ts">
	import type { PageProps } from './$types.js';

	const { params }: PageProps = $props();
</script>

<p>Example profile {params.id}</p>
