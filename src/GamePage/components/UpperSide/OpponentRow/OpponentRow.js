import React from 'react'
import { Avatar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import './OpponentRow.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AdjustIcon from '@material-ui/icons/Adjust';
import TrainIcon from '@material-ui/icons/Train';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import ExploreIcon from '@material-ui/icons/Explore';
import Badge from '@material-ui/core/Badge';


function OpponentRow({ playerColor, playerName, playerScore, playerCards, playerGoals, playerTrainCount, rounds, seed, isActive=false }) {

    return (
        <div className="opponentRow" style={{backgroundColor: playerColor}}>
            <div className="avatarHolder" >
                <Avatar style={{border: isActive ? '3px solid black' : ''}} src={`https://avatars.dicebear.com/4.5/api/human/${seed}.svg`} />
                <h6>{playerName}</h6>
                <h6>{playerScore}</h6>
            </div>
            <div className="playerInfos">
            <List>
                <ListItem>
                    <Badge badgeContent={rounds} color="primary">
                        <AdjustIcon />
                    </Badge>
                </ListItem>
                <ListItem>
                    <Badge badgeContent={playerCards} color="primary">
                        <ViewAgendaIcon />
                    </Badge>
                </ListItem>
            </List>
            <List>
                <ListItem>
                    <Badge badgeContent={playerTrainCount} color="primary">
                        <TrainIcon />
                    </Badge>
                </ListItem>
                <ListItem>
                    <Badge badgeContent={playerGoals} color="primary">
                        <ExploreIcon />
                    </Badge>
                </ListItem>
            </List>
            </div>
        </div>
    )
}

export default OpponentRow
