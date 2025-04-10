
import { Skeleton } from "@/components/ui/skeleton";

const CompanyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-md" />
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      <div className="mt-4 flex space-x-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      
      <div className="mt-4">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
};

export default CompanyCardSkeleton;
