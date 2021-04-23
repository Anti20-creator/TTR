import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './City.css'
import { 
    actualGoalIndex,
    actualPlayerGoals,
    hoveredData,
    selectedFirstCity,
    selectFirstCity,
    neighbourCitiesData,
    gameState,
    selectSecondCity,
    isHovering
 } from '../../../features/dataSlice'

function City({x, y, name, modifier}) {

    const [selected, setSelected] = useState(false)
    const [isNeighbour, setIsNeighbour] = useState(false)
    const [active, setActive] = useState(false)
    const index = useSelector(actualGoalIndex)
    const goals = useSelector(actualPlayerGoals)
    const hoveredCities = useSelector(hoveredData)
    const dispatch = useDispatch()
    const selectedF = useSelector(selectedFirstCity)
    const neighbours = useSelector(neighbourCitiesData)
    const gameS = useSelector(gameState)
    const currentlyHovered = useSelector(isHovering)

    const makeSelected = (e) => {
        e.stopPropagation()
        if(neighbours.includes(name)){
            dispatch(selectSecondCity(name))
        }else{
            dispatch(selectFirstCity(name))
        }
        if(selectedF != name){
            setSelected(false)
        }else{
            setSelected(true)
        }
    }
    
    useEffect(() => {
        if(gameS == 'IN_GAME' && goals && goals.length > 0 && currentlyHovered){
            if(goals[index].toCity == name || goals[index].fromCity == name){
                //console.log(name)
                setActive(true)
            }else{
                setActive(false)
            }
        }else{
            setActive(false)
        }
    }, [currentlyHovered, goals, index, gameS])
    
    useEffect(() => {
        if(hoveredCities.fromCity == name || hoveredCities.toCity == name){
            //console.log(hoveredCities)
            setActive(true)
        }else{
            setActive(false)
        }
    }, [hoveredCities])

    useEffect(() => {
        if(selectedF != name){
            setSelected(false)
        }else{
            setSelected(true)
        }
    }, [selectedF])
    
    useEffect(() => {
        if(!neighbours.includes(name)){
            setIsNeighbour(false)
        }else{
            setIsNeighbour(true)
        }
    }, [neighbours])
    
    return (
        <div 
        className={'city ' + name + ' ' + active + (selected ? ' selectedCity' : '') + (isNeighbour ? ' neighbour' : '') } 
        style={{position: 'absolute', top: y+'%', left: x+'%', zIndex:99999}}
            onClick={(e) => makeSelected(e)} >
            <p className={"mapCity--name " + modifier} onClick={(e) => makeSelected(e)} ><b>{name}</b></p>
            <div className="circle"></div>
            <div className="selected"></div>
        </div>
    )
}

export default City
