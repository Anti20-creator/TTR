import React from 'react'
import LeftPanel from './LeftPanel'
import Map from './Map'
import RightPanel from './RightPanel'
import './UpperSide.css'

function UpperSide() {
    
    return (
        <div className="upperSide">
            <LeftPanel />
            <Map />
            <RightPanel />
        </div>
    )
}

export default UpperSide
