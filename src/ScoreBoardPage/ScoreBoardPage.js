import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ScoreBoardRow from './ScoreBoardRow'
import './ScoreBoardPage.css'
import { Button, makeStyles, withStyles } from '@material-ui/core'
import ScoreBoardMapDialog from './ScoreBoardMapDialog'
import { allGoals, playerInfos } from '../features/dataSlice'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

function ScoreBoardPage() {

    const map = <ScoreBoardMapDialog />
    
    const createData = (playerName, allDestinations, completedDestinations, longestTrain, points, destinationData) => {
        return {
            playerName,
            allDestinations,
            completedDestinations,
            longestTrain,
            points,
            destinationData
        }
    }

    const infos = useSelector(playerInfos)
    const goals = useSelector(allGoals)

    const rows = infos.map((info, idx) => {
        const name = info.name
        const allDestinations = goals[idx] ? goals[idx]?.length : 0
        const completedDestinations = goals[idx] ? goals[idx].filter(i => i.completed == true)?.length : 0
        const longestTrain = info.longestTrain
        const points = info.playerScore
        const destinationData = goals[idx] ? goals[idx] : []
        return createData(name, allDestinations, completedDestinations, longestTrain, points, destinationData)
    })

    /*const rows = [
        createData('Player1', 3, 1, 15, 30),
        createData('Player2', 2, 2, 20, 26),
        createData('Player3', 3, 1, 11, 20),
        createData('Player4', 3, 1, 8, 12),
        createData('Player5', 2, 1, 3, 8)
    ]*/

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);
      
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
          minWidth: 700,
        },
    });

    const classes = useStyles()

    const history = useHistory()

    function back() {
        history.push('../')
    }

    return (
        <div className="scoreBoard">
            <div>
                <h1>Eredmények</h1>
                <Table className={classes.table} aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            <StyledTableCell><b>Név</b></StyledTableCell>
                            <StyledTableCell><b>Útvonalak</b></StyledTableCell>
                            <StyledTableCell><b>Teljesített útvonalak</b></StyledTableCell>
                            <StyledTableCell><b>Leghosszabb út</b></StyledTableCell>
                            <StyledTableCell><b>Pontok</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => {
                            return (
                                <ScoreBoardRow 
                                    idx={idx} 
                                    key={idx} 
                                    row={row}
                                    map={map} />
                            )
                        })}
                    </TableBody>
                </Table>

                <Button className="back" onClick={back}>Vissza a kezdőlapra</Button>
            </div>
        </div>
    )
}

export default ScoreBoardPage
