import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../../app/store'
import { onBoardCards } from '../../features/dataSlice'
import Card from './Card'

function Drawer() {

    const [cards, setCards] = useState([])
    const data = useSelector(onBoardCards)

    useEffect(() => {
        setCards(data)            
    }, [data])

    return (
        <div>
            {data.map((color, i) => {
                return <Card cardColor={color} idx={i} key={i} />
            })}
        </div>
    )
}

export default Drawer
