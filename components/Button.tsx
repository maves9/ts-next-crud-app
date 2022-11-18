
import type { FunctionComponent } from 'react'

const Layout: FunctionComponent<{ title: string }> = ({ title }) => {
    return (
        <>
            <style jsx>{`
                button {
                    cursor: pointer;
                    display: block;
                }
            `}</style>

            <button>{title}</button>
        </>
    )
}

export default Layout