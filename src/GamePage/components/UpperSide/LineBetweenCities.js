import React from 'react'
import { ticketToRideData } from '../../../mapdata/MapData'
import LineBetweenPoints from './LineBetweenPoints'

function LineBetweenCities({fromCity, toCity, color, before, trainColor, stroke}) {
    
    let coordinates = []
    const start = Object.keys(ticketToRideData.cities).find(x => {
        return ticketToRideData.cities[x].city == fromCity
    })
    coordinates.push({'x': ticketToRideData.cities[start].x, 'y': ticketToRideData.cities[start].y})
    let needToReverse = false   
    let between = Object.keys(ticketToRideData.connections).find(x => {
        return (ticketToRideData.connections[x].fromCity == fromCity
        && ticketToRideData.connections[x].toCity == toCity
        && (ticketToRideData.connections[x].color == trainColor || trainColor == 'any'))
    })
    if(Object.keys(ticketToRideData.connections).find(x => {
        return (ticketToRideData.connections[x].fromCity == toCity
            && ticketToRideData.connections[x].toCity == fromCity
            && (ticketToRideData.connections[x].color == trainColor || trainColor == 'any'))
    })){
        between = Object.keys(ticketToRideData.connections).find(x => {
            return (ticketToRideData.connections[x].fromCity == toCity
                && ticketToRideData.connections[x].toCity == fromCity
                && (ticketToRideData.connections[x].color == trainColor || trainColor == 'any'))
        })
        needToReverse = true
    }


    between = parseInt(between) + parseInt(before)

    ticketToRideData.connections[between].elements.map(element => {
        coordinates.push(element)
    })

    const end = Object.keys(ticketToRideData.cities).find(x => {
        return ticketToRideData.cities[x].city == toCity
    })
    coordinates.push({'x': ticketToRideData.cities[end].x, 'y': ticketToRideData.cities[end].y})

    if(needToReverse){
        [coordinates[0], coordinates[coordinates.length-1]] = [coordinates[coordinates.length-1], coordinates[0]]
    }

    return (
        <div className="lineBetween" style={{zIndex: 0}}>
            {coordinates.map((elem, index, array) => {
                if(index + 1 < array.length){
                    return <LineBetweenPoints 
                                fromX={elem.x} 
                                fromY={elem.y} 
                                toX={array[index+1].x} 
                                toY={array[index+1].y}
                                color={color}
                                stroke={stroke} />
                }
            })}
        </div>
    )
}

export default LineBetweenCities
