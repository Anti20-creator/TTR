import React from 'react'
import './Card.css'

function Card({ cardColor }) {
    return (
        <div className="gameCard">
            <img src={ process.env.PUBLIC_URL + "/Cards/" + cardColor + "Card.jpg"} alt=""/>
        </div>
    )
}

export default Card
