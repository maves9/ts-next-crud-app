
import type { FunctionComponent } from 'react'

import Nav from "../components/Nav"

const Layout: FunctionComponent<{ children: JSX.Element | JSX.Element[], padding?: number }> = ({ children, padding }) => {
    return (
        <>
            <style jsx>{`
                main {
                    max-width: 600px;
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    background: royalblue;
                    padding: ${padding ?? 0}px;
                }
            `}</style>

            <main>
                <Nav />

                {children}
            </main>
        </>
    )
}

export default Layout