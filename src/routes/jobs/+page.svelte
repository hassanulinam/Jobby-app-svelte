<script lang="ts">
	import { onMount } from 'svelte';
	import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
	import FailureView from '$lib/components/FailureView.svelte';
	import JobItem from '$lib/components/JobItem.svelte';
	import type { JobItemData } from '$lib/types';
	import { getJwtToken } from '../../utils/storageUtils';
	import { apiStatusConstants, employmentTypesList, salaryRangesList } from '$lib/appConstants';

	let apiStatus = $state(apiStatusConstants.initial);
	let jobsData: JobItemData[] = $state([]);
	let jobTypes: string[] = $state([]);
	let salaryRange = $state('');
	let searchKey = $state('');
	let profileFetchStatus = $state(apiStatusConstants.initial);
	let profileData: any = $state({});
	let accessToken = getJwtToken();

	const fetchOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	};

	const getProfileData = async () => {
		profileFetchStatus = apiStatusConstants.inProgress;
		const response = await fetch('https://apis.ccbp.in/profile', fetchOptions);
		if (response.ok) {
			const data = await response.json();
			profileData = {
				name: data.profile_details.name,
				profileImageUrl: data.profile_details.profile_image_url,
				shortBio: data.profile_details.short_bio
			};
			profileFetchStatus = apiStatusConstants.success;
		} else {
			profileFetchStatus = apiStatusConstants.failure;
		}
	};

	const getJobsData = async () => {
		apiStatus = apiStatusConstants.inProgress;
		const queryParams = [
			`employment_type=${jobTypes.join(',')}`,
			`minimum_package=${salaryRange}`,
			`search=${searchKey}`
		];
		const URL = `https://apis.ccbp.in/jobs?${queryParams.join('&')}`;
		const response = await fetch(URL, fetchOptions);
		if (response.ok) {
			const data = await response.json();
			jobsData = data.jobs;
			apiStatus = apiStatusConstants.success;
		} else {
			apiStatus = apiStatusConstants.failure;
		}
	};

	function toggleJobType(id: string) {
		if (jobTypes.includes(id)) {
			jobTypes = jobTypes.filter((jobId) => jobId !== id);
		} else {
			jobTypes = [...jobTypes, id];
		}
		getJobsData();
	}

	function updateSalaryRange(event: Event) {
		salaryRange = (event.target as HTMLInputElement).value;
		getJobsData();
	}

	function updateSearchKey(event: Event) {
		searchKey = (event.target as HTMLInputElement).value;
	}

	function triggerSearch() {
		getJobsData();
	}

	onMount(() => {
		getProfileData();
		getJobsData();
	});
</script>

<ProtectedRoute>
	<div class="jobs-route-container">
		<div class="jobs-route-contents">
			<div class="profile-and-filters-container mb-2">
				{#if profileFetchStatus === apiStatusConstants.success}
					<div class="profile-card-wrapper">
						<div class="profile-card-container">
							<img src={profileData.profileImageUrl} alt="profile" class="profile-img" />
							<h1 class="profile-heading">{profileData.name}</h1>
							<p class="profile-text">{profileData.shortBio}</p>
						</div>
					</div>
				{:else if profileFetchStatus === apiStatusConstants.failure}
					<div class="profile-card-wrapper">
						<button type="button" class="retry-btn" onclick={getProfileData}>Retry</button>
					</div>
				{:else if profileFetchStatus === apiStatusConstants.inProgress}
					<div class="profile-card-wrapper">
						<div class="loader-container">
							<!-- <Loader type="ThreeDots" color="#ffffff" height="80" width="80" /> -->
							<p class="loading-text">Loading...</p>
						</div>
					</div>
				{/if}

				<hr />

				<div class="jobs-filters-container">
					<h1 class="filters-heading">Type of Employment</h1>
					<ul>
						{#each employmentTypesList as item (item.employmentTypeId)}
							<li class="filter-input-container">
								<input
									type="checkbox"
									id={item.employmentTypeId}
									onchange={() => toggleJobType(item.employmentTypeId)}
								/>
								<label for={item.employmentTypeId}>{item.label}</label>
							</li>
						{/each}
					</ul>
				</div>

				<hr />

				<div class="salary-range-filters-container">
					<h1 class="filters-heading">Salary Range</h1>
					<ul>
						{#each salaryRangesList as item (item.salaryRangeId)}
							<li class="filter-input-container">
								<input
									type="radio"
									id={item.salaryRangeId}
									value={item.salaryRangeId}
									name="salaryRange"
									onchange={updateSalaryRange}
								/>
								<label for={item.salaryRangeId}>{item.label}</label>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="jobs-page-container">
				<div class="job-results-container">
					<div class="search-bar-container">
						<input type="search" bind:value={searchKey} placeholder="Search" class="search-input" />
						<button type="submit" class="search-btn" onclick={triggerSearch}> 🔍 </button>
					</div>

					{#if apiStatus === apiStatusConstants.inProgress}
						<div class="loader-view-wrapper">
							<div class="loader-container">
								<p class="loading-text">Loading...</p>
							</div>
						</div>
					{:else if apiStatus === apiStatusConstants.failure}
						<FailureView retryMethod={getJobsData} />
					{:else if apiStatus === apiStatusConstants.success}
						{#if jobsData.length > 0}
							<ul class="job-cards-container">
								{#each jobsData as item (item.id)}
									<JobItem details={item} />
								{/each}
							</ul>
						{:else}
							<div class="no-jobs-view-card">
								<img
									alt="no jobs"
									src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
									class="no-jobs-img"
								/>
								<h1>No Jobs Found</h1>
								<p>We could not find any Jobs. Try other filters.</p>
							</div>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>
</ProtectedRoute>

<style>
	.jobs-route-container {
		background-color: #000000;
		color: white;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.jobs-route-contents {
		display: flex;
		flex-direction: column;
		padding: 40px 5% 40px 5%;
		width: 100%;
	}

	.profile-and-filters-container {
		padding: 0;
		display: flex;
		flex-direction: column;
	}

	label {
		margin-left: 8px;
	}

	hr {
		border: 1px solid white;
		width: 100%;
		margin: 0px 0 10px 0;
	}

	.profile-card-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300px;
	}

	.profile-card-container {
		align-self: flex-start;
		background-image: url('https://assets.ccbp.in/frontend/react-js/profile-bg.png');
		background-size: cover;
		border-radius: 20px;
		padding: 20px;
		font-size: 16px;
		color: grey;
		margin-bottom: 30px;
		width: 100%;
		min-width: 300px;
	}

	.profile-heading {
		color: #6366f1;
		margin: 10px 0 10px 0;
	}

	.filters-heading {
		font-size: 20px;
		font-weight: 500;
	}

	.filter-input-container {
		margin: 15px 0;
		font-size: 16px;
	}

	.job-results-container {
		width: 100%;
		font-size: 16px;
		max-height: 90vh;
		overflow-y: auto;
	}

	.no-jobs-view-card {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.no-jobs-img {
		width: 200px;
	}

	.loader-view-wrapper {
		height: 120px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loader-container {
		align-self: center;
	}

	.search-bar-container {
		width: 100%;
		max-width: 500px;
		display: flex;
		justify-content: space-between;
		border: 2px solid gray;
		border-radius: 5px;
		margin-bottom: 40px;
		position: sticky;
		top: 0px;
		background-color: rgba(0, 0, 0, 0.9);
	}

	.search-input {
		padding: 5px 15px;
		font-size: 16px;
		background-color: transparent;
		color: white;
		border: none;
		outline: none;
		width: 400px;
	}

	.search-btn {
		border: none;
		background-color: rgba(200, 200, 200, 0.2);
		padding: 10px;
		width: 80px;
	}

	@media (min-width: 1000px) {
		.profile-card-container,
		.filter-input-container,
		.search-input,
		.job-results-container {
			font-size: 18px;
		}

		.filters-heading {
			font-size: 22px;
		}

		.jobs-route-contents {
			width: 85%;
			flex-direction: row;
		}
		.profile-and-filters-container {
			margin-right: 30px;
		}

		.job-results-container {
			margin-top: 20px;
			padding-left: 20px;
		}
		.loader-view-wrapper {
			height: 50vh;
		}

		.no-jobs-img {
			width: 500px;
		}
	}

	.loading-text {
		font-size: 32px;
		font-weight: 500;
		font-style: italic;
	}

	.job-cards-container {
		/* overflow: auto; */
		/* max-height: 90vh; */
	}
</style>
