import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ChevronRight, 
  Briefcase, 
  Computer, 
  Palette, 
  TrendingUp, 
  DollarSign, 
  Database, 
  Package, 
  Users,
  Star 
} from "lucide-react";
import JobCard from "@/components/ui/JobCard";
import JobCardSkeleton from "@/components/ui/JobCardSkeleton";
import LazyImage from "@/components/ui/LazyImage";
import MainLayout from "@/components/layout/MainLayout";
import { Job, Testimonial, JobCategory } from "@/types";
import jobsData from "@/data/jobs.json";
import testimonialsData from "@/data/testimonials.json";
import categoriesData from "@/data/categories.json";
import { useJobs } from "@/hooks/use-jobs";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { uniqueLocations } = useJobs();
  
  useEffect(() => {
    // Simulate API call for featured jobs
    setLoading(true);
    const timer = setTimeout(() => {
      setFeaturedJobs(jobsData.slice(0, 4));
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("search", searchTerm);
    if (location) queryParams.append("location", location);
    
    window.location.href = `/jobs?${queryParams.toString()}`;
  };
  
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Computer": return <Computer className="h-8 w-8" />;
      case "Palette": return <Palette className="h-8 w-8" />;
      case "TrendingUp": return <TrendingUp className="h-8 w-8" />;
      case "DollarSign": return <DollarSign className="h-8 w-8" />;
      case "Database": return <Database className="h-8 w-8" />;
      case "Package": return <Package className="h-8 w-8" />;
      case "Users": return <Users className="h-8 w-8" />;
      default: return <Briefcase className="h-8 w-8" />;
    }
  };
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-job-light to-blue-50 pt-16 pb-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of job opportunities with all the information you need.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Job title, keyword, or company"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                <Select
                  value={location}
                  onValueChange={setLocation}
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">
                Search Jobs
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Job Categories Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Job Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find jobs in categories that match your skills and interests
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoriesData.map((category: JobCategory) => (
              <Link 
                key={category.id} 
                to={`/jobs?category=${category.name}`}
                className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-job-primary mb-4">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-500">{category.count} Jobs Available</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/jobs">
              <Button variant="outline" className="border-job-primary text-job-primary hover:bg-job-light">
                Browse All Categories
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Jobs
            </h2>
            <Link to="/jobs" className="text-job-primary hover:underline font-medium flex items-center">
              View All Jobs
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              // Skeleton loaders for jobs
              Array(4).fill(0).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))
            ) : (
              featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from professionals who found their dream jobs through our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial: Testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <LazyImage 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex text-yellow-400">
                    {Array(5).fill(0).map((_, idx) => (
                      <Star key={idx} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-job-primary text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of job seekers who have found their dream jobs through JobHub.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs">
              <Button className="bg-white text-job-primary hover:bg-gray-100 min-w-[150px]">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/post-job">
              <Button variant="outline" className="border-white text-job-primary hover:text-white hover:bg-white/10 min-w-[150px]">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
