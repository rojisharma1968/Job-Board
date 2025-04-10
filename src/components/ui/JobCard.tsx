
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, Heart } from "lucide-react";
import LazyImage from "./LazyImage";
import { Job } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>("savedJobs", []);
  
  const isSaved = savedJobs.includes(job.id);
  
  const toggleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      setSavedJobs(savedJobs.filter(id => id !== job.id));
    } else {
      setSavedJobs([...savedJobs, job.id]);
    }
  };
  
  const handleCompanyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Using window.location to avoid nesting Link components
    window.location.href = `/companies/${job.company.id}`;
  };
  
  return (
    <Link 
      to={`/jobs/${job.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex items-start space-x-4">
            <LazyImage
              src={job.company.logo}
              alt={job.company.name}
              className="w-12 h-12 rounded-md object-cover"
              placeholderClassName="w-12 h-12 rounded-md"
            />
            <div>
              <h3 className="font-medium text-lg text-gray-900">{job.title}</h3>
              <button 
                onClick={handleCompanyClick}
                className="text-job-primary hover:underline text-left"
              >
                {job.company.name}
              </button>
            </div>
          </div>
          <button 
            onClick={toggleSaveJob}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
              isSaved ? "text-red-500" : "text-gray-400"
            }`}
            aria-label={isSaved ? "Unsave job" : "Save job"}
          >
            <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-job-light text-job-primary">
            {job.employment_type}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {job.category}
          </span>
          {job.remote && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Remote
            </span>
          )}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{job.experience_level}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDistanceToNow(new Date(job.posted_date), { addSuffix: true })}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 line-clamp-2">{job.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
