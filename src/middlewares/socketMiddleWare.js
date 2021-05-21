import {getOrCreateSocket} from '../socket/ClientSocket'

export const socketMiddleWare = store => next => action => {

    alert('MIDDLEWARE')
    
    const socket = getOrCreateSocket()


    switch(action.type) {

        case 'CREATE_ROOM': {

            
            break;
        }

        default:
            break;
    }
}