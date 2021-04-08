import React from 'react'
import './TrainRoute.css'

function TrainRoute({ placeholderColor, x, y, rotate, playerHolding }) {
    return (
        <div className="trainRoute" style={{position: 'absolute', top: y+'%', left: x+'%', zIndex:0}}>
            <div 
                className='circle' 
                style={{backgroundColor: placeholderColor}}>
            </div>
        </div>
    )
}

export default TrainRoute
