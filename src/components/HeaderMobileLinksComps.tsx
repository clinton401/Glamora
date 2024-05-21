"use client"
import {useEffect, useState} from "react";
import { Sling as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import HeaderLinks from "./HeaderLinks";
import MobileModeToggle from "./MobileModeToggle";
const containerVariant = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      // delay: 0.5,
      staggerChildren: 0.5,
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
const textAnimation = {
  hidden: {
    opacity: 0,
    x: "-100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
type LinksObjType = {
    id: number,
    name: string,
    path: string
};

function HeaderMobileLinksComps({ linksObject }: {linksObject: LinksObjType[]}) {
    const [isOpen, setOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        if (!isOpen) {
            setNavOpen(false)
        } else {
 setNavOpen(true)
        }
    }, [isOpen])

  return (
      <>
          
      <button
        className="absolute z-50 left-0 top-1/2 translate-y-[-50%]"
        onClick={() => setNavOpen(!navOpen)}
      >
        <Hamburger toggled={isOpen} toggle={setOpen} size={25} rounded />
      </button>

      <AnimatePresence>
        {navOpen && (
          <motion.nav
            className="fixed fixed_margin top-0 left-0 pt-[70px] max-w-[1800px]  flex items-center justify-center min-h-[400px] w-full h-dvh bg-background"
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="modal"
                  >
                      <span className='absolute top-4  mobiletogglespan'>
                        <MobileModeToggle />
                      </span>
                      <ul className=" w-full flex flex-col items-center justify-center gap-6 relative">
                        
              {linksObject.map((links) => (
                <motion.li
                  key={links.id}
                  onClick={() => {setNavOpen(!navOpen);
                    setOpen(false);
                  }}
                  variants={textAnimation}
                  className=" items-center flex justify-center "
                >
                  <HeaderLinks name={links.name} path={links.path} />
                </motion.li>
              ))}
          
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default HeaderMobileLinksComps
