import { useState } from "react"
import { useCookies } from "react-cookie";

//
const COOKIE_NAME = 'ipron-app'
//
export default function useIfroUser () {
  // クッキー
  const [cookies, setCookie, resetCookie] = useCookies([COOKIE_NAME])
  // ---
  //
  const [user, setUser] = useState(cookies[COOKIE_NAME])

  //
  const createUser = async () => {
    //
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL!}/clients/projects/users`, {
        method: 'POST',
        headers: {
          'X-Project-Key': process.env.REACT_APP_PROJECT_KEY!,
          'X-Project-Secret': process.env.REACT_APP_PROJECT_SECRET!
        }
      }).then(r => r.json())
      //
      const uid = res.data.attributes.uid
      if (uid) {
        setCookie(COOKIE_NAME, uid, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          secure: false
        })
        setUser(uid)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // ---
  //

  //
  return {
    user,
    createUser,
  }
}