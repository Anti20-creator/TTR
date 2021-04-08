import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ScoreBoardRow from './ScoreBoardRow'
import './ScoreBoardPage.css'
import { makeStyles, withStyles } from '@material-ui/core'
import ScoreBoardMapDialog from './ScoreBoardMapDialog'

function ScoreBoardPage() {

    const map = <ScoreBoardMapDialog />
    
    const createData = (playerName, allDestinations, completedDestinations, longestTrain) => {
        return {
            playerName,
            allDestinations,
            completedDestinations,
            longestTrain,
            destinationData: [
                {'id': '2', 'from': 'Berlin', 'to': 'Wien', 'points': '15', 'completed': 'nem'},
                {'id': '4', 'from': 'Edinburgh', 'to': 'London', 'points': '5', 'completed': 'igen'},
                {'id': '4', 'from': 'Edinburgh', 'to': 'London', 'points': '5', 'completed': 'igen'}
            ]
        }
    }

    const rows = [
        createData('Player1', 3, 1, 15),
        createData('Player2', 2, 2, 20),
        createData('Player3', 3, 1, 11),
        createData('Player4', 3, 1, 8),
        createData('Player5', 2, 1, 3)
    ]

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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, idx) => {
                            return (
                                <ScoreBoardRow 
                                    idx={idx} 
                                    key={row.name} 
                                    row={row}
                                    map={map} />
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ScoreBoardPage
