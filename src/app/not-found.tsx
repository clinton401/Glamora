"use client"

import { Button } from "@/components/ui/button";
import useNavigationUtil from "@/utils/navigation-utils";
import {playfair} from "./page"
function NotFound() {
    const routeHandler = useNavigationUtil("/")
  return (
    <section className="w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ">
      <h2 className={`font-[900] font-playfair text-2xl desktop:text-4xl ${playfair.variable} text-white text-center w-full`}>
        404 - PAGE NOT FOUND
      </h2>
      <p className="w-full ipad:w-3/4  text-white text-center">
        The page you are looking for might have been removed had its name
        changes or is temporary unavailable{" "}
      </p>
      <Button onClick={routeHandler}>GO TO HOMEPAGE</Button>
    
    </section>
  );
}

export default NotFound
