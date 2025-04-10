
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Globe, 
  Users, 
  Calendar, 
  CheckCircle2,
  ArrowLeft,
  Briefcase
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import LazyImage from "@/components/ui/LazyImage";
import JobCard from "@/components/ui/JobCard";
import JobCardSkeleton from "@/components/ui/JobCardSkeleton";
import MainLayout from "@/components/layout/MainLayout";
import { useCompany } from "@/hooks/use-companies";
import { useJobs } from "@/hooks/use-jobs";

const CompanyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { company, loading: companyLoading } = useCompany(id || "");
  const { jobs, loading: jobsLoading } = useJobs({ search: company?.name });
  
  if (!id) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-6xl py-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company Not Found</h1>
            <Link to="/companies">
              <Button>Browse Companies</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Filter jobs that belong to this company
  const companyJobs = jobs.filter(job => job.company.id === id);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 pb-8">
        {/* Back button */}
        <div className="container mx-auto max-w-6xl pt-8 px-4">
          <div className="mb-6">
            <Link 
              to="/companies" 
              className="inline-flex items-center text-gray-600 hover:text-job-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Companies
            </Link>
          </div>
        </div>
        
        {companyLoading ? (
          <CompanyDetailsSkeleton />
        ) : company ? (
          <>
            {/* Company Header */}
            <div className="relative mb-8">
              <div className="h-48 md:h-64 overflow-hidden">
                <LazyImage
                  src={company.cover_image}
                  alt={`${company.name} cover`}
                  className="w-full h-full object-cover"
                  placeholderClassName="w-full h-full bg-gray-200"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="container mx-auto max-w-6xl px-4">
                <div className="relative -mt-20 flex flex-col md:flex-row md:items-end">
                  <div className="bg-white rounded-lg border border-gray-200 p-2 shadow-md mb-4 md:mb-0">
                    <LazyImage
                      src={company.logo}
                      alt={company.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      placeholderClassName="w-24 h-24 rounded-lg"
                    />
                  </div>
                  <div className="md:ml-6 mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                    <p className="text-gray-600">{company.industry}</p>
                  </div>
                  <div className="md:ml-auto mt-4 md:mt-0">
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button>
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Company Tabs */}
            <div className="container mx-auto max-w-6xl px-4">
              <Tabs defaultValue="about">
                <TabsList className="mb-8">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs ({company.jobs_count})</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About {company.name}</h2>
                        <p className="text-gray-700 whitespace-pre-line mb-6">{company.description}</p>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Our Mission</h3>
                        <p className="text-gray-700 mb-6">{company.mission}</p>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Our Values</h3>
                        <ul className="space-y-2 mb-6">
                          {company.values.map((value, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-job-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
                        <ul className="space-y-2">
                          {company.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-job-primary mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Company Info</h2>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Location</h3>
                              <p className="text-gray-900">{company.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                              <p className="text-gray-900">{company.founded}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Company Size</h3>
                              <p className="text-gray-900">{company.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Industry</h3>
                              <p className="text-gray-900">{company.industry}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-job-light rounded-lg p-6">
                        <h2 className="text-lg font-bold text-job-primary mb-3">Open Positions</h2>
                        <p className="text-gray-700 mb-4">
                          {company.name} currently has {company.jobs_count} open positions.
                        </p>
                        <Link to="/jobs" state={{ company: company.name }}>
                          <Button className="w-full bg-job-primary hover:bg-job-dark">
                            View All Jobs
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="jobs">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Open Positions at {company.name}
                    </h2>
                    <p className="text-gray-600">
                      Explore current job opportunities and find your next role
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    {jobsLoading ? (
                      // Skeleton loaders for jobs
                      Array(3).fill(0).map((_, index) => (
                        <JobCardSkeleton key={index} />
                      ))
                    ) : companyJobs.length > 0 ? (
                      companyJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))
                    ) : (
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions</h3>
                        <p className="text-gray-600 mb-4">
                          There are currently no open positions at this company.
                        </p>
                        <Link to="/jobs">
                          <Button className="bg-job-primary hover:bg-job-dark">
                            Browse All Jobs
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        ) : (
          <div className="container mx-auto max-w-6xl py-8 px-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Company Not Found</h2>
              <p className="text-gray-600 mb-4">
                The company you're looking for might have been removed or is no longer available.
              </p>
              <Link to="/companies">
                <Button className="bg-job-primary hover:bg-job-dark">Browse Companies</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const CompanyDetailsSkeleton = () => {
  return (
    <>
      <div className="relative mb-8">
        <Skeleton className="h-48 md:h-64 w-full" />
        <div className="container mx-auto max-w-6xl px-4">
          <div className="relative -mt-20 flex flex-col md:flex-row md:items-end">
            <Skeleton className="w-28 h-28 rounded-lg" />
            <div className="md:ml-6 mb-4 md:mb-0 mt-4 md:mt-0">
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="md:ml-auto mt-4 md:mt-0">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4">
        <Skeleton className="h-10 w-64 mb-8" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <Skeleton className="h-7 w-48 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <Skeleton className="h-6 w-40 mb-3" />
              <Skeleton className="h-4 w-full mb-6" />
              
              <Skeleton className="h-6 w-40 mb-3" />
              <div className="space-y-2 mb-6">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <Skeleton className="h-7 w-48 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <Skeleton className="h-7 w-full mb-4" />
              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-36" />
                  </div>
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-20 mb-1" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            </div>
            
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailsPage;
