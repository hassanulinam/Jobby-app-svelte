<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getJwtToken, setJwtToken } from '../../utils/storageUtils';

	let username = $state('');
	let password = $state('');

	let submitErrMsg = $state('');
	let apiStatus = $state(0);

	onMount(() => {
		const jwt_token = getJwtToken();
		if (jwt_token) {
			goto('/');
		}
	});

	const submitForm = async (event: SubmitEvent) => {
		event.preventDefault();
		const userDetails = { username, password };
		const URL = 'https://apis.ccbp.in/login';
		const options = {
			method: 'POST',
			body: JSON.stringify(userDetails)
		};
		apiStatus = 100;
		const response = await fetch(URL, options);
		const data = await response.json();
		if (response.ok) {
			apiStatus = 200;
			setJwtToken(data.jwt_token);
			goto('/');
		} else {
			apiStatus = 400;
			let { error_msg } = data;
			error_msg = error_msg.replace('user', 'User');
			error_msg = error_msg.replace('pass', 'Pass');
			submitErrMsg = `*${error_msg}`;
		}
	};
</script>

<div class="login-route-container">
	<form class="login-form-container" onsubmit={submitForm}>
		<img
			alt="website logo"
			src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
			class="login-website-logo"
		/>
		<label for="usernameInput" class="login-form-label"> Username </label>
		<input id="usernameInput" bind:value={username} class="input-field" placeholder="Username" />
		<label for="passwordInput" class="login-form-label"> Password </label>
		<input
			id="passwordInput"
			type="password"
			bind:value={password}
			class="input-field"
			placeholder="Password"
		/>
		<button type="submit" class="login-btn">
			{apiStatus == 100 ? '....' : 'Login'}
		</button>
		<p class="error-message">{submitErrMsg}</p>
	</form>
</div>

<style>
	.login-route-container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #121212;
	}

	.login-form-container {
		display: flex;
		flex-direction: column;
		padding: 50px;
		width: 100%;
		max-width: 550px;
		background-color: #272727;
		border-radius: 10px;
		color: #f8fafc;
	}

	.login-website-logo {
		align-self: center;
		display: flex;
		align-items: center;
		margin-bottom: 80px;
	}

	.input-field {
		padding: 10px;
		font-size: 18px;
		margin-top: 5px;
		margin-left: 5px;
		border: 1px solid gray;
		border-radius: 5px;
		background-color: transparent;
		color: white;
	}

	.login-btn {
		padding: 10px;
		font-size: 17px;
		background-color: #6366f1;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 8px;
		margin-left: 5px;
		margin-top: 32px;
	}

	.error-message {
		margin: 5px;
		color: #ff0b37;
	}

	.website-logo {
		align-self: center;
		height: 50px;
		margin-bottom: 30px;
	}

	.login-form-label {
		margin-top: 32px;
	}
</style>
