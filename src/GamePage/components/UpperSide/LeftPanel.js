import React from 'react'
import OpponentRow from './OpponentRow/OpponentRow'

function LeftPanel() {
    return (
        <div className="leftPanel">
            <OpponentRow 
                playerColor="red" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52" />
            <OpponentRow 
                playerColor="green" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52" />
            <OpponentRow 
                playerColor="purple" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52" />
            <OpponentRow 
                playerColor="yellow" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52" />
            <OpponentRow 
                playerColor="blue" 
                playerName="Anti" 
                playerCards="8+" 
                playerGoals="2"
                playerScore="52" />
        </div>
    )
}

export default LeftPanel
