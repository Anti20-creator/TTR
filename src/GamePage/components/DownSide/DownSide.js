import React, { useState } from 'react'
import './DownSide.css'
import GoalCard from '../GoalCard'
import CardInHand from './CardInHand'
import PlayerHand from './PlayerHand'
import DrawDestinationCards from './DrawDestinationCards'

function DownSide() {

    const cardsInHand = [
        {color: "White", count: 2},
        {color: "Red", count: 3},
        {color: "Yellow", count: 1},
        {color: "Black", count: 2},
        {color: "Orange", count: 0},
        {color: "Joker", count: 3},
    ]

    const goalCards = [
        {from: 'Zurich', to: 'Budapest', points: '5', completed: false},
        {from: 'Barcelona', to: 'Berlin', points: '22', completed: true}
    ]

    const [begin, setBegin] = useState(false)

    return (
        <div className="downSide">
            {begin &&
            <GoalCard data={goalCards} />}
            {begin && <PlayerHand cards={cardsInHand} />}
            {!begin && <DrawDestinationCards clickEvent={() => setBegin(true)} />}
        </div>
    )
}

export default DownSide
