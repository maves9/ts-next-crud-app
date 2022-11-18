import type { NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const Profile: NextPage = (): JSX.Element => {
    const { data, status } = useSession()
    const router = useRouter()

    useEffect( () => {
        if (status === 'unauthenticated') {
            router.push('/')
        }
    }, [])

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>

            <style jsx>{`
                button {
                    width: auto;
                    display: flex;
                    padding: 8px;
                }
                section {
                    padding: 10px;
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                }
            `}</style>

            <section>
                <h1>Profile</h1>

                {data?.user?.email}

                <button>Remove user</button>
            </section>
        </>
    )
}

export default Profile