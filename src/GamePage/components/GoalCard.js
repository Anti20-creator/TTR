import React, { useEffect, useState } from 'react'
import './GoalCard.css'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: theme.spacing(1),
      justifyContent: 'center'
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);


function GoalCard({data}) {

    function mod(n, m) {
        return ((n % m) + m) % m
    }

    const classes = useStyles();
    const theme = useTheme();
    const [actual, setActual] = useState(0);

    return (
        <div className="goalCards">
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {data[actual].from}

                        -

                        {data[actual].to}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <p className="circle">{data[actual].points}</p>
                    </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                    <IconButton aria-label="previous" onClick={() => setActual(mod(actual-1, data.length))}>
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton>
                        <DoneAllIcon style={{color : data[actual].completed ? 'green' : 'black'}} />
                    </IconButton>
                    <IconButton aria-label="next" onClick={() => setActual(mod(actual+1, data.length))}>
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                    </div>
                </div>
                {/*<CardMedia className={classes.cover}>
                    <DoneAllIcon style={{color : data[actual].completed ? 'green' : 'black'}} />
                </CardMedia>*/}
            </Card>
        </div>
    )
}

export default GoalCard
