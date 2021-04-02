import React from 'react'
import { Avatar } from '@material-ui/core'
import './OpponentRow.css'

function OpponentRow({ playerColor, playerName, playerScore, playerCards, playerGoals, playerTrainCount, rounds }) {

    const seed = Math.floor(Math.random() * 10000)

    return (
        <div className="opponentRow">
            <div className="avatarHolder" style={{backgroundColor: playerColor}}>
                <Avatar src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} />
            </div>
            <div className="playerInfos">
                <div style={{backgroundColor: playerColor}} className="opponentRow--top">
                    <p style={{background: playerColor}} className="score"> 
                        {playerName} : {playerScore} - {playerTrainCount} 
                    </p>
                    <p> {rounds} rounds </p>
                </div>

                <div className="opponentRow--bottom">
                    <p>{playerCards} - {playerGoals}</p>
                </div>
            </div>
        </div>
    )
}

export default OpponentRow
