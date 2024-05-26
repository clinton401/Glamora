import HeaderLinks from "@/components/HeaderLinks";
import HeaderMobileLinksComps from "@/components/HeaderMobileLinksComps";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { playfair } from "@/app/page";
function Header() {
  const linksObject = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Products",
      path: "/products",
    },
    {
      id: 3,
      name: "Bookmark",
      path: "/bookmark",
    },
  ];

  return (
    <header className=" shadow-md fixed z-[100] top-0 left-0 w-full  bg-opacity-10 bg-background backdrop-blur-[2px] py-3  desktop:py-4 px-[2.5%] ">
      <nav
        aria-label="desktop view"
        className=" items-center   w-full  hidden desktop:flex  justify-between"
      >
        <nav>
          <Link href="/" className="flex items-center gap-1">
            <Image src="/cosmetics.png" width={40} height={40} alt="Logo" />
            <h2
              className={`font-extrabold text-2xl font-playfair ${playfair.variable}`}
            >
              GLAMORA{" "}
            </h2>
          </Link>
        </nav>
        <nav>
          <ul className="w-full flex gap-4">
            {linksObject.map((links) => (
              <li key={links.id}>
                <HeaderLinks name={links.name} path={links.path} />
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex   justify-between items-center">
          <ModeToggle />
        </nav>
      </nav>
      <nav className="flex desktop:hidden gap-x-2 gap-y-4 w-full flex-wrap items-center relative justify-between">
        <nav className="relative  pl-[50px] ">
          {" "}
          <HeaderMobileLinksComps linksObject={linksObject} />
          <Link href="/" className="flex items-center gap-1">
            <Image src="/cosmetics.png" width={30} height={30} alt="Logo" />
            <h2 className="font-extrabold text-xl ">Glamora</h2>
          </Link>
        </nav>

        <span className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-4  aspect-square"
              />
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="h-4  aspect-square"
              />
            </Link>
          </Button>
        </span>
      </nav>
    </header>
  );
}

export default Header;
