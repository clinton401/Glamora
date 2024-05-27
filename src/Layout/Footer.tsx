import Image from "next/image";
import { playfair } from "@/app/page";
import { Button } from "@/components/ui/button";
function Footer() {
  return (
    <footer className="w-full mt-[50px] px-[5%] text-sm items-center py-8 justify-center text-white flex flex-col gap-4 min-h-[150px] bg-primary">
      <div className="flex flex-col desktop:flex-row justify-between w-full gap-4 flex-wrap items center">
         <span className="flex items-center gap-1">
            <Image src="/cosmetics.png" width={30} height={30} alt="Logo" />
            <h2
              className={`font-extrabold text-xl font-playfair ${playfair.variable}`}
            >
              GLAMORA{" "}
            </h2>
          </span>
          <ul className="flex gap-4 flex-col desktop:flex-row desktop:items-center ">
            <li>About</li>
            <li>Cart</li>
            <li>Help & Support</li>
            <li>T&C</li>
              </ul>
              <span className="flex flex-wrap items-center gap-2">
                  <p>Contact:</p>
                  <Button variant="secondary">+91 123456789</Button>
              </span>
          
      </div>
    </footer>
  )
}

export default Footer
