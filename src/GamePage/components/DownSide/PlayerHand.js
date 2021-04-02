import React from 'react'
import CardInHand from './CardInHand'
import './PlayerHand.css'

function PlayerHand({ cards }) {
    return (
        <div className="playerHand">
            {cards.map(card => {
                return <CardInHand color={card.color} count={card.count} key={card.color + card.count} />
            })}
        </div>
    )
}

export default PlayerHand
