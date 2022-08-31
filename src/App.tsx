import { useEffect } from 'react';
import IpronRoot from './components/IpronRoot';
import useIfroUser from './lib/IfroUser';

function App() {
  // チャットユーザー
  const { user, createUser } = useIfroUser()

  // ---
  useEffect(() => {
    // ユーザーの準備
    if (!user) {
      createUser()
    }
  }, [])

  // ---
  // ローディング
  if (!user) {
    return <span>...</span>
  }

  // ---
  return (
    <div>
      <IpronRoot uid={user} />
    </div>
  )
}

export default App;
