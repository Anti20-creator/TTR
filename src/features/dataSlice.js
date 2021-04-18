import { createSlice } from '@reduxjs/toolkit'
import TrainDeck from '../Decks/TrainDeck';

const colors = ['Purple', 'Green', 'Blue', 'Yellow', 'Red', 'Joker', 'Orange', 'White', 'Black'] 
const trainDeck = new TrainDeck(12, 14, colors)

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    colors: colors,  
    playerCount: 0,
    playerHands: null,
    trainCards: trainDeck.cards,
    onBoardCards: []
  },
  reducers: {
    setPlayerCount: (state, action) => {
        state.playerCount = action.payload
    },
    initPlayerHands: (state) => {
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
                const drawed = state.trainCards.shift()
                console.log('DRAW')
                state.playerHands[i].filter(card => card.color == drawed)[0].count += 1
            })
        })
    },
    initOnBoardCars: (state) => {
        state.onBoardCards = []
        Array.from(Array(5).keys()).map(i => {
            state.onBoardCards.push(state.trainCards.shift())
        })
    },
    drawCardToBoard: (state, action) => {
        state.onBoardCards[action.payload] = state.trainCards.shift()
        
        if(state.onBoardCards.filter(x => x == 'Joker').length >= 3){
            state.trainCards.concat(state.onBoardCards)
            state.onBoardCards = []
            Array.from(Array(5).keys()).map(i => {
                state.onBoardCards.push(state.trainCards.shift())
            })
        }
    }
  },
});

export const { setPlayerCount, initPlayerHands, initOnBoardCars, drawCardToBoard } = dataSlice.actions

export const onBoardCards = state => state.data.onBoardCards

// export const selectOpenMail = state => state.mail.selectedMail
// export const selectSendMessageIsOpen = state => state.mail.sendMessageIsOpen;

export default dataSlice.reducer