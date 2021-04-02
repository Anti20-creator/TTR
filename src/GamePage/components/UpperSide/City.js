import React from 'react'
import './City.css'

function City({x, y, name}) {
    return (
        <div className="city" style={{position: 'absolute', top: y+'%', left: x+'%'}}>
            <p className="mapCity--name"><b>{name}</b></p>
            <div className="circle"></div>
        </div>
    )
}

export default City
