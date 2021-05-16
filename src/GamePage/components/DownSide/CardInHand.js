import React, { useEffect, useState } from 'react'
import './CardInHand.css'

function CardInHand({color, count, place}) {

    return (
        <div 
            className='cardInHand' 
            style={{transform: 'translateX('+ place*-20 +'%)'}}
            >
            <img src={process.env.PUBLIC_URL + '/Cards/' + color + "CardR.jpg"} alt=""/>
            {count > 1 && <p className="cardCount">{count}</p>}
        </div>
    )
}

export default CardInHand
