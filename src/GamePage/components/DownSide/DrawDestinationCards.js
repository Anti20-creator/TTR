import React, { useEffect, useState } from 'react'
import './DrawDestinationCards.css'
import DestinationCard from './DestinationCard'
import { ticketToRideData } from '../../../mapdata/MapData.js'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { acceptDestinations, currentGoalCards, ownPlayerGoalOptions } from '../../../features/dataSlice'

import {currentIdx} from '../../../features/dataSlice'
import {synchronizeStep, getRoomId, getPlayerId} from '../../../socket/ClientSocket'

function DrawDestinationCards({clickEvent}) {

    const [cards, setCards] = useState([])
    const dispatch = useDispatch()
    //const cardSelector = useSelector(currentGoalCards)
    const cardSelector = useSelector(ownPlayerGoalOptions)
    const cIdx = useSelector(currentIdx)

    useEffect(() => {
        console.log(cards)
    }, [cards])

    function addRemoveFromHand(card) {
        const oldCards = cards
        let newData = oldCards
        if(cards.includes(card)){
            setCards(cards.filter(item => item != card))
             newData = oldCards.filter(item => item != card)            
        }else{
            setCards([...oldCards, card])
        }
    }

    function acceptCards() {
        const notWanted = cardSelector.filter(card => !cards.includes(card))
        if(cIdx == getPlayerId()){
            dispatch(acceptDestinations({
                selected: cards,
                returnToDeck: notWanted 
            }))
            synchronizeStep()
            setCards([])
        }
    }
    
    return (
        <div className="drawDestinationCards">
            {cardSelector != undefined && cardSelector.map(i => {
                return  <DestinationCard 
                            from={i.fromCity}
                            to={i.toCity}
                            points={i.value}
                            clickAction={() => addRemoveFromHand(i)}
                            defaultSelection="false"
                            key={i.id} />
                
            })}
            <Button disabled={cards.length == 0} variant="contained" color="primary" onClick={acceptCards} >
                K??sz
            </Button>
        </div>
    )
}

export default DrawDestinationCards
