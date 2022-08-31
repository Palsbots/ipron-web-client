import { css } from "@emotion/react";

const IpronOptionListing = {
  container: css`
    display: flex;
    flex-direction: column;
    background-color: #ffffffcc;
    border: 2px solid var(--primary);
    backdrop-filter: blur(4px);
    padding: 6px 6px;
    border-radius: 12px;
    box-shadow: 0px 3px 5px #00000022;
    margin-left: 15vw;
  `,
  containerComplete: css`
    padding: 10px 14px;
  `,
  buttons: css`
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    border-bottom: 1px dotted #999;
    padding-bottom: 7px;
    margin-bottom: 7px;
    > button {
      padding: 6px 10px 5px;
      background-color: var(--primary);
      border-radius: 6px;
      > span {
        pointer-events: none;
        font-family: 'M PLUS Rounded 1c', sans-serif;
        font-size: 1rem;
        font-weight: 700;
        white-space: nowrap;
        line-height: 1em;
        color: #fff;
      }
    }
  `,
}

//
export default IpronOptionListing