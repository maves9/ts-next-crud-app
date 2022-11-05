import { useState, FunctionComponent } from 'react'
import Link from "next/link"

const Nav: FunctionComponent = (): JSX.Element => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <style jsx>{`
                header {
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    z-index: 1;
                }
                nav {
                    height: 100vh;
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    background: #1d2e61;
                    padding: 24px;
                    gap: 8px;
                }
            `}</style>

            <header>
                <button onClick={() => setOpen(true)}>Open</button>
                {open && (
                    <nav>
                        <button onClick={() => setOpen(false)}>Close</button>
                        <Link href="./signin">Sign in here</Link>
                        <Link href="./signup">Sign up here</Link>
                    </nav>
                )}
            </header>
        </>
    )
}

export default Nav