import React from 'react'
import './WaitingRoom.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Avatar, IconButton } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';

function WaitingRoom() {

    const seed = Math.floor(Math.random() * 10000)
    const history = useHistory()

    const startGame = () => {
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
                    {Array.from(Array(parseInt(localStorage.getItem('roomCount'))).keys()).map(item => {
                        const name = item == 0 ? localStorage.getItem('hostPlayerName') : 'Player'+(item+1)
                        return (
                            <div className="player">
                                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed+item}.svg`} />
                                <p className="playerName">{name}</p>
                                {item != 0 && <CircularProgress />}
                                {item == 0 && <DoneIcon />}
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
