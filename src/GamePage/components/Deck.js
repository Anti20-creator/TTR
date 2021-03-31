import React from 'react'
import Card from './Card'
import './Deck.css'

function Deck({ count }) {
    return (
        <div className="deck">
            <Card cardColor="Cover" />
            <p className="deckCount"> {count} </p>
        </div>
    )
}

export default Deck
