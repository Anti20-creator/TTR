import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import './Card.css'
import store from '../../app/store'
import { drawCardToBoard, initOnBoardCars, onBoardCards, drawDestinationsInGame } from '../../features/dataSlice'

function Card({cardColor, idx, goalDeckCover = false}) {

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
        if(!goalDeckCover){
            e.target.style.animation = 'cardOutAnimation 1s'
            setTimeout(() => {
                dispatch(drawCardToBoard({
                    idx: idx,
                    color: color
                }))
                setTimeout(() => {
                    e.target.style.animation = ''
                }, 300)
            }, 700)
        }else{
            dispatch(drawDestinationsInGame())
        }
    }

    return (
        <div className="gameCard" onClick={(e) => goOut(e)}>
            <img src={ process.env.PUBLIC_URL + "/Cards/" + [color] + "Card.jpg"} alt=""/>
        </div>
    )
}

export default Card
