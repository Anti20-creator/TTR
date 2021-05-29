import { useDispatch } from 'react-redux'
import { roomIsFull, setPlayerName, synchronize } from '../features/dataSlice'
import io from 'socket.io-client'
import { SettingsSystemDaydreamTwoTone } from '@material-ui/icons'


let store = null
let room = null
let socket = null
let playerId = null
let history = null
let roomFull = false
let creator = false

export function getRoomFull(){
    return roomFull
}

export function getOrCreateSocket() {

    if(socket){
        return socket
    }

    console.log('NEW SOCKET CREATED')

    socket = io('http://webprogramozas.inf.elte.hu:3031')
    return socket
}

export function registerListenersOnSocket(_store, _history) {
    if (!store) {
        store = _store;
        console.log(_store)
    }

    if (!history) {
        history = _history;
        console.log(_history)
    }

    if(!socket){
        socket = getOrCreateSocket();
    }else{
        socket.on('create-room', (data) => {
            console.log('ON ROOM CREATE')
            console.log(data)
        })
    
        socket.on('room-is-full', ({roomId, state, player}) => {
            roomFull = true
            store.dispatch(roomIsFull())
            console.log('Room is full')
            console.log(roomId, player)
            playerId = player - 1
            console.log('PlayerID:', playerId)
        });
    
        socket.on('player-joined', () => {
            if(creator){
                socket.emit('sync-state', getRoomId(), store.getState().data, true, data => {
                    console.log(data)
                })
            }
            console.log('Player joined!')
        })
        
        socket.on('state-changed', (newStore) => {
            console.log('--- CHANGE STATE ---')
            console.log(newStore)
            store.dispatch(synchronize(newStore.state))
            console.log('--- CHANGE STATE ---')
        })
    
        socket.on('action-sent', ({action}) => {
            console.log('SYNCED')
            console.log(action)
            switch(action.method){
                case 'setPlayerName': {
                    store.dispatch(setPlayerName({
                        name: action.name
                    }))
                    break;
                }
    
                default:{
                    console.log('default')
                    break
                }
            }
        });
    
        socket.on('player-left', () => {
            alert('Egy játékos elhagyta a játékot!')
        });
    }


}

export function wsCreateRoom(roomSize, name) {
    if(!socket) return

    socket.emit('create-room', parseInt(roomSize), data => {
        if(data.status == 'ok'){
            creator = true
            console.log(data)
            room = data.roomId
            console.log('ROOM:', room)
            store.dispatch(setPlayerName({
                name: name
            }))
            
            socket.emit('sync-state', getRoomId(), store.getState().data, true, data => {
                console.log(data)
            })
            
        }else{
            console.log('ERROR')
            console.log(data)
        }

        return data.status
    })

}

export function wsJoinRoom(roomId, playerName) {
    if(!socket) return

    console.log('SOCKET:', roomId)

    socket.emit('join-room', roomId, (data) => {
        if(data.status == 'ok'){
            room = roomId
            console.log('Joined')
            
            
        }else{
            console.log('ERROR')
            console.log(data)
        }
    })
    
    socket.emit('get-state', roomId, (data) => {
        console.log('SYNCED STATE')
        store.dispatch(synchronize(JSON.parse(data.state)))
        
        store.dispatch(setPlayerName({
            name: playerName
        }))
        
        socket.emit('sync-state', getRoomId(), store.getState().data, true, data => {
            console.log(data)
        })
    })
    
}

export function leaveRoom(roomId) {
    if(!socket) return

    socket.emit('close-room', roomId, data => {
        console.log(data)
    })
}

export function logStore(){
    console.log(store.getState())
}

export function synchronizeStep() {
    console.log('STEPPED')
    console.log(store.getState().data)
    socket.emit('sync-state', getRoomId(), store.getState().data, true, data => {
        console.log(data)
    })
}

export function getRoomId() {
    console.log('RETURN ROOM:', room)
    return room
}

export function getPlayerId() {
    return playerId
}