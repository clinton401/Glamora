import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
function CardSkeleton() {
  return (
    <Card className="w-full">
          <CardHeader className="p-2 mb-4">
              <Skeleton className="w-full aspect-[1/0.9] rounded-md "/>
</CardHeader>
          <CardContent className="px-2">
              <Skeleton className="w-full h-2 rounded"/>
          </CardContent>
          <CardFooter className="px-2">
              <Skeleton  className="w-1/2 h-4 rounded-md"/>
          </CardFooter>


    </Card>
  )
}

export default CardSkeleton
