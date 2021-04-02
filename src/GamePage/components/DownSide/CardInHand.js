import React from 'react'
import './CardInHand.css'

function CardInHand({color, count}) {
    return (
        <div className="cardInHand">
            <img src={process.env.PUBLIC_URL + '/Cards/' + color + "Card.jpg"} alt=""/>
            {count > 1 && <p className="cardCount">{count}</p>}
        </div>
    )
}

export default CardInHand
