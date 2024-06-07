"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppSelector } from "@/features/Hooks";
import {
  selectCartTotal,
} from "@/features/cartSlice";
function CartSummary() {
     const cartTotal = useAppSelector(selectCartTotal);
    const { toast } = useToast();
    function toastHandler(description: string) {
         toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: description,
            });
    }
  return (
    <section className="w-full flex-wrap gap-y-8 flex pb-12">
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <h3 className="font-bold ">Have a coupoun?</h3>
        <p className="text-sm pb-2">
          Add your code for an instant cart discount
        </p>
        <form
          className="w-full flex items-center flex-wrap gap-x-2 gap-y-4 max-w-[400px]"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            toastHandler("There was a problem with your coupon.");
            // toast({
            //   variant: "destructive",
            //   title: "Uh oh! Something went wrong.",
            //   description: "There was a problem with your coupon.",
            // });
          }}
        >
          <Input type="text" placeholder="Coupon" required className="min-w-[150px]" />
          <Button type="submit">Apply</Button>
        </form>
      </div>
      <div className="w-full md:w-1/2 flex justify-end">
        <Card className="w-full max-w-[450px]">
          <CardHeader>
            <CardTitle>Cart Summary</CardTitle>
            <CardDescription>Free shipping</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center font-black justify-between flex-wrap gap-1">
            <h4>Total</h4>
            <h4>${cartTotal}</h4>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() =>
                toastHandler(
                  "Server error. We are experiencing technical difficulties. Please retry shortly."
                )
              }
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default CartSummary
