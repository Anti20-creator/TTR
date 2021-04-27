import React from 'react'
import CardInHand from './CardInHand'
import './PlayerHand.css'

function PlayerHand({ cards }) {
    return (
        <div className="playerHand">
            {cards.filter(card => card.count > 0).map((card, idx) => {
                return <CardInHand 
                            color={card.color.capitalize()} 
                            count={card.count} 
                            key={card.color + card.count}
                            place={idx} />
            })}
        </div>
    )
}

export default PlayerHand
