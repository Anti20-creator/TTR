import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import GameHistory from './GameHistory'
import OpponentRow from './OpponentRow/OpponentRow'
import './LeftPanel.css'

function LeftPanel() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };
    
    return (
        <div className="leftPanel">
            <OpponentRow 
                playerColor="red" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="36"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="purple" 
                playerName="Player2" 
                playerCards="1" 
                playerGoals="2"
                playerScore="18"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="green" 
                playerName="Player3" 
                playerCards="5" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="7" 
                rounds="3" />
            <OpponentRow 
                playerColor="blue" 
                playerName="Player4" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="18" 
                rounds="3" />
            <OpponentRow 
                playerColor="orange" 
                playerName="Player5" 
                playerCards="4" 
                playerGoals="1"
                playerScore="22"
                playerTrainCount="12" 
                rounds="3" />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Előzmények
            </Button>
            <GameHistory open={open} onClose={handleClose} />
        </div>
    )
}

export default LeftPanel
