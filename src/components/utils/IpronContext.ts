import { createContext } from "react";

// @ts-ignore
export default createContext<{ audio?: AudioContext, playSound: boolean }>({ playSound: false })
