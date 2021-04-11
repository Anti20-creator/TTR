import React, { useState } from 'react'
import './HomePage.css'
import TextField from '@material-ui/core/TextField'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useHistory } from "react-router-dom"
import Fab from '@material-ui/core/Fab'
import NavigationIcon from '@material-ui/icons/Navigation'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function HomePage() {

    const [playerName, setPlayerName] = useState("")
    const [joinPlayerName, setJoinPlayerName] = useState("")
    const [playerCount, setPlayerCount] = useState(0)
    const [roomID, setRoomID] = useState("")

    const history = useHistory()

    const createRoom = (e) => {
        e.preventDefault()
        if(playerName.trim() != "" && playerCount > 1 && playerCount < 6){
            localStorage.setItem('hostPlayerName', playerName)
            localStorage.setItem('roomCount', playerCount)
            history.push('/room/123')
        }else{
            setOpen(true)
        }
    }
    
    const joinRoom = (e) => {
        e.preventDefault()
        if(joinPlayerName.trim() != "" && roomID.trim() != ""){
            localStorage.setItem('roomID', roomID)
            history.push('/room/123')
        }else{
            setOpen(true)
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className="homePage">
            <div className="titleHolder">
                <h1>Ticket to ride</h1>
            </div>
            <div className="logoHolder">
                <img src="http://www.ranklogos.com/wp-content/uploads/2016/09/Ticket-to-Ride-Logo-RK1220.png" alt="Logo"/>
            </div>
            <div className="boxHolder">
                <div className="leftBox box">
                    <h1>Új játék</h1>
                    <form onSubmit={e => createRoom(e)}>
                        <TextField
                            label="Felhasználónév"
                            defaultValue=""
                            helperText=""
                            onChange={e => setPlayerName(e.target.value)} 
                            style={{minWidth: 200}} />
                        <br/>
                        <FormControl style={{minWidth: 200}}>
                            <InputLabel id="demo-simple-select-label">Játékosok száma</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={e => setPlayerCount(e.target.value)}>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <br/>
                        <Button type="submit" variant="contained" color="primary" onClick={e => createRoom(e)}>
                            Létrehozás
                        </Button>
                    </form>
                </div>

                <div className="rightBox box">
                    <h1>Csatlakozás szobához</h1>
                    <form onSubmit={e => joinRoom(e)}>
                        <TextField
                            label="Felhasználónév"
                            defaultValue=""
                            helperText=""
                            onChange={e => setJoinPlayerName(e.target.value)} 
                            style={{minWidth: 200}} />
                        <br/>
                        <TextField
                            label="Szoba azonosítója"
                            defaultValue=""
                            helperText=""
                            onChange={e => setRoomID(e.target.value)} 
                            style={{minWidth: 200}} />
                        <br/>
                        <Button type="submit" variant="outlined" color="primary" onClick={e => joinRoom(e)}>
                            Csatlakozás
                        </Button>
                    </form>
                </div>
            </div>
            <div className="helpHolder">
            <Fab variant="extended" color="primary" onClick={()=> window.open("https://tarsasjatekrendeles.hu/shop_ordered/7237/pic/Compaya/Ticket_To_Ride_Europe.pdf", "_blank")}>
                <NavigationIcon />
                Játékszabályzat
            </Fab>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Kérlek adj meg minden adatot!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default HomePage
