
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Briefcase } from "lucide-react";
import CompanyCard from "@/components/ui/CompanyCard";
import CompanyCardSkeleton from "@/components/ui/CompanyCardSkeleton";
import MainLayout from "@/components/layout/MainLayout";
import { useCompanies } from "@/hooks/use-companies";
import { Company } from "@/types";

const CompaniesPage = () => {
  const { companies, loading } = useCompanies();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  
  useEffect(() => {
    if (!loading) {
      if (searchTerm.trim() === "") {
        setFilteredCompanies(companies);
      } else {
        const term = searchTerm.toLowerCase();
        const filtered = companies.filter(company => 
          company.name.toLowerCase().includes(term) || 
          company.industry.toLowerCase().includes(term) ||
          company.location.toLowerCase().includes(term)
        );
        setFilteredCompanies(filtered);
      }
    }
  }, [searchTerm, companies, loading]);
  
  return (
    <MainLayout>
      <div className="bg-gray-50 py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Companies</h1>
            <p className="text-gray-600">Discover companies that are hiring</p>
          </div>
          
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search by company name, industry, or location"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              // Skeleton loaders for companies
              Array(6).fill(0).map((_, index) => (
                <CompanyCardSkeleton key={index} />
              ))
            ) : filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))
            ) : (
              <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
                <p className="text-gray-600">
                  We couldn't find any companies matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CompaniesPage;
