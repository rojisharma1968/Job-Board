
import { useState, useEffect, useMemo } from "react";
import { Job, JobFilter } from "@/types";
import jobsData from "@/data/jobs.json";

export const useJobs = (filter?: JobFilter) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  
  // Extract unique locations from job data
  const uniqueLocations = useMemo(() => {
    const locations = jobsData.map(job => job.location);
    return ["All Locations", ...Array.from(new Set(locations))];
  }, []);
  
  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    
    const timer = setTimeout(() => {
      let filteredJobs = [...jobsData];
      
      if (filter) {
        if (filter.search) {
          const searchTerm = filter.search.toLowerCase();
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) || 
            job.company.name.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filter.location && filter.location !== "All Locations") {
          filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(filter.location!.toLowerCase())
          );
        }
        
        if (filter.category) {
          filteredJobs = filteredJobs.filter(job => 
            job.category === filter.category
          );
        }
        
        if (filter.employmentType) {
          filteredJobs = filteredJobs.filter(job => 
            job.employment_type === filter.employmentType
          );
        }
        
        if (filter.experienceLevel) {
          filteredJobs = filteredJobs.filter(job => 
            job.experience_level === filter.experienceLevel
          );
        }
        
        if (filter.remote) {
          filteredJobs = filteredJobs.filter(job => 
            job.remote === true
          );
        }
      }
      
      setJobs(filteredJobs);
      setLoading(false);
    }, 800); // Simulate loading delay
    
    return () => clearTimeout(timer);
  }, [filter]);
  
  return { jobs, loading, uniqueLocations };
};

export const useJob = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<Job | null>(null);
  
  useEffect(() => {
    setLoading(true);
    
    const timer = setTimeout(() => {
      const foundJob = jobsData.find(job => job.id === id) || null;
      setJob(foundJob);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  return { job, loading };
};
