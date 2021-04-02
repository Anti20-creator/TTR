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
    ]
    return (
        <div className="downSide">
            <GoalCard from="Athen" to="Budapest" points="15" />
            <PlayerHand cards={cardsInHand} />
        </div>
    )
}

export default DownSide
