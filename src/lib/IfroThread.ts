import useSWR from "swr"
import { IfroResponse } from "./IfroEntity"

// ---
// フロント用
//
export type THREAD_TYPE = {
  type: 'speech' | 'listen'
  renderingContent: string | null
  speechContent: string | null
}

// ---
// フェッチ
//
const reqindsFetcher = (url: string, uid: string) => {
  const params = new URLSearchParams()
  params.append('uid', uid)
  //
  return fetch(url, {
    method: 'POST',
    body: params,
    headers: {
      'X-Project-Key': process.env.REACT_APP_PROJECT_KEY!,
      'X-Project-Secret': process.env.REACT_APP_PROJECT_SECRET!
    }
  }).then(r => r.json())
}

// ---
// SWRのオプション
//
const SWRoptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
}

// ---
// 先頭への巻き戻し
//
export const useIfroRewinds = (uid: string) => {
  const { data, error } = useSWR([`${process.env.REACT_APP_API_URL!}/clients/projects/rewinds`, uid], reqindsFetcher, SWRoptions)

  return {
    message: data,
    isLoading: !error && !data,
    isError: error
  }
}

// ---
// スレッドの更新用
//
export const useIfroThreads = (uid: string) => {
  const { data, error, mutate } = useSWR([`${process.env.REACT_APP_API_URL!}/clients/projects/forwards`, uid], reqindsFetcher, SWRoptions)

  return {
    message: data as IfroResponse,
    isLoading: !error && !data,
    isError: error,
    mutate: mutate
  }
}

// ---
// ユーザー側の入力（メッセージ）をIFROに送る
//
export const sendMessage = async (uid: string, message: string) => {
  //
  const params = new URLSearchParams()
  params.append('uid', uid)
  params.append('client_message', message)
  return await fetch(`${process.env.REACT_APP_API_URL!}/clients/projects/forwards`, {
    method: 'POST',
    body: params,
    headers: {
      'X-Project-Key': process.env.REACT_APP_PROJECT_KEY!,
      'X-Project-Secret': process.env.REACT_APP_PROJECT_SECRET!
    }
  }).then(r => r.json())
}
