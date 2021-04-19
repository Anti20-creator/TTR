import React, { useEffect } from 'react'
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
    playerLines
 } from '../../../features/dataSlice'
import { Button, Dialog, DialogTitle } from '@material-ui/core'
import PlayerHand from '../DownSide/PlayerHand'

function Map() {

    const dispatch = useDispatch()
    const index = useSelector(actualGoalIndex)
    const goals = useSelector(actualPlayerGoals)
    const buyingOptions = useSelector(buyingOpts)
    const openBuyingPanel = useSelector(openBuying)
    const lines = useSelector(playerLines)
    const url = process.env.PUBLIC_URL + 'ticket-to-ride-euorpe-map.jpg'
    console.log(url)

    //only for testing
    useEffect(() => {
        dispatch(setPlayerCount(2))
        dispatch(initPlayerHands())
        dispatch(initOnBoardCars())
        dispatch(drawLongDestinations())
        dispatch(drawGoalOptionsForAllPlayers())
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

    function closeBuyingPanel() {
        dispatch(build())
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
            <LineBetweenCities fromCity='Danzig' toCity='Riga' />*/}
            {lines.map(player => player.map(line => {return (<LineBetweenCities
                                        fromCity={line.fromCity}
                                        toCity={line.toCity} 
                                        color={line.color}
                                        key={line.fromCity}
                                        />)} 
                                        )
            )}
            
            {console.log('LINES: ', lines)}

            <Dialog style={{overflow: 'scroll'}} open={openBuyingPanel} onClose={closeBuyingPanel} >
                <DialogTitle id="simple-dialog-title">Építési opciók</DialogTitle>
                {buyingOptions.options && buyingOptions.options.map((option, i) => {
                    return (
                        <div style={{display: 'flex'}}>
                            <PlayerHand cards={option} />
                            <Button onClick={() => dispatch(build(i))}>ÉPÍT</Button>
                        </div>
                    )
                })}
                {/*buyingOptions?.options[0].color*/}
            </Dialog>
        </div>
    )
}

export default Map
