import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function DetailsFarmSkeleton() {
  return (
    <div className="container mx-auto mt-10 p-4">
      {/* Header with title and buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-9 bg-gray-200 rounded-md animate-pulse w-96"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-200 rounded-md animate-pulse w-32"></div>
          <div className="h-10 bg-gray-200 rounded-md animate-pulse w-32"></div>
        </div>
      </div>

      {/* General Information Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-48"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Varieties Chart Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-48"></div>
            </CardTitle>
            <CardDescription>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-64"></div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto aspect-square max-h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>

        {/* Plots Chart Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="h-6 bg-gray-200 rounded-md animate-pulse w-48"></div>
            </CardTitle>
            <CardDescription>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-64"></div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto aspect-square max-h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-48 h-48 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plantings History Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-48"></div>
          </CardTitle>
          <CardDescription>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-64"></div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, plantingIndex) => (
              <div key={plantingIndex} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {Array.from({ length: 4 }).map((_, fieldIndex) => (
                    <div key={fieldIndex} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, plotIndex) => (
                      <div key={plotIndex} className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}