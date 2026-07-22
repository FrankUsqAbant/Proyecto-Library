import { Skeleton } from '@/components/ui/skeleton';

export function DetailedBookSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
      <Skeleton className="max-w-[400px] w-full aspect-[3/4] rounded-xl mx-auto lg:ml-auto" />
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="flex items-center space-x-6 py-4 border-y border-[var(--border)]">
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-12 w-20" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex space-x-4">
          <Skeleton className="h-16 w-48 rounded-2xl" />
          <Skeleton className="h-16 w-16 rounded-2xl" />
          <Skeleton className="h-16 w-16 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
