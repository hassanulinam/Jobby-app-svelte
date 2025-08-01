<script lang="ts">
	import { goto } from '$app/navigation';
	import { getJwtToken } from '../utils/storageUtils';

	const token = getJwtToken();

	if (!token) {
		goto('/login');
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
