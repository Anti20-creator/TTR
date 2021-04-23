import React from 'react'

function LineBetweenPoints({fromX, fromY, toX, toY, color, stroke}) {
    
    toX = (toX * window.innerWidth + 500) / window.innerWidth
    const width = Math.sqrt(Math.pow(fromX - toX, 2) + Math.pow(fromY - toY, 2))
    const a = Math.abs(fromX - toX)
    const b = Math.abs(fromY - toY)
    const c = Math.sqrt(a*a + b*b)

    let alpha 
    if(fromX < toX){
        alpha = 180 - (Math.asin(a/b) * 180 / Math.PI) - 7
    }else{
        alpha = (Math.asin(a/b) * 180 / Math.PI) + 7
    }
    console.log(alpha, a, b, c, fromX, fromY)

    return (
        <svg style={{position: 'absolute', width: '100%', height: '100%'}}>
            <line x1={fromX + '%'} y1={fromY + '%'} x2={toX + '%'} y2={toY + '%'} style={{stroke: color,strokeWidth: stroke}} />
        </svg>
        /*<div 
            style={{
                position: 'absolute', 
                left: 'calc(' + (fromX + toX) / 2 + '% - 3px)', 
                top: (fromY + toY) / 2 + '%',
                width: '2px',
                height: width + '%',
                backgroundColor: 'red',
                transform: 'translate(-50%, -50%) rotate(' + (alpha) + 'deg)'}} 
            className="lineBetween">
            
        </div>*/
    )
}

export default LineBetweenPoints
