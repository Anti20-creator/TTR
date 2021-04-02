import React, { useState } from 'react'
import './HomePage.css'
import TextField from '@material-ui/core/TextField'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import Button from '@material-ui/core/Button'

function HomePage() {

    const [playerName, setPlayerName] = useState("")
    const [playerCount, setPlayerCount] = useState(2)
    const [roomID, setRoomID] = useState("")

    const createRoom = (e) => {
        e.preventDefault()
        if(playerName.trim() != "" && playerCount > 1 && playerCount < 6){
            localStorage.setItem('hostPlayerName', playerName)
            localStorage.setItem('roomCount', playerCount)
        }
    }

    const joinRoom = (e) => {
        if(roomID.trim() != ""){
            localStorage.setItem('roomID', roomID)
        }
    }

    return (
        <div className="homePage">
            <div className="leftBox box">
                <h1>Új játék</h1>
                <form onSubmit={e=> createRoom(e)}>
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
                    <Button variant="contained" color="primary" onClick={e => createRoom(e)}>
                        Létrehozás
                    </Button>
                </form>
            </div>

            <div className="rightBox box">
                <h1>Csatlakozás szobához</h1>
                <form onSubmit={e=> joinRoom(e)}>
                    <TextField
                        label="Szoba azonosítója"
                        defaultValue=""
                        helperText=""
                        onChange={e => setRoomID(e.target.value)} 
                        style={{minWidth: 200}} />
                    <br/>
                    <Button variant="outlined" color="primary" onClick={e => joinRoom(e)}>
                        Csatlakozás
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default HomePage
