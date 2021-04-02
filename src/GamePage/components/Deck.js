import React from 'react'
import Card from './Card'
import './Deck.css'

function Deck({ count, coverImg }) {
    return (
        <div className="deck">
            <Card cardColor={coverImg} />
            <p className="deckCount"> {count} </p>
        </div>
    )
}

export default Deck
