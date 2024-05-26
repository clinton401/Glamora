import CardSkeleton from "@/components/CardSkeleton";
import { CarouselItem, CarouselContent } from "@/components/ui/carousel";
function SkeletonCarouselComp({ dataArray }: { dataArray: number[] }) {
  return (
    <>
      {dataArray.map((skeleton) => {
        return (
          <CarouselItem
            className="pl-4 basis-3/5 min-w-[200px] sm:1/3 md:basis-1/4  lg:basis-1/5"
            key={skeleton}
          >
            <div  className="p-1 w-full ">
              <CardSkeleton />
            </div>
          </CarouselItem>
        );
      })}
    </>
  );
}

export default SkeletonCarouselComp;
