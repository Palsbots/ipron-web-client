import { useState } from "react"
import { IfroAttributes } from "../../../lib/IfroEntity"
//
import styles from '../../../styles/components/threads/modules/IpronOptionListing.styles'
import InputElement from "../../etc/InputElement"

//
interface P {
  data: IfroAttributes
  onSelect: (value: string) => void
}

//
const IpronOptionListing: React.FC<P> = ({ data, onSelect }) => {
  // ---
  // 選択後の表示用
  const [selectedLabel, setSelectedLabel] = useState('')

  // 選択ハンドラ
  const selectHandle = (label: string, value: string) => {
    // 選択したラベルをステートへ
    setSelectedLabel(label)
    // 値をコールバックに渡す
    onSelect(value)
  }

  // ---
  const onSendHandle = (message: string) => [
    selectHandle(message, message)
  ]

  // ---
  // 念の為
  if (data.current_module_type !== 'OptionListeningScenarioModule' || !data.options) {
    return <></>
  }

  // ---
  // 選択された場合の表示
  if (selectedLabel !== '') {
    return (
      <div css={[styles.container, styles.containerComplete]}>
        <span>{selectedLabel}</span>
      </div>
    )
  }

  // ---
  // IFROで指定された選択肢を表示する
  return (
    <div css={styles.container}>
      <div css={styles.buttons}>
        {data.options.map((opt, idx) => {
          return (
            <button key={`options_${opt.value}_${idx}`} onClick={() => selectHandle(opt.label, opt.value)} data-gtmname={data.current_module_label} data-gtmvalue={opt.label}>
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>

      {/* 自由入力ブロック */}
      <InputElement onSend={onSendHandle} />
    </div>
  )
}

//
export default IpronOptionListing