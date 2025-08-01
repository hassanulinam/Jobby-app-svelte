<script lang="ts">
	import { goto } from '$app/navigation';
	import { removeJwtToken } from '../../utils/storageUtils';

	const logoutTheSession = (): void => {
		removeJwtToken();
		goto('/login');
	};
</script>

<div class="header-responsive-container">
	<ul class="header-container">
		<li>
			<a href="/">
				<img
					alt="website logo"
					src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
					class="website-logo"
				/>
			</a>
		</li>
		<li class="header-nav-item-container">
			<a href="/" class="nav-a-item">
				<p class="d-none d-md-inline mr-2">Home</p>
			</a>
			<a href="/jobs" class="nav-a-item">
				<p class="d-none d-md-inline">Jobs</p>
			</a>
			<button type="button" class="transparent-btn d-inline d-md-none" onclick={logoutTheSession}>
				🔏
			</button>
		</li>
		<li>
			<button type="button" class="logout-btn d-none d-md-inline" onclick={logoutTheSession}>
				Logout
			</button>
		</li>
	</ul>
</div>

<style>
	li {
		list-style-type: none;
	}
	.header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 5%;
	}

	.header-responsive-container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background-color: #272727;
	}

	.website-logo {
		align-self: center;
		height: 36px;
		margin: 0px;
	}

	.logout-btn {
		padding: 0 10px;
		font-size: 17px;
		background-color: #6366f1;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	a {
		color: white;
		font-size: 20px;
		text-decoration: none;
		margin: 0 15px;
	}

	.transparent-btn {
		border: none;
		background-color: transparent;
		padding: 0 15px;
	}

	.d-inline {
		display: inline;
	}

	.d-none {
		display: none;
	}

	.mr-2 {
		margin-right: 32px;
	}

	@media (min-width: 768px) {
		.header-container {
			width: 85%;
		}

		.website-logo {
			height: 45px;
			margin: 0px;
		}

		.logout-btn {
			padding: 10px 30px 10px 30px;
		}

		.d-md-inline {
			display: inline;
		}

		.d-md-none {
			display: none;
		}
	}
</style>
