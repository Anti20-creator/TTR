import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './City.css'
import { 
    actualGoalIndex,
    actualPlayerGoals,
    hoveredData
 } from '../../../features/dataSlice'

function City({x, y, name, modifier}) {

    const [selected, setSelected] = useState(false)
    const [active, setActive] = useState(false)
    const index = useSelector(actualGoalIndex)
    const goals = useSelector(actualPlayerGoals)
    const hoveredCities = useSelector(hoveredData)

    const makeSelected = (e) => {
        e.stopPropagation()
        setSelected(!selected)
        if(selected){
            e.target.parentNode.parentNode.classList.remove('selectedCity')
        }else{
            e.target.parentNode.parentNode.classList.add('selectedCity')
        }
        console.log(e.target.classList)
    }
    
    useEffect(() => {
        if(goals && goals.length > 0){
            if(goals[index].toCity == name || goals[index].fromCity == name){
                console.log(name)
                setActive(true)
            }else{
                setActive(false)
            }
        }
    }, [goals, index])

    useEffect(() => {
        if(hoveredCities.fromCity == name || hoveredCities.toCity == name){
            console.log(hoveredCities)
            setActive(true)
        }else{
            setActive(false)
        }
    }, [hoveredCities])

    return (
        <div 
            className={'city ' + name + ' ' + active } 
            style={{position: 'absolute', top: y+'%', left: x+'%', zIndex:99999}}
            onClick={(e) => makeSelected(e)} >
            <p className={"mapCity--name " + modifier} onClick={(e) => makeSelected(e)} ><b>{name}</b></p>
            <div className="circle"></div>
            <div className="selected"></div>
        </div>
    )
}

export default City
