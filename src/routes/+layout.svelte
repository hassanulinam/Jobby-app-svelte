<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import AppHeader from '../components/AppHeader.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AppHeader></AppHeader>

{@render children?.()}
