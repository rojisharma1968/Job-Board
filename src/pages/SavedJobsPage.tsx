
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Heart } from "lucide-react";
import JobCard from "@/components/ui/JobCard";
import JobCardSkeleton from "@/components/ui/JobCardSkeleton";
import MainLayout from "@/components/layout/MainLayout";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Job } from "@/types";
import jobsData from "@/data/jobs.json";

const SavedJobsPage = () => {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>("savedJobs", []);
  const [savedJobsData, setSavedJobsData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    
    const timer = setTimeout(() => {
      // Filter jobs data to get only saved jobs
      const filteredJobs = jobsData.filter(job => savedJobs.includes(job.id));
      setSavedJobsData(filteredJobs);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [savedJobs]);
  
  const clearAllSavedJobs = () => {
    setSavedJobs([]);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
              <p className="text-gray-600">Jobs you've saved for later</p>
            </div>
            {savedJobs.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearAllSavedJobs}
                className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Clear All
              </Button>
            )}
          </div>
          
          {loading ? (
            // Skeleton loaders
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="mb-6">
                <JobCardSkeleton />
              </div>
            ))
          ) : savedJobsData.length > 0 ? (
            <div className="space-y-6">
              {savedJobsData.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <div className="flex justify-center">
                <Heart className="h-12 w-12 text-gray-400 mb-4" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No Saved Jobs</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't saved any jobs yet. Browse jobs and click the heart icon to save jobs for later.
              </p>
              <Link to="/jobs">
                <Button className="bg-job-primary hover:bg-job-dark">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Browse Jobs
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SavedJobsPage;
