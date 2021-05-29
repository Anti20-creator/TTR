import React, { useEffect, useState } from 'react'
import './Map.css'
import { ticketToRideData } from '../../../mapdata/MapData.js'
import City from './City.js'
import TrainRoute from './TrainRoute'
import LineTo, { Line } from 'react-lineto'
import LineBetweenCities from './LineBetweenCities'
import { useDispatch, useSelector } from 'react-redux'
import { 
    initPlayerHands, 
    setPlayerCount, 
    initOnBoardCars, 
    drawLongDestinations,
    drawGoalOptionsForAllPlayers,
    actualGoalIndex,
    actualPlayerGoals,
    buyingOpts,
    openBuying,
    build,
    playerLines,
    showCompletedLine,
    isHovering,
    currentIdx
 } from '../../../features/dataSlice'
import { Button, Dialog, DialogTitle } from '@material-ui/core'
import PlayerHand from '../DownSide/PlayerHand'
import {synchronizeStep, getPlayerId} from '../../../socket/ClientSocket'

function Map() {

    const colors = ['Purple', 'Green', 'Blue', 'Yellow', 'Red', 'Joker', 'Orange', 'White', 'Black'] 

    const dispatch = useDispatch()
    const index = useSelector(actualGoalIndex)
    const goals = useSelector(actualPlayerGoals)
    //const [buyingOptions, setB] = useState([])
    const buyingOptions = useSelector(buyingOpts)
    const openBuyingPanel = useSelector(openBuying)
    const lines = useSelector(playerLines)
    const completedOne = useSelector(showCompletedLine)
    const hovering = useSelector(isHovering)
    const playerIndex = useSelector(currentIdx)
    const url = process.env.PUBLIC_URL + 'ticket-to-ride-euorpe-map.jpg'
    console.log(url)

    //only for testing
    useEffect(() => {
        
    }, [])

    let cities

    useEffect(() => {
        if(goals && goals.length > 0){
            cities = {
                'fromCity': goals[index].fromCity,
                'toCity': goals[index].toCity
            }
            console.log(cities)
        }
    }, [goals, index])

    useEffect(() => {

    }, [openBuyingPanel])

    useEffect(() => {
        console.log(completedOne)
    }, [completedOne])

    function closeBuyingPanel() {
        dispatch(build())
        if(playerIndex == getPlayerId()){
            synchronizeStep()
        }
    }

    return (
        <div className="map" style={{backgroundImage: url}}>
            {Object.keys(ticketToRideData.cities).map(city => {
                return <City 
                            x={ticketToRideData.cities[city].x} 
                            y={ticketToRideData.cities[city].y} 
                            name={ticketToRideData.cities[city].city}
                            modifier={ticketToRideData.cities[city].alignment}
                            className={ticketToRideData.cities[city].city}
                            key={ticketToRideData.cities[city].id} 
                            goalCity={
                                ticketToRideData.cities[city].city == goals?.fromCity
                                    || ticketToRideData.cities[city].city == goals?.toCity
                            } />
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
                return (Object.keys(ticketToRideData.connections[connection].elements).map(element => {
                    const actual = ticketToRideData.connections[connection].elements[element]
                    return <TrainRoute 
                                placeholderColor={color} 
                                x={actual.x} 
                                y={actual.y} 
                                key={actual.id}
                                rotate={rotate}
                                playerHolding={"red"} />
                }))
                return undefined
            })}

            {lines.map((player, idxPlayer) => player.map((line, idxLine) => {
                            let beforeValue = 0
                            lines.map((player2, idxPlayer2) => player2.map((line2, idxLine2) => {
                                if(!(idxPlayer2 >= idxPlayer && idxLine2 >= idxLine) && line2.fromCity == line.fromCity
                                    && line2.toCity == line.toCity
                                    && line2.color != line.color){
                                        beforeValue++
                                }
                            }))
                            let stroke = 3
                            if(hovering && 
                                completedOne.filter(x => x.fromCity == line.fromCity && x.toCity == line.toCity).length > 0 &&
                                line.color == colors[playerIndex]){
                                console.log(line.fromCity)
                                console.log(line.toCity)
                                stroke = 6 
                            }
                            return (<LineBetweenCities
                                        fromCity={line.fromCity}
                                        toCity={line.toCity} 
                                        color={line.color}
                                        before={line.trainColor == 'gray' ? beforeValue : 0}
                                        trainColor={line.trainColor == 'gray' ? 'any' : line.trainColor}
                                        stroke={stroke}
                                        key={line.fromCity}
                                        />)} 
                                        )
                            )}
        


            <Dialog 
                style={{overflow: 'scroll'}}
                open={openBuyingPanel} 
                onClose={closeBuyingPanel}
                maxWidth={'md'} >
                <DialogTitle id="simple-dialog-title">Építési opciók</DialogTitle>
                {buyingOptions && buyingOptions.length > 0 && buyingOptions.map((options, i) => {
                    console.log(options)
                    return options.options.map((option, j) => {
                        const backColor = options.color
                        const textColor = backColor == 'black' ? 'white' : 'black'
                        return (
                            <div key={i} style={{display: 'flex'}}>
                                <PlayerHand cards={option} />
                                <Button style={{backgroundColor: backColor, border: '1px solid black', color:textColor}} 
                                    onClick={() => 
                                        {
                                            if(playerIndex == getPlayerId()){
                                                dispatch(build({
                                                    i: i,
                                                    j: j,
                                                    color: options.color}
                                                    ))
                                                synchronizeStep()
                                            }
                                        }}>ÉPÍT</Button>
                            </div>
                        )
                    })
                })}
            </Dialog>
        </div>
    )
}

export default Map
