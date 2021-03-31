import React from 'react'
import DownSide from './components/DownSide/DownSide'
import UpperSide from './components/UpperSide/UpperSide'

function GamePage() {
    return (
        <div className="gamepage">
            <UpperSide />
            
            <DownSide />
        </div>
    )
}

export default GamePage
