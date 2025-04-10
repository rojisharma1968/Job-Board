
import { Skeleton } from "@/components/ui/skeleton";

const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between">
        <div className="flex items-start space-x-4">
          <Skeleton className="w-12 h-12 rounded-md" />
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      
      <div className="mt-4 flex space-x-4">
        <Skeleton className="h-4 w-24" />
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

export default JobCardSkeleton;
