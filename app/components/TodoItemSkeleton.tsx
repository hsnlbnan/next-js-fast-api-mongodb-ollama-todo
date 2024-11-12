export function TodoItemSkeleton() {
  return (
    <div className="bg-gray-800 p-4 rounded-md border border-gray-600 flex justify-between items-center">
      <div className="w-full">
        <div className="h-6 w-1/3 mb-2 bg-gray-600 animate-pulse rounded" />
        <div className="h-4 w-2/3 mb-2 bg-gray-600 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-gray-600 animate-pulse rounded" />
      </div>
      <div className="flex gap-2">
        <div className="h-8 w-16 bg-gray-600 animate-pulse rounded" />
      </div>
    </div>
  );
}