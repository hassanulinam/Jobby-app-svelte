<script lang="ts">
	import { onMount } from 'svelte';
	import { getJwtToken } from '../../utils/storageUtils';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let isLoading = true;
	let isAuthenticated = false;

	onMount(() => {
		const token = getJwtToken();

		if (!token) {
			goto('/login');
		} else {
			isAuthenticated = true;
		}
		isLoading = false;
	});
</script>

{#if isLoading}
	<p in:fly>...Loading...</p>
{:else if isAuthenticated}
	<slot />
{/if}
