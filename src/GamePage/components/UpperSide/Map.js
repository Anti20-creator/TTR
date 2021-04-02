import React from 'react'
import './Map.css'
import { ticketToRideData } from '../../../mapdata/MapData.js'
import City from './City.js'
import TrainRoute from './TrainRoute'

function Map() {
    return (
        <div className="map">
            {Object.keys(ticketToRideData.cities).map(city => {
                return <City x={ticketToRideData.cities[city].x} y={ticketToRideData.cities[city].y} name={ticketToRideData.cities[city].city} />
                //return (<div></div>)
            })}
            {Object.keys(ticketToRideData.connections).map(connection => {
                const color = ticketToRideData.connections[connection].color
                const from = ticketToRideData.connections[connection].from
                const to = ticketToRideData.connections[connection].to
                const fromX = ticketToRideData.cities[from].x
                const toX = ticketToRideData.cities[to].x
                const fromY = ticketToRideData.cities[from].y
                const toY = ticketToRideData.cities[to].y
                const n1 = Math.sqrt(fromX*fromX+fromY*fromY)
                const n2 = Math.sqrt(toX*toX+toY*toY)
                const rotate = Math.acos((fromX*toX + fromY*toY)/(n1*n2)) * 180 / Math.PI
                return Object.keys(ticketToRideData.connections[connection].elements).map(element => {
                    const actual = ticketToRideData.connections[connection].elements[element]
                    //console.log(actual.color)
                    return <TrainRoute 
                                placeholderColor={color} 
                                x={actual.x} 
                                y={actual.y} 
                                key={actual.id}
                                rotate={rotate}
                                playerHolding={"red"} />
                })
                return undefined
                //console.log(connection)
                //return (<div></div>)
            })}
        </div>
    )
}

export default Map
