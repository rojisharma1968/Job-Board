import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  MapPin, 
  Filter, 
  X,
  Briefcase
} from "lucide-react";
import JobCard from "@/components/ui/JobCard";
import JobCardSkeleton from "@/components/ui/JobCardSkeleton";
import MainLayout from "@/components/layout/MainLayout";
import { Job, JobFilter } from "@/types";
import { useJobs } from "@/hooks/use-jobs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const JobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const initialFilter: JobFilter = {
    search: searchParams.get("search") || "",
    location: searchParams.get("location") || "",
    category: searchParams.get("category") || "",
    employmentType: searchParams.get("employmentType") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    remote: searchParams.get("remote") === "true"
  };
  
  const [filter, setFilter] = useState<JobFilter>(initialFilter);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page") || 1));
  const [hasMore, setHasMore] = useState(true);
  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [paginationMode, setPaginationMode] = useState<'pagination' | 'infinite'>(
    searchParams.get("mode") === "infinite" ? "infinite" : "pagination"
  );
  
  const { jobs, loading, uniqueLocations } = useJobs(filter);
  const observer = useRef<IntersectionObserver | null>(null);
  const JOBS_PER_PAGE = 6;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, page]);
  
  const lastJobElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || paginationMode !== "infinite") return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, paginationMode]);
  
  useEffect(() => {
    setPage(1);
    setDisplayedJobs([]);
    setHasMore(true);
  }, [filter]);
  
  useEffect(() => {
    if (!loading) {
      let jobsToDisplay: Job[] = [];
      
      if (paginationMode === "pagination") {
        const startIndex = (page - 1) * JOBS_PER_PAGE;
        const endIndex = startIndex + JOBS_PER_PAGE;
        jobsToDisplay = jobs.slice(startIndex, endIndex);
      } else {
        const endIndex = page * JOBS_PER_PAGE;
        jobsToDisplay = jobs.slice(0, endIndex);
      }
      
      setDisplayedJobs(jobsToDisplay);
      setHasMore(jobsToDisplay.length < jobs.length);
      
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", page.toString());
      newSearchParams.set("mode", paginationMode);
      setSearchParams(newSearchParams);
    }
  }, [jobs, loading, page, paginationMode, searchParams, setSearchParams]);
  
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filter.search) newSearchParams.set("search", filter.search);
    if (filter.location) newSearchParams.set("location", filter.location);
    if (filter.category) newSearchParams.set("category", filter.category);
    if (filter.employmentType) newSearchParams.set("employmentType", filter.employmentType);
    if (filter.experienceLevel) newSearchParams.set("experienceLevel", filter.experienceLevel);
    if (filter.remote) newSearchParams.set("remote", "true");
    newSearchParams.set("page", page.toString());
    newSearchParams.set("mode", paginationMode);
    
    setSearchParams(newSearchParams);
  }, [filter, setSearchParams, page, paginationMode]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchTerm = formData.get("search") as string;
    
    setFilter(prev => ({
      ...prev,
      search: searchTerm
    }));
  };
  
  const handleLocationChange = (value: string) => {
    setFilter(prev => ({
      ...prev,
      location: value === "All Locations" ? "" : value
    }));
  };
  
  const handleFilterChange = (key: keyof JobFilter, value: string | boolean) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const clearFilters = () => {
    setFilter({
      search: "",
      location: "",
      category: "",
      employmentType: "",
      experienceLevel: "",
      remote: false
    });
  };
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const switchPaginationMode = () => {
    setPaginationMode(prev => prev === "pagination" ? "infinite" : "pagination");
    setPage(1);
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.ceil(jobs.length / JOBS_PER_PAGE)) {
      setPage(newPage);
    }
  };
  
  const renderPagination = () => {
    if (loading || jobs.length === 0) return null;
    
    const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(page - 1)}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            
            if (
              pageNumber === 1 || 
              pageNumber === totalPages || 
              (pageNumber >= page - 1 && pageNumber <= page + 1)
            ) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink 
                    isActive={page === pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            
            if (pageNumber === page - 2 || pageNumber === page + 2) {
              return (
                <PaginationItem key={`ellipsis-${pageNumber}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return null;
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(page + 1)}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  const categories = [
    "Technology",
    "Design",
    "Marketing",
    "Finance",
    "Data Science",
    "Product",
    "Human Resources"
  ];
  
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship"
  ];
  
  const experienceLevels = [
    "Entry-level (0-2 years)",
    "Mid-level (3-5 years)",
    "Senior (5+ years)"
  ];
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
            <p className="text-gray-600">Find your next career opportunity</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  name="search"
                  type="text" 
                  placeholder="Job title, keyword, or company"
                  className="pl-10"
                  defaultValue={filter.search}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Select 
                  value={filter.location || "All Locations"} 
                  onValueChange={handleLocationChange}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="md:hidden"
                onClick={toggleFilter}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div 
              className={`w-full md:w-64 flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
                isFilterOpen ? "max-h-[2000px]" : "max-h-0 md:max-h-[2000px]"
              }`}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button 
                    className="text-gray-500 hover:text-gray-700"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={filter.category === category}
                          onCheckedChange={() => 
                            handleFilterChange("category", filter.category === category ? "" : category)
                          }
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Employment Type</h3>
                  <div className="space-y-2">
                    {employmentTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox 
                          id={`type-${type}`}
                          checked={filter.employmentType === type}
                          onCheckedChange={() => 
                            handleFilterChange("employmentType", filter.employmentType === type ? "" : type)
                          }
                        />
                        <label 
                          htmlFor={`type-${type}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Experience Level</h3>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => (
                      <div key={level} className="flex items-center">
                        <Checkbox 
                          id={`level-${level}`}
                          checked={filter.experienceLevel === level}
                          onCheckedChange={() => 
                            handleFilterChange("experienceLevel", filter.experienceLevel === level ? "" : level)
                          }
                        />
                        <label 
                          htmlFor={`level-${level}`}
                          className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <Checkbox 
                      id="remote"
                      checked={filter.remote}
                      onCheckedChange={(checked) => 
                        handleFilterChange("remote", !!checked)
                      }
                    />
                    <label 
                      htmlFor="remote"
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Remote Jobs Only
                    </label>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <Checkbox 
                      id="infinite-scroll"
                      checked={paginationMode === "infinite"}
                      onCheckedChange={switchPaginationMode}
                    />
                    <label 
                      htmlFor="infinite-scroll"
                      className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      Use Infinite Scroll
                    </label>
                  </div>
                </div>
                
                <Button 
                  onClick={clearFilters}
                  variant="outline" 
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              {loading && displayedJobs.length === 0 ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="mb-6">
                    <JobCardSkeleton />
                  </div>
                ))
              ) : displayedJobs.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-gray-600">{jobs.length} jobs found</p>
                  </div>
                  <div className="space-y-6">
                    {displayedJobs.map((job, index) => {
                      if (paginationMode === "infinite" && displayedJobs.length === index + 1) {
                        return (
                          <div ref={lastJobElementRef} key={job.id}>
                            <JobCard job={job} />
                          </div>
                        );
                      } else {
                        return (
                          <div key={job.id}>
                            <JobCard job={job} />
                          </div>
                        );
                      }
                    })}
                    {loading && hasMore && paginationMode === "infinite" && (
                      Array(2).fill(0).map((_, index) => (
                        <JobCardSkeleton key={`skeleton-${index}`} />
                      ))
                    )}
                  </div>
                  
                  {paginationMode === "pagination" && renderPagination()}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    We couldn't find any jobs matching your criteria.
                  </p>
                  <Button 
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
