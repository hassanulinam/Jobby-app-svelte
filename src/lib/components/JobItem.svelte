<script lang="ts">
	import type { JobItemData } from '$lib/types';

	export let details: JobItemData;
</script>

<li>
	<!-- Replace with <Link> from sveltekit if using SPA routing -->
	<a href={`/jobs/${details.id}`} class="job-item-card-link">
		<div class="job-item-card-container">
			<div class="flex-row">
				<img alt="company logo" src={details.company_logo_url} class="company-logo-img" />
				<div>
					<h1 class="job-title">{details.title}</h1>
					<div class="flex-row">
						<!-- <BsStarFill /> -->
						<span class="bold ml-1">{details.rating}</span>
					</div>
				</div>
			</div>

			<div class="flex-sm-col flex-row justify-content-between mb-0 mt-3">
				<div class="flex-row flex-sm-col">
					<div class="flex-row mr-4">
						<!-- <MdLocationOn /> -->
						<p class="ml-1">{details.location}</p>
					</div>
					<div class="flex-row">
						<!-- <BsBriefcaseFill /> -->
						<p class="ml-1">{details.employment_type}</p>
					</div>
				</div>
				<div>
					<p class="job-title">{details.package_per_annum}</p>
				</div>
			</div>

			<hr />
			<div class="job-desc">
				<h1 class="job-desc-heading">Description</h1>
				<p class="line-gap">{details.job_description}</p>
			</div>
		</div>
	</a>
</li>

<style>
	.job-item-card-container {
		background-color: rgba(200, 200, 200, 0.2);
		color: white;
		padding: 18px;
		width: 100%;
		border-radius: 12px;
		margin: 20px 0 20px 0;
		font-size: 16px;
		text-decoration: none;
		display: flex;
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.justify-content-between {
		justify-content: space-between;
	}

	.company-logo-img {
		height: 70px;
		margin-right: 15px;
	}

	.job-title {
		font-size: 20px;
		font-weight: 600;
		margin: 0;
	}

	.bold {
		font-weight: 600;
	}

	.job-desc-heading {
		font-size: 22px;
		font-weight: 600;
	}

	@media (min-width: 900px) {
		.job-item-card-container {
			padding: 25px;
			font-size: 18px;
		}

		.job-title {
			font-size: 24px;
		}
	}

	.line-gap {
		line-height: 1.3;
	}

	h1,
	p {
		margin: 10px 0 10px 0;
	}

	.ml-1 {
		margin-left: 10px;
	}

	.mr-4 {
		margin-right: 64px;
	}

	.mb-0 {
		margin-bottom: 0;
	}

	.mt-3 {
		margin-top: 48px;
	}

	.mb-2 {
		margin-bottom: 32px;
	}

	@media screen and (max-width: 767px) {
		.flex-sm-col {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
