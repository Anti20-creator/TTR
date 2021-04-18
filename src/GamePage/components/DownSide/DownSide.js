import React, { useState } from 'react'
import './DownSide.css'
import GoalCard from '../GoalCard'
import CardInHand from './CardInHand'
import PlayerHand from './PlayerHand'
import DrawDestinationCards from './DrawDestinationCards'
import { useSelector } from 'react-redux'
import { gameState, actualPlayerHand, actualPlayerGoals } from '../../../features/dataSlice'

function DownSide() {

    const cardsInHand = useSelector(actualPlayerHand)

    const goalCards = useSelector(actualPlayerGoals)

    const [begin, setBegin] = useState(false)
    const earlyGameState = useSelector(gameState)

    return (
        <div className="downSide">
            {earlyGameState != 'DESTINATION_CHOOSING' &&
            <GoalCard data={goalCards} />}
            {earlyGameState != 'DESTINATION_CHOOSING' && <PlayerHand cards={cardsInHand} />}
            {earlyGameState == 'DESTINATION_CHOOSING' && <DrawDestinationCards clickEvent={() => setBegin(true)} />}
        </div>
    )
}

export default DownSide
