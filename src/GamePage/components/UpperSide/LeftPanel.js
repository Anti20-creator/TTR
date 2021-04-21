import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import GameHistory from './GameHistory'
import OpponentRow from './OpponentRow/OpponentRow'
import './LeftPanel.css'
import { allGoals, allPlayerHand, currentIdx, playerInfos } from '../../../features/dataSlice';
import { useSelector } from 'react-redux';

function LeftPanel() {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const infos = useSelector(playerInfos)
    const cards = useSelector(allPlayerHand)
    const goals = useSelector(allGoals)
    const currIdx = useSelector(currentIdx)
    
    return (
        <div className="leftPanel">

            {infos.map((info, idx) => {
                    console.log(cards[idx].map(x => x.count).reduce((a, b) => a + b))
                    return <OpponentRow
                                playerColor={info.playerColor} 
                                playerName={info.name}
                                playerCards={cards[idx].map(x => x.count).reduce((a, b) => a + b)}
                                playerGoals={goals[idx].length}
                                playerTrainCount={info.playerTrainCount}
                                rounds={info.rounds}
                                seed={info.seed}
                                isActive={idx == currIdx}
                                key={idx}
                                />
                    })}
            
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Előzmények
            </Button>
            <GameHistory open={open} onClose={handleClose} />
        </div>
    )
}

export default LeftPanel
