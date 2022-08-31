import { css } from "@emotion/react";

const styles = {
  container: css`
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  `,
  listBlock: css`
    width: 100%;
    padding: 0 3vw 30px 3vw;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  `,
  listItem: css`
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: end;
  `,
  listItemMessage: css`
    justify-content: start;
  `,
  /* */
  loadingBlock: css`
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
  `
}

//
export default styles