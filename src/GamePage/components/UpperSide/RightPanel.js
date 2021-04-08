import React from 'react'
import Card from '../Card'
import Deck from '../Deck'
import Drawer from '../Drawer'
import './RightPanel.css'

function RightPanel() {

    const mockDeck = [
        <Card cardColor="White" />,
        <Card cardColor="Red" />,
        <Card cardColor="Yellow" />,
        <Card cardColor="Joker" />,
        <Card cardColor="Black" />
    ]

    return (
        <div className="rightPanel">
            <Deck coverImg="Cover" count="45" />
            <Drawer cards={mockDeck} />
            <Deck coverImg="Cover" count="22" />
        </div>
    )
}

export default RightPanel
