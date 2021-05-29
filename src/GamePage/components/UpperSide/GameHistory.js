import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DialogTitle } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { history } from '../../../features/dataSlice';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GameHistory({ onClose, selectedValue, open }) {
    
    const classes = useStyles();
    const historyFields = useSelector(history)

    const handleClose = () => {
        onClose(selectedValue)
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Előzmények</DialogTitle>
                <List>
                    {historyFields.slice(-2).map((item, idx) => {
                        return <ListItem key={idx}>
                                    <ListItemText primary={item} />
                                </ListItem>
                    })}
                </List>
            </Dialog>
        </div>
    );
}

export default GameHistory