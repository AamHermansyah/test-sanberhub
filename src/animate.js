export const staggerContainer = (staggerChildren = .1, delay = 0.5) => ({
  initial: {},
  animate: {
    transition: {
      delay,
      staggerChildren
    }
  }
})

export const childAnimate = (duration = 0.1) => ({
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration
    }
  }
})