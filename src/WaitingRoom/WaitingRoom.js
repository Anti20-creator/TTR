import React, { useEffect } from 'react'
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
    playerInfos
 } from '../features/dataSlice'

function WaitingRoom() {

    const seed = Math.floor(Math.random() * 10000)
    const history = useHistory()
    const dispatch = useDispatch()
    const infos = useSelector(playerInfos)

    useEffect(() => {
        console.log(infos)
    }, [infos])

    const startGame = () => {
        dispatch(setPlayerCount(2))
        dispatch(initPlayerHands())
        dispatch(initOnBoardCars())
        dispatch(drawLongDestinations())
        dispatch(drawGoalOptionsForAllPlayers())
        history.push('../../game/123')
    }
    
    return (
        <div className="waitingRoom">
            <div className="exit">
                <Tooltip title="Kilépés">
                    <IconButton aria-label="leave-room" onClick={() => history.push('../..')}>
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="elements">
                <h1>#Szobaazonosító</h1>

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
                
                <Button variant="outlined" color="primary" onClick={() => startGame()} >
                        Játék indítása
                </Button>

            </div>
        </div>
    )
}

export default WaitingRoom
