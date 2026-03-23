<script lang="ts">
	import { onMount } from 'svelte';
	import { getJwtToken } from '../../utils/storageUtils';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';

	let isLoading = true;
	let isAuthenticated = false;
	let needsRedirect = false;

	// Check authentication immediately when component is created
	const token = getJwtToken();

	if (!token) {
		// Set flag to redirect, don't redirect immediately as it might not work
		needsRedirect = true;
	} else {
		// Token exists, initialize component normally
		isAuthenticated = true;
		isLoading = false;
	}

	onMount(() => {
		// Perform redirect after component mounts if needed
		if (needsRedirect) {
			goto('/login');
		}
	});
</script>

{#if isLoading}
	<p in:fly>...Loading...</p>
{:else if isAuthenticated}
	<slot />
{/if}
