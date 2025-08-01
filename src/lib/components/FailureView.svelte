<script lang="ts">
	export let retryMethod: () => void;
</script>

<div class="failure-view-container">
	<img
		alt="failure view"
		src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
		class="failure-view-img"
	/>
	<h1 class="mt-3">Oops! Something Went Wrong</h1>
	<p class="mb-2">We cannot seem to find the page you are looking for</p>
	<button type="button" class="retry-btn" on:click={retryMethod}> Retry </button>
</div>

<style>
	.failure-view-container {
		background-color: #000000;
		text-align: center;
		color: white;
		width: 100%;
		font-size: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.failure-view-img {
		width: 80%;
	}

	.retry-btn {
		padding: 10px;
		font-size: 17px;
		background-color: #4f46e5;
		color: white;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	@media (min-width: 768px) {
		.failure-view-container {
			height: 50vh;
			line-height: 2;
		}
		.retry-btn {
			padding: 10px 30px 10px 30px;
		}

		.failure-view-img {
			width: 500px;
		}
	}
</style>
