import React from 'react'
import { ticketToRideData } from '../../../mapdata/MapData'
import LineBetweenPoints from './LineBetweenPoints'

function LineBetweenCities({fromX, fromY, toX, toY, fromCity, toCity, color}) {

    let coordinates = []
    const start = Object.keys(ticketToRideData.cities).find(x => {
        return ticketToRideData.cities[x].city == fromCity
    })
    coordinates.push({'x': ticketToRideData.cities[start].x, 'y': ticketToRideData.cities[start].y})
    
    const between = Object.keys(ticketToRideData.connections).find(x => {
        return (ticketToRideData.connections[x].fromCity == fromCity
        && ticketToRideData.connections[x].toCity == toCity) || 
        (ticketToRideData.connections[x].fromCity == toCity
            && ticketToRideData.connections[x].toCity == fromCity)
    })
    console.log(between)
    console.log(ticketToRideData.connections[between])
    ticketToRideData.connections[between].elements.map(element => {
        coordinates.push(element)
    })

    const end = Object.keys(ticketToRideData.cities).find(x => {
        return ticketToRideData.cities[x].city == toCity
    })
    coordinates.push({'x': ticketToRideData.cities[end].x, 'y': ticketToRideData.cities[end].y})

    console.log(coordinates)

    return (
        <div className="lineBetween" style={{zIndex: 0}}>
            {coordinates.map((elem, index, array) => {
                if(index + 1 < array.length){
                    return <LineBetweenPoints 
                                fromX={elem.x} 
                                fromY={elem.y} 
                                toX={array[index+1].x} 
                                toY={array[index+1].y}
                                color={color} />
                }
            })}
        </div>
    )
}

export default LineBetweenCities
