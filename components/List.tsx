
import type { FunctionComponent } from 'react'
import { Quote } from '../types/types'

import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Create from './Create'

const List: FunctionComponent<{ initialQuotes: Quote[] }> = (props) => {
    console.log(props);
    
    const [parent] = useAutoAnimate<HTMLUListElement>()
    const [quotes, setQuotes] = useState<Quote[]>(props.initialQuotes)
  
    const moreQuotes = (addedQuote: Quote) => {
      setQuotes([...quotes, addedQuote])
    }
  
    const removeQuote = (removedQuote: Quote) => {
      setQuotes(quotes.filter((item) => item.id !== removedQuote.id))
    }

    const handleDelete = async (id: number) => {
        const response = await fetch(`/api/post/${id}`, { method: 'DELETE' })
        const removedQuote = await response.json()

        alert(`${removedQuote.name} quote: has been removed`)
        
        removeQuote(removedQuote)
    }

    return (
        <>
            <style jsx>{`
                figure {
                    margin: 0;
                    padding: 16px;
                    background: #14359a;
                    border-radius: 8px;
                }
                ul {
                    flex: 1;
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

            <ul ref={parent}>
                {quotes.map( (quote, index) => (
                    <li key={index}>
                        <figure>
                            <blockquote>
                                {quote.quote}
                            </blockquote>
                            <figcaption>
                                <p>By: <cite>{quote.name}</cite></p>
                                <span className='list__button--remove' onClick={() => handleDelete(quote.id)}>🗑️</span>
                            </figcaption>
                        </figure>
                    </li>
                ))}
            </ul>

            <Create moreQuotes={moreQuotes} />
        </>
    )
}

export default List