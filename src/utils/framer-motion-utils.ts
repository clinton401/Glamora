const leftAnimation = {
    hidden: {
        opacity: 0,
        x: '-100vw',
    },
    visible: {
         x:0,
    opacity:1,
    rotate:[0,10,0],
    transition: {type:"spring",
    bounce:0.4,
    duration:1
    }
}
}
const rightAnimation = {
hidden: {
    x: '100vw',
    opacity: 0
}, 
    visible: {
        x: 0,
        opacity: 1,

        transition: {
            duration: 1,
            type: "spring"
        },
}
}
const textAnimate={
    hidden:{y:100, opacity:0},
    visible:{y:0,
    opacity:1,
transition: {type:"spring",
    bounce:0.4,    
    duration:1}
 }

}
const scaleAnimation = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
      scale: 1,
      opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 1 },
  },
};
const hiddenAnimation = {
    hidden: {
        opacity: 0
    }, visible: {
        opacity: 1,
        transition: {
            duration: 1.5,

        }
    }
}
export {
  rightAnimation,
  leftAnimation,
  textAnimate,
  scaleAnimation,
  hiddenAnimation,
};