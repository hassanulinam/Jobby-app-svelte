<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import FailureView from '$lib/components/FailureView.svelte';
	import { apiStatusConstants } from '$lib/appConstants';
	import { getJwtToken } from '../../../utils/storageUtils';
	import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';

	const jobId = page.params.jobId;
	let apiStatus = $state(apiStatusConstants.initial);
	let jobData: any = $state({});

	let accessToken: string | undefined;
	let fetchOptions: RequestInit;

	const getJobDetails = async () => {
		apiStatus = apiStatusConstants.inProgress;

		debugger;
		const URL = `https://apis.ccbp.in/jobs/${jobId}`;
		const response = await fetch(URL, fetchOptions);

		if (response.ok) {
			const data = await response.json();
			jobData = data;
			apiStatus = apiStatusConstants.success;
		} else {
			apiStatus = apiStatusConstants.failure;
		}
	};

	onMount(() => {
		accessToken = getJwtToken();
		fetchOptions = {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }
		};
		getJobDetails();
	});
</script>

<ProtectedRoute>
	<div class="job-details-route-container">
		<div class="job-details-card-wrapper">
			{#if apiStatus === apiStatusConstants.inProgress}
				<div class="loader-container">
					<!-- Replace with a native spinner if needed -->
					Loading...
				</div>
			{:else if apiStatus === apiStatusConstants.failure}
				<FailureView retryMethod={getJobDetails} />
			{:else if apiStatus === apiStatusConstants.success}
				{#if jobData.job_details}
					<ul>
						<li class="job-item-card-container mb-2">
							<div class="flex-row">
								<img
									alt="job details company logo"
									src={jobData.job_details.company_logo_url}
									class="company-logo"
								/>
								<div class="ml-1">
									<h1>{jobData.job_details.title}</h1>
									<div class="flex-row">
										<!-- <BsStarFill /> -->
										<p class="bold ml-1">{jobData.job_details.rating}</p>
									</div>
								</div>
							</div>

							<div class="flex-row justify-content-between mb-0 mt-3">
								<div class="flex-row">
									<div class="flex-row mr-4">
										<!-- <MdLocationOn /> -->
										<p class="ml-1">{jobData.job_details.location}</p>
									</div>
									<div class="flex-row">
										<!-- <BsBriefcaseFill /> -->
										<p class="ml-1">{jobData.job_details.employment_type}</p>
									</div>
								</div>
								<p class="job-title">{jobData.job_details.package_per_annum}</p>
							</div>

							<hr />

							<div class="job-desc mb-2">
								<h1 class="desc-heading">Description</h1>
								<p class="line-gap">{jobData.job_details.job_description}</p>
							</div>

							<a
								href={jobData.job_details.company_website_url}
								target="_blank"
								rel="noopener noreferrer">Visit</a
							>

							<h1>Skills</h1>
							<ul class="skill-cards-container mb-2">
								{#each jobData.job_details.skills as skill}
									<li class="skill-card flex-row" key={skill.name}>
										<img alt={skill.name} src={skill.image_url} class="skill-img" />
										<p class="ml-1">{skill.name}</p>
									</li>
								{/each}
							</ul>

							<div>
								<h1>Life at company</h1>
								<div class="life-at-company">
									<p>{jobData.job_details.life_at_company.description}</p>
									<img
										alt="life at company"
										src={jobData.job_details.life_at_company.image_url}
										class="ml-1"
									/>
								</div>
							</div>
						</li>

						<li>
							<h1 class="mt-3 mb-0">Similar Jobs</h1>
							<ul class="similar-job-items-container">
								{#each jobData.similar_jobs as item (item.id)}
									<li class="similar-job-item-card">
										<div class="flex-row mb-2">
											<img
												alt="similar job company logo"
												src={item.company_logo_url}
												class="company-logo-img"
											/>
											<div>
												<h1 class="job-title">{item.title}</h1>
												<div class="flex-row">
													<!-- <BsStarFill /> -->
													<p class="bold ml-1">{item.rating}</p>
												</div>
											</div>
										</div>

										<div class="job-desc mb-2">
											<h1 class="desc-heading">Description</h1>
											<p class="line-gap">{item.job_description}</p>
										</div>

										<div class="flex-row">
											<div class="flex-row mr-4">
												<!-- <MdLocationOn /> -->
												<p class="ml-1">{item.location}</p>
											</div>
											<div class="flex-row">
												<!-- <BsBriefcaseFill /> -->
												<p class="ml-1">{item.employment_type}</p>
											</div>
										</div>
									</li>
								{/each}
							</ul>
						</li>
					</ul>
				{/if}
			{/if}
		</div>
	</div>
</ProtectedRoute>

<style>
	@import './index.css';
</style>
