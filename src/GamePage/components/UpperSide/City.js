import React, { useState } from 'react'
import './City.css'

function City({x, y, name, modifier, goalCity}) {

    const [selected, setSelected] = useState(false)

    const makeSelected = (e) => {
        e.stopPropagation()
        setSelected(!selected)
        if(!selected){
            e.target.parentNode.parentNode.classList.remove('selectedCity')
        }else{
            e.target.parentNode.parentNode.classList.add('selectedCity')
        }
        console.log(e.target.classList)
    }

    return (
        <div 
            className={'city ' + name + ' ' + goalCity } 
            style={{position: 'absolute', top: y+'%', left: x+'%', zIndex:99999}}
            onClick={(e) => makeSelected(e)} >
            <p className={"mapCity--name " + modifier} onClick={(e) => makeSelected(e)} ><b>{name}</b></p>
            <div className="circle"></div>
            <div className="selected"></div>
        </div>
    )
}

export default City
