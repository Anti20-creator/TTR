import React, { useState } from 'react'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './DestinationCard.css'

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
  }),
);

function DestinationCard({from, to, points}) {

    const classes = useStyles();
    const theme = useTheme();

    const [selected, setSelected] = useState(false)

    const makeSelected = (e) => {
      if(!selected){
        e.target.closest('.MuiCard-root').classList.add('selected')
      }else{
        e.target.closest('.MuiCard-root').classList.remove('selected')
      }
      setSelected(!selected)
    }

    return (
        <div className="destCard" onClick={(e) => makeSelected(e)}>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {from}
                        <br></br>
                        -
                        <br></br>
                        {to}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <p className="circle">{points}</p>
                    </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}

export default DestinationCard
