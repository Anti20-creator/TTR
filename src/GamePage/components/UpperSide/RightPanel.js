import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import store from '../../../app/store'
import Card from '../Card'
import Deck from '../Deck'
import Drawer from '../Drawer'
import { trainDeckLength, goalDeckLength } from '../../../features/dataSlice'
import './RightPanel.css'

function RightPanel() {

    const trainCardsLength = useSelector(trainDeckLength)
    const goalCardsLength = useSelector(goalDeckLength)

    return (
        <div className="rightPanel">
            <Deck coverImg="Cover" count={trainCardsLength} />
            <Drawer />
            <Deck coverImg="Cover" count={goalCardsLength} goalDeck={true} />
        </div>
    )
}

export default RightPanel
