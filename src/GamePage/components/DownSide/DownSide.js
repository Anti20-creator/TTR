import React from 'react'
import './DownSide.css'
import GoalCard from '../GoalCard'
import CardInHand from './CardInHand'
import PlayerHand from './PlayerHand'

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

    return (
        <div className="downSide">
            <GoalCard data={goalCards} />
            <PlayerHand cards={cardsInHand} />
        </div>
    )
}

export default DownSide
