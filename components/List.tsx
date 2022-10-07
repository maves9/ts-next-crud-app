
import { Idiot } from '../types/types'
import type { FunctionComponent } from 'react'

const List: FunctionComponent<{ idiots: Idiot[] }> = ({ idiots }) => {
    return (
        <>
            {idiots.map( (idiot, index) => (
                <figure key={index}>
                <blockquote>
                    {idiot.quote}
                </blockquote>
                <figcaption>
                    - By: <cite>{idiot.name}</cite>
                </figcaption>
                <hr />
                </figure>
            ))}
        </>
    )
}

export default List