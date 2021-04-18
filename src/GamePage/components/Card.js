import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import './Card.css'
import store from '../../app/store'
import { drawCardToBoard, initOnBoardCars, onBoardCards } from '../../features/dataSlice'

function Card({cardColor, idx}) {

    //{cardColor} benne lesz, de a húzás animáció miatt így jobban átjön

    const [color, setColor] = useState(cardColor)
    const dispatch = useDispatch()
    const data = useSelector(onBoardCards)

    useEffect(() => {
        console.log('COLOR' + [color])
        setColor(data[idx])
        if(cardColor == 'Cover'){
            setColor('Cover')
        }
    }, [data])

    const goOut = (e) => {
        e.target.style.animation = 'cardOutAnimation 1s'
        setTimeout(() => {
            dispatch(drawCardToBoard(idx))
            setTimeout(() => {
                e.target.style.animation = ''
            }, 300)
        }, 700)
    }

    return (
        <div className="gameCard" onClick={(e) => goOut(e)}>
            <img src={ process.env.PUBLIC_URL + "/Cards/" + [color] + "Card.jpg"} alt=""/>
        </div>
    )
}

export default Card
