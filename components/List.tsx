
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
            <style jsx>{`
                div {
                    flex: 1;
                }
                figure {
                    margin: 0;
                    padding: 16px;
                    background: #14359a;
                    border-radius: 8px;
                }
                ul {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    margin: 0;
                    padding: 0;
                    gap: 16px;
                    padding: 40px;
                    max-height: ;
                }
                figcaption {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
                blockquote {
                    margin: 0;
                }
            `}</style>

            <div>
                <ul>
                    {idiots.map( (idiot, index) => (
                        <li key={index}>
                            <figure>
                                <blockquote>
                                    {idiot.quote}
                                </blockquote>
                                <figcaption>
                                    <p>By: <cite>{idiot.name}</cite></p>
                                    <span className='list__button--remove' onClick={() => handleDelete(idiot.id)}>🗑️🚽</span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default List