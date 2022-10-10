import type { NextPage } from 'next'

import { useState, FormEvent } from 'react'

const Signin: NextPage = () => {
    const [state, setState] = useState({'username': '', 'password': ''})


    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state)
            })

            

        } catch (error) {
            console.error(error)
        }
    }
    
    const handleChange = ({ target } : {target: HTMLInputElement}) => {
        const {name, value} = target
        setState({ ...state, [name]: value });
    }

    return (
        <>
            <style jsx>{`
            
            `}</style>

            <form onSubmit={handleSubmit}>
                <input
                    autoFocus
                    required
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    type="text"
                    value={state.username}
                />
                <input
                    required
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Name"
                    value={state.password}
                />
                <button>Log in</button>
            </form>
        </>
    )

}

export default Signin