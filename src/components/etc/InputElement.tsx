import { css } from "@emotion/react"
import { ChangeEvent, useState } from "react"

//
const styles = {
  container: css`
    display: flex;
    width: 100%;
  `,
  input: css`
    width: 100%;
    font-size: 16px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 6px 0 0 6px;
    outline: none;
  `,
  button: css`
    background-color: var(--primary);
    padding: 5px 10px;
    border-radius: 0 6px 6px 0;
    > span {
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
    }
  `,
  icon: css`
    display: block;
    width: 21px;
    height: auto;
    margin-top: 2px;
    path {
      fill: #fff;
    }
  `
}

//
interface P {
  onSend: (value: string) => void
  placeholder?: string
}
//
const InputElement: React.FC<P> = ({ onSend, placeholder='入力する' }) => {
  //
  const [inputValue, setInputValue] = useState('')

  //
  const changeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  //
  const submitHandle = () => {
    onSend(inputValue)
  }

  return (
    <form onSubmit={submitHandle} css={styles.container}>
      <input
        name="message"
        css={styles.input}
        type="text"
        onChange={changeHandle}
        placeholder={placeholder}
      />
      <button css={styles.button} type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="0 0 48 48" css={styles.icon}>
          <path d="M22.2 28.3h3.6v-6.5h6.5v-3.6h-6.5v-6.5h-3.6v6.5h-6.5v3.6h6.5ZM2.75 45.25V7.45q0-1.9 1.375-3.325Q5.5 2.7 7.45 2.7h33.1q1.9 0 3.325 1.425Q45.3 5.55 45.3 7.45v25.1q0 1.9-1.425 3.3t-3.325 1.4h-29.8Z"/>
        </svg>
      </button>
    </form>
  )
}

//
export default InputElement