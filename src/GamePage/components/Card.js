import React, { useEffect, useState } from 'react'
import './Card.css'

function Card({cardColor}) {

    //{cardColor} benne lesz, de a húzás animáció miatt így jobban átjön

    const [color, setColor] = useState(randomCardColor())

    useEffect(() => {
        if(cardColor == 'Cover'){
            setColor('Cover')
        }
    }, [color])

    const goOut = (e) => {
        e.target.style.animation = 'cardOutAnimation 1s'
        setTimeout(() => {
            setColor(randomCardColor())
            setTimeout(() => {
                e.target.style.animation = ''
            }, 300)
        }, 700)
    }

    function randomCardColor() {
        const items = ["Joker", "White", "Purple", "Green", "Blue"]
        return items[Math.floor(Math.random() * items.length)]
    }

    return (
        <div className="gameCard" onClick={(e) => goOut(e)}>
            <img src={ process.env.PUBLIC_URL + "/Cards/" + color + "Card.jpg"} alt=""/>
        </div>
    )
}

export default Card
