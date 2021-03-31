import React from 'react'
import Card from '../Card'
import Deck from '../Deck'
import './RightPanel.css'

function RightPanel() {
    return (
        <div className="rightPanel">
            <Deck count="45" />
            <Card cardColor="White" />
        </div>
    )
}

export default RightPanel
