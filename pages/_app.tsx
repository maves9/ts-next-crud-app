import type { AppProps } from 'next/app'

import Head from 'next/head'
import Layout from "../components/Layout"
import { SessionProvider } from "next-auth/react"
import { useState } from 'react'

function App({Component, pageProps}: {Component: NextComponentType}) {
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
        button {
          cursor: pointer;
        }
      `}</style>

      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  )
}

export default App
