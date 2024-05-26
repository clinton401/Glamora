
import { Playfair_Display } from "next/font/google";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import {
  rightAnimation,
  leftAnimation,
  textAnimate,
  scaleAnimation,
  hiddenAnimation,
} from "@/utils/framer-motion-utils";
import eyeImage from '../../public/eye.png'
import faceImage from '../../public/makeup.png'


import nailsImage from '../../public/nail-polish.png'
import lipsImage from '../../public/lips.png'

import cosImage from "../../public/home cosmetic third.jpg";
import HomeCarouselComp from "@/clientComps/HomeCarouselComp";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MotionComp from "@/components/MotionComp";
import { InputWithButton } from "@/components/InputWithButton";
export  const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
   weight: ['400', '900'],
  display: 'swap',
})
export default function Home() {

  
 
  const productsDescription = [
    {
      id: 1,
      description:
        "Elevate your look with our face cosmetics. Flawless foundations, radiant blushes, and highlighters bring out your natural glow for a stunning finish.",
      url: faceImage,
      name: "Face"
    },
    {
      id: 2,
      description:
        "Enhance your gaze with our eye cosmetics. Bold liners and shimmering shadows transform your eyes with vibrant colors and luxurious finishes.",
      url: eyeImage,
        name: "Eyes"
    },
    {
      id: 3,
      description:
        "Enhance your lips with our cosmetics. From vibrant colors to luxurious finishes, our lipsticks and glosses make every smile unforgettable.",
      url: lipsImage,
        name: "Lips"
    },
    {
      id: 4,
      description:
        "Elevate your style with our nail cosmetics. From bold colors to chic designs, our nail polishes and treatments let you express yourself with every stroke.",
      url: nailsImage,
        name: "Nails"
    },
  ];
 
 
  return (
    <main className="w-full overflow-x-hidden px-[5%]  min-h-[2000px] pt-[80px] desktop:pt-[100px] pb-[50px]">
      <section className="flex  justify-between w-full pb-12  flex-wrap items-center">
        <MotionComp
          className="w-[45%] hidden desktop:block relative overflow-hidden rounded-md max-h-[450px] aspect-[1/0.8] "
          variants={scaleAnimation}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <Image
            src={cosImage}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max- width: 1200px) 50vw, 33vw"
            style={{ borderRadius: "6px", objectFit: "contain" }}
            fill={true}
            alt="Cosmetic image"
          />
        </MotionComp>
        {/* <motion.div
          variants={scaleAnimation}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="w-[45%] hidden desktop:block relative overflow-hidden rounded-md max-h-[450px] aspect-[1/0.8] "
        >
          <Image
            src={cosImage}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw, (max- width: 1200px) 50vw, 33vw"
            style={{ borderRadius: "6px", objectFit: "contain" }}
            fill={true}
            alt="Cosmetic image"
          />
        </motion.div> */}
        <MotionComp
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
          className="desktop:w-[45%] items-center w-full h-full flex justify-center flex-col gap-5 "
        >
          <MotionComp
            as="h1"
            variants={rightAnimation}
            className={`font-black text-4xl  text-center  font-playfair ${playfair.variable} w-full desktop:text-left`}
          >
            Glamora: Your Ultimate Destination for Beauty Essentials
          </MotionComp>
          <MotionComp
            as="p"
            variants={textAnimate}
            className="w-full text-center desktop:text-left"
          >
            Discover a world of beauty at Glamora, your one-stop shop for
            premium cosmetics. From luxurious skincare to vibrant makeup, our
            curated collection ensures you shine every day. Explore top brands
            and exclusive products that elevate your beauty routine. Unleash
            your glow with Glamora!
          </MotionComp>
          <MotionComp
            as="span"
            variants={textAnimate}
            className="flex w-full gap-4 justify-center desktop:justify-start items-center"
          >
            <Button>Shop Now</Button>
            <Button variant="outline">Read More</Button>
          </MotionComp>
        </MotionComp>
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
          className="desktop:w-[45%] items-center w-full h-full flex justify-center flex-col gap-5 "
        >
          <motion.h1
            variants={rightAnimation}
            className={`font-black text-4xl  text-center  font-playfair ${playfair.variable} w-full desktop:text-left`}
          >
            Glamora: Your Ultimate Destination for Beauty Essentials
          </motion.h1>
          <motion.p
            variants={textAnimate}
            className="w-full text-center desktop:text-left"
          >
            Discover a world of beauty at Glamora, your one-stop shop for
            premium cosmetics. From luxurious skincare to vibrant makeup, our
            curated collection ensures you shine every day. Explore top brands
            and exclusive products that elevate your beauty routine. Unleash
            your glow with Glamora!
          </motion.p>
          <motion.span
            variants={textAnimate}
            className="flex w-full gap-4 justify-center desktop:justify-start items-center"
          >
            <Button>Shop Now</Button>
            <Button variant="outline">Read More</Button>
          </motion.span>
        </motion.div> */}
      </section>

      <section className="flex gap-x-[2.6%] justify-center  gap-y-4 pb-12 flex-wrap items-center w-full  ">
        {productsDescription.map((product) => {
          return (
            <MotionComp
              className="sm:w-[23%] rounded-md sm:min-w-[250px] min-w-[150px] max-w-[300px] sm:max-w-none w-full  shadow"
              key={product.id}
              initial="hidden"
              whileInView="visible"
              variants={hiddenAnimation}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="w-full  min-h-[250px] ">
                <CardHeader className="relative ">
                  <Image
                    src={product.url}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max- width: 1200px) 50vw, 33vw"
                    style={{ borderRadius: "6px", objectFit: "contain" }}
                    width={50}
                    height={50}
                    alt="Cosmetic image"
                  />
                  <CardTitle>For {product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm ">{product.description}</p>
                </CardContent>
                <CardFooter className="flex w-full justify-end">
                  <Button className="h-[30px]">
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </Button>
                </CardFooter>
              </Card>
            </MotionComp>
          );
        })}
      </section>
      <HomeCarouselComp title="New Arrivals" />
      <HomeCarouselComp
        dataFetchingParam="nail_polish"
        title="Nail Polish Products"
      />
      <HomeCarouselComp
        dataFetchingParam="lipstick"
        title=" Lipstick Products"
      />
      <MotionComp
        as="section"
        initial="hidden"
        whileInView="visible"
        className="flex flex-col gap-4"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.5 }}
      >
        <MotionComp
          as="h2"
          variants={textAnimate}
          className={`w-full text-center font-bold font-playfair ${playfair.variable} text-2xl sm:text-3xl`}
        >
          Subscribe for exclusive offers
        </MotionComp>

        <InputWithButton />
      </MotionComp>
    </main>
  );
}
