import { css } from "@emotion/react"
import { motion } from "framer-motion"

const styles = {
  container: css`
    display: flex;
    justify-content: center;
    column-gap: 8px;
    padding-bottom: 20px;
    > span {
      display: block;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 3px;
    }
  `,
}

//
interface P {
  visible: boolean
}

//
const LoadingClip: React.FC<P> = ({ visible }) => {
  const variants = {
    hidden: {
      opacity: 0,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: 'easeIn'
      }
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3,
        ease: 'easeOut'
      }
    },
  }
  const dotVariants = {
    visible: (custom: number) => ({
      y: [-5, 5, -5],
      transition: {
        delay: custom * 0.2,
        duration: 1.5,
        repeat: Infinity,
      }
    })
  }
  return (
    <motion.div
      variants={variants}
      animate={visible ? 'visible': 'hidden'}
      css={styles.container}
    >
      <motion.span
        custom={0}
        variants={dotVariants}
        animate='visible'
      />
      <motion.span
        custom={1}
        variants={dotVariants}
        animate='visible'
      />
      <motion.span
        custom={2}
        variants={dotVariants}
        animate='visible'
      />
    </motion.div>
  )
}

//
export default LoadingClip