import React, { useState } from 'react'
import './DownSide.css'
import GoalCard from '../GoalCard'
import CardInHand from './CardInHand'
import PlayerHand from './PlayerHand'
import DrawDestinationCards from './DrawDestinationCards'
import { useSelector } from 'react-redux'
import { gameState, actualPlayerHand, actualPlayerGoals, ownPlayerHand, ownPlayerGoals, currentIdx } from '../../../features/dataSlice'
import { Button } from '@material-ui/core'
import { synchronizeStep, getPlayerId } from '../../../socket/ClientSocket'

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function DownSide() {

    const forceUpdate = useForceUpdate()
    const cardsInHand = useSelector(actualPlayerHand)
    const cardsInHand2 = useSelector(ownPlayerHand)
    const goalCards = useSelector(actualPlayerGoals)
    const goalCards2 = useSelector(ownPlayerGoals)
    const cIdx = useSelector(currentIdx)

    const [begin, setBegin] = useState(false)
    const earlyGameState = useSelector(gameState)

    return (
        <div className="downSide">
            {earlyGameState != 'DESTINATION_CHOOSING' && earlyGameState != 'DESTINATION_IN_GAME' &&
            <GoalCard data={goalCards2} />}
            {earlyGameState != 'DESTINATION_CHOOSING' && earlyGameState != 'DESTINATION_IN_GAME' && <PlayerHand cards={cardsInHand2} />}
            {(earlyGameState == 'DESTINATION_CHOOSING' || earlyGameState == 'DESTINATION_IN_GAME') && <DrawDestinationCards clickEvent={() => {
                if(cIdx == getPlayerId()){
                    setBegin(true)
                }
                //synchronizeStep()
            }}/>}
            <Button onClick={() => {
                forceUpdate()
                synchronizeStep()
            }}>UPDATE</Button>
        </div>
    )
}

export default DownSide
