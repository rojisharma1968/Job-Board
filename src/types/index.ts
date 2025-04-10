
export interface Job {
  id: string;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string;
  };
  location: string;
  description: string;
  employment_type: string;
  category: string;
  experience_level: string;
  salary_range: string;
  posted_date: string;
  skills: string[];
  remote: boolean;
  responsibilities: string[];
  requirements: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  cover_image: string;
  location: string;
  website: string;
  industry: string;
  founded: string;
  size: string;
  description: string;
  mission: string;
  values: string[];
  benefits: string[];
  jobs_count: number;
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  image: string;
  text: string;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface JobFilter {
  location?: string;
  category?: string;
  employmentType?: string;
  experienceLevel?: string;
  remote?: boolean;
  search?: string;
}
