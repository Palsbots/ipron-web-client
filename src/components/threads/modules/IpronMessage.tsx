import { AnimatePresence, motion } from "framer-motion"
import { useContext, useEffect } from "react"
import { IfroAttributes } from "../../../lib/IfroEntity"
import IpronContext from "../../utils/IpronContext"
import useSound from "../../utils/Sound"
//
import styles from '../../../styles/components/threads/modules/IpronMessage.styles'

//
interface P {
  data: IfroAttributes
  onNext: VoidFunction
}

//
const IpronMessage: React.FC<P> = ({ data, onNext }) => {
  //
  const { playSound: isPlaySound } = useContext(IpronContext)

  // ---
  // 音声ファイルの再生完了
  const audioComplete = () => {
    onNext()
  }

  // ---
  // 音声ファイルのフック
  const soundURL = isPlaySound ? data.client_speech_content_url : null
  const { audioState, loading, playSound } = useSound(soundURL, audioComplete)
  
  //
  useEffect(() => {
    if (window) {
      if (!soundURL) {
        // 音声ファイルが指定されていないので、次のノードへ
        window.setTimeout(() => onNext(), 100)
      }
    }
  }, [])


  // 音声ファイルのロード・エフェクト
  useEffect(() => {
    if (soundURL && loading) {
      // 音声ファイルが指定されていて、ローディングが完了したので再生する
      playSound()
    }
  }, [loading])

  // ---
  if (soundURL && !loading) {
    return (<div css={styles.container}>
      <span>...loading</span>
    </div>)
  }

  // ---
  //
  return (<div css={styles.container}>
    {/* */}
    {/* <span css={styles.message}>{data.client_rendering_content}</span> */}
    <span css={styles.message} dangerouslySetInnerHTML={{ __html: data.client_rendering_content! }}></span>
    {/* ロードが完了（音声ファイルが有る）していて、Audioの状態が待ちの場合： */}
    { loading && !audioState && <>
      <div>
        <button onClick={playSound}>Play</button>
      </div>
        </>}
  </div>)
}

//
export default IpronMessage