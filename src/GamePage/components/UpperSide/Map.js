import React, { useEffect } from 'react'
import './Map.css'
import { ticketToRideData } from '../../../mapdata/MapData.js'
import City from './City.js'
import TrainRoute from './TrainRoute'
import LineTo, { Line } from 'react-lineto'
import LineBetweenCities from './LineBetweenCities'
import { useDispatch } from 'react-redux'
import { initPlayerHands, setPlayerCount, initOnBoardCars } from '../../../features/dataSlice'

function Map() {

    const dispatch = useDispatch()
    const url = process.env.PUBLIC_URL + 'ticket-to-ride-euorpe-map.jpg'
    console.log(url)

    //only for testing
    useEffect(() => {
        dispatch(setPlayerCount(2))
        dispatch(initPlayerHands())
        dispatch(initOnBoardCars())
    })

    return (
        <div className="map" style={{backgroundImage: url}}>
            {Object.keys(ticketToRideData.cities).map(city => {
                return <City 
                            x={ticketToRideData.cities[city].x} 
                            y={ticketToRideData.cities[city].y} 
                            name={ticketToRideData.cities[city].city}
                            modifier={ticketToRideData.cities[city].alignment}
                            className={ticketToRideData.cities[city].city} 
                            goalCity={
                                ticketToRideData.cities[city].city == 'Zurich'
                                    ||  ticketToRideData.cities[city].city == 'Budapest'
                            } />
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

            {/*<LineBetweenCities fromX={17} fromY={13.133208255159476} toX={18.375} toY={17.636022514071296} />*/}
            {/*Object.keys(ticketToRideData.connections).map(connection => {
                const from = ticketToRideData.connections[connection].fromCity
                const to = ticketToRideData.connections[connection].toCity
                return <LineBetweenCities fromCity={from} toCity={to} />
            })
            <LineBetweenCities fromCity='Edinburgh' toCity='London' />
            <LineBetweenCities fromCity='Zagrab' toCity='Budapest' />
            <LineBetweenCities fromCity='Danzig' toCity='Riga' />*/}
        </div>
    )
}

export default Map
