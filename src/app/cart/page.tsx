import CartTable from "@/clientComps/CartTable";
import { playfair } from "../page"
import CartSummary from "@/clientComps/CartSummary";
function Cart() {
  return (
    <main className="w-full  overflow-x-hidden px-[5%]  pt-[80px] desktop:pt-[100px] pb-[50px]">
      <section className="flex flex-col w-full pb-12 gap-4 items-center">
        <h1
          className={`${playfair.variable} font-playfair text-4xl font-black w-full text-center`}
        >
          Cart
        </h1>
        <p className=" w-full flex  justify-center">
   Free shipping
        </p>
      </section>
      <CartTable />
      <CartSummary />
    </main>
  );
}

export default Cart
