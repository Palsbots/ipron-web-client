import { ChangeEvent, useState } from "react"
//
import styles from '../../../styles/components/threads/modules/IpronInputListing.styles'
import InputElement from "../../etc/InputElement"

//
interface P {
  onSend: (message: string) => void
}

//
const IpronInputListing: React.FC<P> = ({ onSend }) => {
  //
  const [complete, setComplete] = useState('')

  //
  const sendHandle = (value: string) => {
    setComplete(value)
    onSend(value)
  }

  //
  if (complete !== '') {
    return (<div css={styles.container}>
      <span>{complete}</span>
    </div>)
  }

  //
  return (<div css={styles.container}>
    <InputElement onSend={sendHandle} />
  </div>)
}

//
export default IpronInputListing