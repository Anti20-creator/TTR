import React, { useEffect, useState } from 'react'
import store from '../../../app/store'
import Card from '../Card'
import Deck from '../Deck'
import Drawer from '../Drawer'
import './RightPanel.css'

function RightPanel() {

    

    return (
        <div className="rightPanel">
            <Deck coverImg="Cover" count="45" />
            <Drawer />
            <Deck coverImg="Cover" count="22" />
        </div>
    )
}

export default RightPanel
