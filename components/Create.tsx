import { useEffect, useState } from 'react'

const Create = ({ moreIdiots }) => {
    const [state, setState] = useState({'name': '', 'quote': ''})

    const addQuote = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/post`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(state),
            })

            const newData = await response.json()

            moreIdiots(newData)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setState({'name': '', 'quote': ''})
    }, [moreIdiots])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({ ...state, [name]: value });
    }

    return (
        <form onSubmit={addQuote}>
            <input
                autoFocus
                name="name"
                onInput={handleChange}
                placeholder="Name"
                type="text"
                value={state.name}
            />
            <textarea
                cols={50}
                name="quote"
                onChange={handleChange}
                placeholder="Quote"
                rows={2}
                value={state.quote}
            />
            <button>Add quote</button>
        </form>
    )
}

export default Create