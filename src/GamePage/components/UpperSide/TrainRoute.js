import React from 'react'
import './TrainRoute.css'

function TrainRoute({ placeholderColor, x, y, rotate, playerHolding }) {
    return (
        <div className="trainRoute" style={{position: 'absolute', top: y+'%', left: x+'%'}}>
            <div className={playerHolding ? 'circle--active' : 'circle'} style={{backgroundColor: placeholderColor, transform: 'translate(-50%, 50%) rotate(' + rotate + 'deg)', border: '2px solid ' + playerHolding}}></div>
        </div>
    )
}

export default TrainRoute
