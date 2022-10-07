
import { Idiot } from '../types/types'
import type { FunctionComponent, Dispatch } from 'react'

const List: FunctionComponent<{ idiots: Idiot[], removeIdiot: Dispatch<Idiot> }> = ({ idiots, removeIdiot }) => {
    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/post/${id}`, { method: 'DELETE' })
        const removedIdiot = await response.json()

        alert(`${removedIdiot.name} quote: has been removed`)
        
        removeIdiot(removedIdiot)
    }

    return (
        <>
            <ul>
                {idiots.map( (idiot, index) => (
                    <li key={index}>
                        <figure>
                            <button onClick={() => handleDelete(idiot.id)}>🗑️🚽</button>
                            <blockquote>
                                {idiot.quote}
                            </blockquote>
                            <figcaption>
                                - By: <cite>{idiot.name}</cite>
                            </figcaption>
                            <hr />
                        </figure>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default List