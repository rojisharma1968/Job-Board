
import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";
import LazyImage from "./LazyImage";
import { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Link 
      to={`/companies/${company.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <LazyImage
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-md object-cover"
            placeholderClassName="w-16 h-16 rounded-md"
          />
          <div>
            <h3 className="font-medium text-lg text-gray-900">{company.name}</h3>
            <div className="text-sm text-gray-500">{company.industry}</div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{company.jobs_count} Jobs</span>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 line-clamp-2">{company.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;
