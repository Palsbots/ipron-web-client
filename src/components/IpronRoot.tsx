import { css } from "@emotion/react"
import { AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useIfroRewinds } from "../lib/IfroThread"
import IpronGraphic from "./etc/IpronGraphic"
import SelectPanel from "./etc/SelectPanel"
import IpronThread from "./threads/IpronThread"
import IpronContext from "./utils/IpronContext"

//
const styles = {
  // ルート
  container: css`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
}

//
export type SOUND_STATE = 'none' | 'play' | 'mute'

//
interface P {
  uid: string
}

//
const IpronRoot: React.FC<P> = ({uid}) => {

  // AudioContextを配送する
  const provideAudioContext = useRef<AudioContext>()
  //
  const [soundState, setSoundState] = useState<SOUND_STATE>('none')

  // スレッドの先頭への巻き戻し
  const { isLoading } = useIfroRewinds(uid)

  // ---
  // 初期処理
  useEffect(() => {
    // プロバイドするAudioContextの用意
    // @ts-ignore
    provideAudioContext.current = new (window.AudioContext || window.webkitAudioContext)()

    // 解除処理
    return () => {
      provideAudioContext.current?.close()
      provideAudioContext.current = undefined
    }
  }, [])

  //
  return (
    <IpronContext.Provider value={{ audio: provideAudioContext.current, playSound: soundState === 'play'}}>
      <div css={styles.container}>
        <AnimatePresence>
          {soundState === 'none' && <SelectPanel onState={(state) => setSoundState(state)} />}
        </AnimatePresence>
        {/* 先頭への巻き戻しが終了したら */}
        {(soundState !== 'none' && !isLoading) && <IpronThread uid={uid} />}
        {/* */}
        <IpronGraphic />
      </div>
    </IpronContext.Provider>
  )
}

//
export default IpronRoot