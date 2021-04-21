import React from 'react'
import Card from './Card'
import './Deck.css'

function Deck({ count, coverImg, goalDeck = false }) {
    return (
        <div className="deck">
            <Card cardColor={coverImg} goalDeckCover={goalDeck} />
            <p className="deckCount"> {count} </p>
        </div>
    )
}

export default Deck
