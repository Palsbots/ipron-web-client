import { css } from "@emotion/react"
import variables from "./variables.styles";

const style = css`
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

  html, body {
    padding: 0;
    margin: 0;
    ${variables.jpFont}
    font-weight: 400;
    font-size: 15px;
    color: var(--color-900);
    height: 100%;
    margin: 0;
    /* background-color: var(--base); */
    background: linear-gradient(335deg, #8CFF5A, #00BEFF);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  *, *::before, *::after {
    position: relative;
    box-sizing: border-box;
    margin: 0;
  }

  ul, li {
    list-style: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    color: var(--color-900);
  }
`
//
export default style