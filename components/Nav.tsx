import { useState, FunctionComponent } from 'react'
import Link from "next/link"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/router";

const Nav: FunctionComponent = (): JSX.Element => {
    const { status, data } = useSession()
    const [ open, setOpen ] = useState(false)
    const { route } = useRouter()

    let navLinks = [
        { href: '/', title: 'Dashboard'},
        { href: '/signin', title: 'Sign in here' },
        { href: '/signup', title: 'Sign up here' }
    ]

    if (status === 'authenticated') {
        navLinks = [
            { href: '/', title: 'Dashboard' },
            { href: '/profile', title: 'Profile' }
        ]
    }

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
                .link.active {
                    pointer-events: none;
                    text-decoration: none;
                    font-weight: 600;
                }
            `}</style>

            <header>
                <button onClick={() => setOpen(true)}>Open</button>

                {open && (
                    <nav>
                        <button onClick={() => setOpen(false)}>Close</button>

                        {navLinks.map(({ href, title }) => ( 
                            <Link key={href} href={href}>
                                <a className={`link ${route === href ? 'active' : ''}`}>
                                    {title}
                                </a>
                            </Link> 
                        ))}

                        {status === 'authenticated' && (
                            <>Logged in as {data?.user?.email}</>
                        )}
                    </nav>
                )}
            </header>
        </>
    )
}

export default Nav