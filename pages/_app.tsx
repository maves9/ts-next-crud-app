import type { AppProps } from 'next/app'

import { SessionProvider } from "next-auth/react"
import { useState } from 'react'

function App({Component, pageProps}: AppProps) {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <>
      <style jsx global>{`
        body {
          background: #222;
          margin: 0;
          font-family: cursive;
          min-height: 100vh;
        }
        body, a {
          color: #fff;
        }
      `}</style>

      <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default App
