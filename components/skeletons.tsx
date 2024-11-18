import { Skeleton } from "@/components/ui/skeleton"

export const MenuItemSkeleton = () => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[60px]" />
    </div>
    <Skeleton className="h-4 w-[300px]" />
    <div className="flex gap-2">
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  </div>
)

export const BasketItemSkeleton = () => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-4 w-[150px]" />
      <Skeleton className="h-4 w-[80px]" />
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="h-4 w-[200px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  </div>
)