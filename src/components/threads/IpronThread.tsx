import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { IfroAttributes } from "../../lib/IfroEntity"
import { useIfroThreads, sendMessage } from "../../lib/IfroThread"
import styles from "../../styles/components/threads/IpronThread.styles"
import LoadingClip from "../etc/LoadingClip"
import IpronInputListing from "./modules/IpronInputListing"
import IpronMessage from "./modules/IpronMessage"
import IpronOptionListing from "./modules/IpronOptionListing"

// ---
//
type MESSAGE_TYPE = IfroAttributes & {
  id: string
}
// ---
//
const IpronThread: React.FC<{uid: string}> = ({ uid }) => {
  // IFROとのFetch用
  const { message, mutate } = useIfroThreads(uid)
  // メッセージデータ
  const [messages, setMessages] = useState<MESSAGE_TYPE[]>([])
  // 表示するメッセージ用の配列
  const [visibleMessages, setVisibleMessages] = useState<string[]>([])
  // ローディング
  const [isLoading, setIsLoading] = useState(true)


  // ---
  // リストの参照とリストの高さ保持
  const listRef = useRef<HTMLUListElement>(null)
  const [listHeight, setListHeight] = useState(0)
  // 表示領域
  const visibleHeight = useRef(9999)

  // ---
  // スレッドの更新フック
  // message（新しいIFROのノードデータ）を受信する度に処理を行う
  useEffect(() => {
    if (message) {
      // console.log(message)
      //
      const mesId = Date.now().toString()
      //
      if (message.data.attributes.client_action_type === '0') {
        // IFROのシステムノードなので、次のノードをリクエストする
        mutate()
        // ローディングの変更
        setIsLoading(true)
      } else if (message.data.attributes.client_action_type === '1') {
        // 発話アクションなので、発話（表示）します。
        setMessages([
          ...messages,
          {
            id: mesId,
            ...message.data.attributes
          }
        ])
        setVisibleMessages([
          ...visibleMessages,
          mesId
        ])
        // ローディングの変更
        setIsLoading(false)
        //
        if (message.data.attributes.current_module_type === 'OptionListeningScenarioModule') {
          // 選択肢モジュールはそのままでは聞き取り出来ないので、スレッドを更新して聞き取りモジュールに進める
          mutate()
        }
      } else if (message.data.attributes.client_action_type === '2') {
        // ローディングの変更
        setIsLoading(false)
        // ユーザーのレスポンス待ち
        if (message.data.attributes.current_module_type === 'ListeningScenarioModule') {
          // 自由入力は待ちのみ送られてくるので、messagesに追加する
          setMessages([
            ...messages,
            {
              id: mesId,
              ...message.data.attributes
            }
          ])
          setVisibleMessages([
            ...visibleMessages,
            mesId
          ])
        }
      }
    }
  }, [message])

  // ---
  // エレメントのリサイズ監視
  useEffect(() => {
    if (listRef.current) {
      visibleHeight.current = listRef.current.parentElement?.getBoundingClientRect().height || 9999
      //
      const observer = new ResizeObserver(entries => {
        if (entries[0]) {
          setListHeight(entries[0].contentRect.height)
        }
      })
      const observerTarget = listRef.current
      if (observer && observerTarget) {
        observer.observe(observerTarget)
      }
      return () => {
        if (observer && observerTarget) {
          observer.unobserve(observerTarget)
        }
      }
    }
  }, [listRef])

  // ---
  // 表示領域の高さ制限
  useEffect(() => {
    // 念の為、DOMが増えすぎないように表示領域からある程度はみ出たら削除する
    if (listHeight > visibleHeight.current * 5) {
      // 表示すべきIDリストから、古いものを削除する
      setVisibleMessages(visibleMessages.filter((mesId, index) => index > 0))
    }
    // 表示リストに変更が加わったので、スクロールを初期ポジンション（一番下）にする
    if (listRef.current && listRef.current.parentElement) {
      listRef.current.parentElement.scrollTo(0, listRef.current.getBoundingClientRect().height)
    }
  }, [listHeight])

  // ---
  // IFROにユーザーのメッセージを送信する
  const onSendMessage = async (optionValue: string) => {
    const data = await sendMessage(uid, optionValue)
    // 送信が完了したので更新する
    mutate(data)
  }

  // ---
  // 表示：メッセージを次へ送る
  const nextMessage = () => {
    // 次のノードを取得するリクエストを送る
    mutate()
  }

  // ---
  //
  return (
    <div css={styles.container}>
      <ul css={styles.listBlock} ref={listRef}>
        <AnimatePresence>
        {visibleMessages.map((mesId) => {
          // 表示するメッセージのデータ
          const mesData = messages.find(m => m.id === mesId)
          if (mesData) {
            //
            const messageFlg = mesData.current_module_type === 'SpeechScenarioModule'
            //
            return (<motion.li
              key={mesData.id}
              css={[styles.listItem, messageFlg ? styles.listItemMessage : null]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
            {(() => {
              // ---
              // 各モジュールタイプに合わせてコンポーネントを振り分ける
              if (mesData.current_module_type === 'OptionListeningScenarioModule') {
                // 選択肢を提示するモジュール
                return <IpronOptionListing data={mesData} onSelect={onSendMessage} />
              } else if (mesData.current_module_type === 'ListeningScenarioModule') {
                // 入力を促すモジュール
                return <IpronInputListing onSend={onSendMessage} />
              }
              return <IpronMessage data={mesData} onNext={nextMessage} />
            })()}
          </motion.li>)
          }
        })}
        </AnimatePresence>
      </ul>
      {/* ローディング */}
      <div css={styles.loadingBlock}>
        <LoadingClip visible={isLoading} />
      </div>
    </div>
  )
}

//
export default IpronThread