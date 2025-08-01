export interface JobItemData {
	company_logo_url: string;
	employment_type: string;
	id: string;
	job_description: string;
	location: string;
	package_per_annum: string;
	rating: string;
	title: string;
}

export interface JobType {
	employmentTypeId: string;
	label: string;
}

export interface ISalaryRange {
	salaryRangeId: string;
	label: string;
}
