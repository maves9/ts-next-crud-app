import { useEffect, useState, FunctionComponent, FormEvent, Dispatch } from 'react'

import type { Idiot, NewIdiot } from '../types/types'

const Create: FunctionComponent<{moreIdiots: Dispatch<Idiot>}> = ({ moreIdiots }) => {
    const [state, setState] = useState<NewIdiot>({'name': '', 'quote': ''})

    const addQuote = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state)
            })

            const addedIdiot: Idiot = await response.json()

            moreIdiots(addedIdiot)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        setState({'name': '', 'quote': ''})
    }, [moreIdiots])

    const handleChange = ({target} : {target: HTMLInputElement | HTMLTextAreaElement}) => {
        const {name, value} = target
        setState({ ...state, [name]: value });
    }

    return (
        <>
            <style jsx>{`
                form {
                    display: flex;
                    flex-direction: column;
                    padding: 40px;
                    gap: 16px;
                }
                input,
                textarea,
                button {
                    border-radius: 8px;
                    padding: 16px;
                    border: #ccc solid;
                }
                button {
                    background: #14359a;
                    color: #fff;
                    border: 0;
                    font-weight: 600;
                    cursor: pointer;
                }
            `}</style>
            <form onSubmit={addQuote}>
                <input
                    autoFocus
                    required
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    type="text"
                    value={state.name}
                />
                <textarea
                    cols={50}
                    required
                    name="quote"
                    onChange={handleChange}
                    placeholder="Quote"
                    rows={2}
                    value={state.quote}
                />
                <button>Add Quote</button>
            </form>
        </>
    )
}

export default Create