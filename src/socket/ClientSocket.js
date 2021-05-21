import { useDispatch } from 'react-redux'
import { setPlayerName } from '../features/dataSlice'

const io = require('socket.io-client')
let store = null
let room = null
let socket = null

export function getOrCreateSocket() {

    if(socket){
        return socket
    }

    socket = io('http://webprogramozas.inf.elte.hu:3031')
    return socket
}

export function registerListenersOnSocket(_store) {
    if (!store) {
        store = _store;
    }

    socket = getOrCreateSocket();

    socket.on('room-is-full', ({roomId, player}) => {
        console.log(roomId, player)
    });


    socket.on('action-sent', ({action}) => {
        store.dispatch(action);
    });

    socket.on('player-left', () => {
        alert('Egy játékos elhagyta a játékot!')
    });
}

export function wsCreateRoom(roomSize, name) {
    if(!socket) return

    socket.emit('create-room', {
        roomSize: parseInt(roomSize) 
    }, data => {
        if(data.status == 'ok'){
            console.log(data)
            room = data.roomId
            console.log('ROOM:', room)
            store.dispatch(setPlayerName({
                name: name
            }))
        }else{
            console.log('ERROR')
            console.log(data)
        }
    })    
}

export function wsJoinRoom(roomId, name) {
    if(!socket) return

    console.log('SOCKET:', roomId)

    socket.emit('join-room', {
        roomId: roomId
    }, data => {
        if(data.status.ok == 'ok'){
            room = roomId
            console.log('Joined')
            store.dispatch(setPlayerName({
                name: name
            }))
        }else{
            console.log('ERROR')
            console.log(data)
        }
    })
}

export function getRoomId() {
    console.log('RETURN ROOM:', room)
    return room
}