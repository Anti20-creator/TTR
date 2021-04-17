import { createSlice } from '@reduxjs/toolkit'
import TrainDeck from '../Decks/TrainDeck';

const colors = ['Purple', 'Green', 'Blue', 'Yellow', 'Red', 'Joker', 'Orange', 'White', 'Black'] 

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    colors: colors,  
    playerCount: 0,
    playerHands: null,
    trainCards: new TrainDeck(12, 14, colors)
  },
  reducers: {
    setPlayerCount: (state, action) => {
        state.playerCount = action.payload
    },
    initPlayerHands: (state) => {
        alert('GUT')
        //clearing all players hand
        state.playerHands = []

        Array.from(Array(state.playerCount).keys()).map(i => {
            state.playerHands.push([])
            
            //adding all colors as an object with the count of 0
            Array.from(Array(state.colors.length).keys()).map(j => {
                state.playerHands[i].push({
                    'color': state.colors[j],
                    'count': 0
                })
            })

            //drawing 4 cards for all players
            Array.from(Array(4).keys()).map(j => {
                const drawed = state.trainCards.draw()
                console.log('DRAW')
                state.playerHands[i].filter(card => card.color == drawed)[0].count += 1
            })
        })
    }
  },
});

export const { setPlayerCount, initPlayerHands } = dataSlice.actions

// export const selectOpenMail = state => state.mail.selectedMail
// export const selectSendMessageIsOpen = state => state.mail.sendMessageIsOpen;

export default dataSlice.reducer