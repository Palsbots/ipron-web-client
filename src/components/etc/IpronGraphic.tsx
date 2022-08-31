import { motion } from 'framer-motion'
import { css } from "@emotion/react"

const styles = {
  container: css`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: center;
    padding: 0 25vw 20vw 25vw;
  `,
  images: css`
    width: 100%;
    height: auto;
  `
}

//
const IpronGraphic: React.FC = () => {
  //
  const animate = {
    y: [0, 10, 0]
  }
  const transition = {
    duration: 5,
    repeat: Infinity,
    repeatDelay: 0
  }
  //
  return (
    <div css={styles.container}>
      <motion.img
        animate={animate}
        transition={transition}
        css={styles.images}
        src="./images/ipron.svg"
        width="142"
        height="146"
        alt="イプロン"
      />
    </div>
  )
}

//
export default IpronGraphic