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
                playerScore="52"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="purple" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="green" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="blue" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="20" 
                rounds="3" />
            <OpponentRow 
                playerColor="orange" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52"
                playerTrainCount="20" 
                rounds="3" />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Előzmények
            </Button>
            <GameHistory open={open} onClose={handleClose} />
        </div>
    )
}

export default LeftPanel
