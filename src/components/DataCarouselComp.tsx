import CardSkeleton from "@/components/CardSkeleton";
import { CarouselItem, CarouselContent } from "@/components/ui/carousel";
import type { ProductsDataType } from "@/clientComps/HomeState";
import DataCard from "./DataCard";
function DataCarouselComp({ dataArray }: { dataArray: ProductsDataType[] }) {
  return (
    <>
      {dataArray.slice(0, 10).map((data) => {
        return (
          <CarouselItem
            className="pl-4 basis-3/5 min-w-[200px] sm:1/3 md:basis-1/4  lg:basis-1/5"
            key={data.id}
          >
            <div className="p-1 relative w-full ">
                    <DataCard id={data.id}
                        price={data.price} name={data.name}
                        api_featured_image={ data.api_featured_image} />
            </div>
          </CarouselItem>
        );
      })}
    </>
  );
}

export default DataCarouselComp;
