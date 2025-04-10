
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  BriefcaseBusiness, 
  DollarSign, 
  CheckCircle2,
  ArrowLeft,
  Heart,
  ExternalLink,
  Award,
  CheckCheck
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import LazyImage from "@/components/ui/LazyImage";
import MainLayout from "@/components/layout/MainLayout";
import { useJob } from "@/hooks/use-jobs";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const JobDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { job, loading } = useJob(id || "");
  const [savedJobs, setSavedJobs] = useLocalStorage<string[]>("savedJobs", []);
  const [appliedJobs, setAppliedJobs] = useLocalStorage<string[]>("appliedJobs", []);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  if (!id) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-4xl py-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  const isSaved = savedJobs.includes(id);
  const hasApplied = appliedJobs.includes(id);
  
  const toggleSaveJob = () => {
    if (isSaved) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id));
      toast({
        title: "Job Removed",
        description: "This job has been removed from your saved jobs.",
      });
    } else {
      setSavedJobs([...savedJobs, id]);
      toast({
        title: "Job Saved",
        description: "This job has been added to your saved jobs.",
      });
    }
  };
  
  const handleApply = () => {
    if (!hasApplied) {
      setAppliedJobs([...appliedJobs, id]);
      
      // Show success dialog
      setShowSuccessDialog(true);
      
      // Show toast notification
      toast({
        title: "Application Submitted!",
        description: "Your application has been successfully submitted.",
        variant: "default",
      });
    }
  };
  
  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
  };
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8 px-4 sm:px-6 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/jobs" 
              className="inline-flex items-center text-gray-600 hover:text-job-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </div>
          
          {loading ? (
            <JobDetailsSkeleton />
          ) : job ? (
            <>
              {/* Job Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <LazyImage
                      src={job.company.logo}
                      alt={job.company.name}
                      className="w-16 h-16 rounded-md object-cover"
                      placeholderClassName="w-16 h-16 rounded-md"
                    />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
                      <Link 
                        to={`/companies/${job.company.id}`}
                        className="text-job-primary hover:underline font-medium"
                      >
                        {job.company.name}
                      </Link>
                      <div className="flex flex-wrap gap-2 mt-3">
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
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={toggleSaveJob}
                      variant={isSaved ? "default" : "outline"}
                      className={isSaved ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save Job"}
                    </Button>
                    <Button 
                      className={hasApplied ? "bg-green-600 hover:bg-green-700" : "bg-job-primary hover:bg-job-dark"}
                      onClick={handleApply}
                      disabled={hasApplied}
                    >
                      {hasApplied ? (
                        <>
                          <CheckCheck className="h-4 w-4 mr-2" />
                          Applied
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">Posted {new Date(job.posted_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700">{job.salary_range}</span>
                  </div>
                </div>
                
                {/* Application Success Alert */}
                {hasApplied && (
                  <Alert className="mt-6 bg-green-50 border-green-200 text-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <AlertTitle className="text-green-800 font-medium">Application Submitted!</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Your application for this position has been successfully submitted. 
                      The hiring team will review your application and contact you soon.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              {/* Job Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-6">{job.description}</p>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Responsibilities</h3>
                    <ul className="space-y-2 mb-6">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-job-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-job-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex justify-between">
                      <Button 
                        onClick={toggleSaveJob}
                        variant={isSaved ? "default" : "outline"}
                        className={isSaved ? "bg-red-500 hover:bg-red-600" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                        {isSaved ? "Saved" : "Save Job"}
                      </Button>
                      <Button 
                        className={hasApplied ? "bg-green-600 hover:bg-green-700" : "bg-job-primary hover:bg-job-dark"}
                        onClick={handleApply}
                        disabled={hasApplied}
                      >
                        {hasApplied ? (
                          <>
                            <CheckCheck className="h-4 w-4 mr-2" />
                            Applied
                          </>
                        ) : (
                          "Apply Now"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Company Info</h2>
                    <div className="flex items-center mb-4">
                      <LazyImage
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-12 h-12 rounded-md object-cover mr-3"
                        placeholderClassName="w-12 h-12 rounded-md"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{job.company.name}</h3>
                        <Link 
                          to={`/companies/${job.company.id}`}
                          className="text-job-primary hover:underline text-sm"
                        >
                          View Company Profile
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <BriefcaseBusiness className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{job.category}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{job.experience_level}</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Link to={`/companies/${job.company.id}`}>
                        <Button 
                          variant="outline" 
                          className="w-full"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Company
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-job-light rounded-lg p-6">
                    <h2 className="text-lg font-bold text-job-primary mb-3">Need Help?</h2>
                    <p className="text-gray-700 mb-4">
                      Contact our support team if you have any questions about this job listing.
                    </p>
                    <Button variant="outline" className="w-full border-job-primary text-job-primary">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Success Dialog Modal */}
              <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center text-green-700">
                      <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
                      Application Submitted!
                    </DialogTitle>
                    <DialogDescription>
                      <div className="py-4">
                        <p className="mb-2">Your application for <span className="font-medium">{job?.title}</span> at <span className="font-medium">{job?.company.name}</span> has been successfully submitted.</p>
                        <p>The hiring team will review your application and contact you soon.</p>
                      </div>
                      <div className="mt-2 p-3 bg-green-50 rounded-md border border-green-100">
                        <p className="text-sm text-green-800">What's next?</p>
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Wait for the hiring team to review your application</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Check your email regularly for updates</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                            <span>Prepare for potential interviews</span>
                          </li>
                        </ul>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end">
                    <Button 
                      onClick={closeSuccessDialog}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Continue Browsing
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
              <p className="text-gray-600 mb-4">
                The job listing you're looking for might have been removed or is no longer available.
              </p>
              <Link to="/jobs">
                <Button className="bg-job-primary hover:bg-job-dark">Browse Jobs</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

const JobDetailsSkeleton = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-48 mb-3" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <Skeleton className="h-7 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="space-y-2 mb-6">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="space-y-2 mb-6">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            
            <Skeleton className="h-1 w-full mb-6" />
            
            <div className="flex justify-between">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <Skeleton className="h-7 w-full mb-4" />
            <div className="flex items-center mb-4">
              <Skeleton className="w-12 h-12 rounded-md mr-3" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div className="mt-6">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
