<script>
	import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
</script>

<ProtectedRoute>
	<div class="home-container">
		<h1 class="home-heading">Find The Job That Fits Your Life</h1>
		<p class="home-text">
			Millions of people are searching for jobs, salary information, company reviews. Find the job
			that fits your abilities and potential.
		</p>
		<a href="/jobs">
			<button type="button" class="find-jobs-btn"> Find Jobs </button>
		</a>
	</div>
</ProtectedRoute>

<style>
	.home-container {
		padding: 5px 5% 5px 5%;
		width: 100%;
		height: calc(100% - 82px);
		color: #ffffff;
		background-image: url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png');
		background-size: contain;
	}

	.home-heading {
		margin-top: 40px;
		font-size: 32px;
		font-weight: 600;
	}

	.home-text {
		font-size: 18px;
		line-height: 2;
		margin-bottom: 30px;
	}

	.find-jobs-btn {
		padding: 15px 30px 15px 30px;
		margin-top: 20px;
		font-size: 16px;
		background-color: #6366f1;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 8px;
	}

	@media screen and (min-width: 768px) {
		.home-heading {
			max-width: 50%;
			margin: 70px 0 30px 0;
			font-size: 42px;
		}

		.home-text {
			max-width: 50%;
			font-size: 20px;
		}

		.find-jobs-btn {
			font-size: 18px;
		}
	}
</style>
