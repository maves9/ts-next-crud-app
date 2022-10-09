
import { Quote } from '../types/types'
import type { FunctionComponent, Dispatch } from 'react'

const List: FunctionComponent<{ quotes: Quote[], removeQuote: Dispatch<Quote> }> = ({ quotes, removeQuote }) => {
    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/post/${id}`, { method: 'DELETE' })
        const removedQuote = await response.json()

        alert(`${removedQuote.name} quote: has been removed`)
        
        removeQuote(removedQuote)
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
                }
                figcaption {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
                blockquote {
                    margin: 0;
                }
                .list__button--remove {
                    cursor: pointer;
                }
            `}</style>

            <div>
                <ul>
                    {quotes.map( (quote, index) => (
                        <li key={index}>
                            <figure>
                                <blockquote>
                                    {quote.quote}
                                </blockquote>
                                <figcaption>
                                    <p>By: <cite>{quote.name}</cite></p>
                                    <span className='list__button--remove' onClick={() => handleDelete(quote.id)}>🗑️🚽</span>
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