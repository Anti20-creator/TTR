import React from 'react'
import './GoalCard.css'

function GoalCard({from, to, points}) {
    return (
        <div className="goalCard">
            <p>{from} - {to}</p>
            <div className="circle">{points}</div>
        </div>
    )
}

export default GoalCard
