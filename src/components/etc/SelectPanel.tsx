import { css } from "@emotion/react"
import { motion } from "framer-motion"
import variables from "../../styles/variables.styles"
import { SOUND_STATE } from "../IpronRoot"

//
const styles = {
  container: css`
    position: relative;
    z-index: 5;
    background-color: #fffc;
    padding: 1.7rem;
    border-radius: 12px;
    box-shadow: 0 6px 8px #0003;
  `,
  label: css`
    font-size: 1.1rem;
    text-align: center;
  `,
  // ルートの選択ボタン
  buttons: css`
    display: flex;
    justify-content: center;
    margin-top: .8rem;
    column-gap: 2px;
    > button {
      background-color: var(--primary);
      width: 100%;
      padding: .7em 0;
      > span {
        pointer-events: none;
        color: #fff;
        ${variables.jpFont}
        font-size: 1.1rem;
        font-weight: bold;
        line-height: 1em;
        letter-spacing: .1em;
      }
      &:first-of-type {
        border-radius: 6px 0 0 6px;
        background: linear-gradient(335deg, #00549d, var(--primary))
      }
      &:last-of-type {
        border-radius: 0 6px 6px 0;
        background: linear-gradient(335deg, #00ac46, var(--secondary))
      }
    }
  `
}

//
interface P {
  onState: (value: SOUND_STATE) => void
}

//
const SelectPanel: React.FC<P> = ({ onState }) => {
  // 演出
  const variants ={
    exit: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  }

  //
  return (
    <motion.div
      variants={variants}
      exit="exit"
      css={styles.container}
    >
      <h5 css={styles.label}>音声モードを使用しますか？</h5>
      <div css={styles.buttons}>
        <button onClick={() => onState('play')} data-gtmname="音声選択" data-gtmvalue="On">
          <span>はい</span>
        </button>
        <button onClick={() => onState('mute')} data-gtmname="音声選択" data-gtmvalue="Off">
          <span>いいえ</span>
        </button>
      </div>
    </motion.div>
  )
}

//
export default SelectPanel