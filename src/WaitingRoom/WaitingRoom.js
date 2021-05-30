import React, { useEffect, useState } from 'react'
import './WaitingRoom.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Avatar, IconButton } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import { useDispatch, useSelector } from 'react-redux'
import { initPlayerHands, 
    setPlayerCount, 
    initOnBoardCars, 
    drawLongDestinations,
    drawGoalOptionsForAllPlayers,
    playerInfos,
    isRoomFull,
    playersJoined
 } from '../features/dataSlice'
import { getRoomId, leaveRoom, logStore, getRoomFull } from '../socket/ClientSocket'

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

function WaitingRoom() {

    const seed = Math.floor(Math.random() * 10000)
    const history = useHistory()
    const dispatch = useDispatch()
    const infos = useSelector(playerInfos)
    const joined = useSelector(playersJoined)
    const forceUpdate = useForceUpdate()
    const isFull = useSelector(isRoomFull)
    const full = getRoomFull()
    const [roomId, setRoomId] = useState()

    useEffect(() => {
        console.log('infos update')
        forceUpdate()
        setRoomId(getRoomId())
        console.log(infos)
        if(isFull == true){
            history.push('../../game/123')
        }
    }, [infos, isFull])

    const startGame = () => {
        history.push('../../game/123')
    }

    const make = () => {
        logStore()
        console.log(infos)
        forceUpdate()
    }
    
    return (
        <div className="waitingRoom">
            <div className="exit">
                <Tooltip title="Kilépés">
                    <IconButton aria-label="leave-room" onClick={() => {
                        leaveRoom(getRoomId())
                        history.push('../..')
                    }}>
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="elements">
                <h1>{ roomId }</h1>

                <div className="players">
                    {Array.from(Array(infos.length).keys()).map(item => {
                        const name = infos[item]?.name == '' ? 'Waiting...' : infos[item]?.name
                        return (
                            <div key={item} className="player">
                                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed+item}.svg`} />
                                <p className="playerName">{name}</p>
                                {name == 'Waiting...' && <CircularProgress />}
                                {name != 'Waiting...' && <DoneIcon />}
                            </div>
                        )
                    })}
                </div>
                
                {/*<Button variant="outlined" color="primary" onClick={() => startGame()} >
                        Játék indítása
                </Button>

                <Button onClick={() => make()}>Log Store</Button>*/}


            </div>
        </div>
    )
}

export default WaitingRoom
