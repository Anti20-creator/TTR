import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, makeStyles, withStyles } from '@material-ui/core';

function ScoreBoardRow({idx, row, map}) {

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

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const [open, setOpen] = useState(false);

    return (
        <React.Fragment key={row.playerName}>
            {idx % 2 == 0 &&
            <StyledTableRow>
                <StyledTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th">{row.playerName}</StyledTableCell>
                <StyledTableCell component="th">{row.allDestinations}</StyledTableCell>
                <StyledTableCell component="th">{row.completedDestinations}</StyledTableCell>
                <StyledTableCell component="th">{row.longestTrain}</StyledTableCell>
                <StyledTableCell component="th">{row.points}</StyledTableCell>
            </StyledTableRow> }
            {idx % 2 != 0 &&
            <TableRow>
                <StyledTableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th">{row.playerName}</StyledTableCell>
                <StyledTableCell component="th">{row.allDestinations}</StyledTableCell>
                <StyledTableCell component="th">{row.completedDestinations}</StyledTableCell>
                <StyledTableCell component="th">{row.longestTrain}</StyledTableCell>
                <StyledTableCell component="th">{row.points}</StyledTableCell>
            </TableRow> }
            <StyledTableRow>
                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                        Útvonalak részletei
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell><b>Útvonal kezdete</b></StyledTableCell>
                            <StyledTableCell><b>Útvonal vége</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Pontszám</b></StyledTableCell>
                            <StyledTableCell align="center"><b>Teljesítve</b></StyledTableCell>
                            <StyledTableCell align="center">
                                Térképen
                            </StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.destinationData.map((data, idx) => (
                            <TableRow key={idx}>
                                <StyledTableCell component="th" scope="row">
                                    {data.fromCity}
                                </StyledTableCell>
                                <StyledTableCell>{data.toCity}</StyledTableCell>
                                <StyledTableCell align="center">{data.value}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {data.completed ? 'igen' : 'nem'}
                                </StyledTableCell>
                                <StyledTableCell>
                                    {map}
                                </StyledTableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    )
}

export default ScoreBoardRow
