import { useContext, useEffect, useRef, useState } from "react"
import IpronContext from "./IpronContext"

/**
 * IFROの音声を取得して再生します
 * @param url IFROのメッセージから送られてくる音声ファイルのURL
 * @param callback 再生が終了した時のコールバック
 */
const useSound = (url: string | null, callback?: VoidFunction) => {
  // ---
  // オーディオコンテキストは共通のものを使う
  const { audio: AudioCtx } = useContext(IpronContext)!
  // オーディオソース
  const audioSource = useRef<AudioBufferSourceNode>()
  // 音声の準備状況ステート
  const [loading, setLoading] = useState(false)
  // AudioContextのステート（初回のユーザーアクションが必要なので）
  const [audioState, setAudioState] = useState(AudioCtx?.state === 'running')

  // ---
  // 
  useEffect(() => {
    // useEffect内で非同期処理を行うので、unmountされていないかのフラグ
    let clearnup = false

    // 音声ファイルを取得してAudioソースを用意する非同期メソッド
    async function loadSoundFile(fileURL: string) {
      // 音声ファイルの取得
      const res = await fetch(fileURL, {
        headers: {
          'X-Project-Key': process.env.REACT_APP_PROJECT_KEY!,
          'X-Project-Secret': process.env.REACT_APP_PROJECT_SECRET!
        },
      })

      if (!clearnup) {
        // 音声データ
        const buffer = await res.arrayBuffer()
        // 音声データからAudioソースの作成
        AudioCtx?.decodeAudioData(buffer, (decodedAudio) => {
          if (!AudioCtx) {
            console.error('Audio Contextが存在しません')
            return
          }
          //
          audioSource.current = AudioCtx.createBufferSource()
          audioSource.current.buffer = decodedAudio
          audioSource.current.connect(AudioCtx.destination)
          // 再生終了時のコールバックの設定
          if (callback) {
            audioSource.current.onended = () => {
              if (!clearnup) {
                callback()
              }
            }
          }
          // 音声の準備が完了したのでフラグの更新
          setLoading(true)
        }, (error) => {
          // エラー
          console.error(error)
        })
      }
    }

    // urlが指定されている場合
    if (url) {
      loadSoundFile(url)
    }

    // 解除処理
    return () => {
      clearnup = false
      if (audioSource.current) {
        audioSource.current.disconnect()
        audioSource.current = undefined
      }
    }
  }, [])

  // ---
  // 音声を再生します
  const playSound = () => {
    if (!AudioCtx) {
      return
    }
    //
    if (audioSource.current && AudioCtx.state !== 'closed') {
      audioSource.current.start(0)
    }
    //
    if (AudioCtx.state === 'running') {
      setAudioState(true)
    }
  }

  // ---
  return {
    audioState,
    loading,
    playSound,
  }
}

//
export default useSound