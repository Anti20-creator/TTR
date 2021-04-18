import { createSlice } from '@reduxjs/toolkit'
import TrainDeck from '../Decks/TrainDeck';
import { ticketToRideData } from '../mapdata/MapData';

const colors = ['Purple', 'Green', 'Blue', 'Yellow', 'Red', 'Joker', 'Orange', 'White', 'Black'] 
const trainDeck = new TrainDeck(12, 14, colors)

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    colors: colors,  
    playerCount: 0,
    playerHands: [],
    trainCards: trainDeck.cards,
    destinations: ticketToRideData.destinations,
    longDestinations: ticketToRideData.longDestinations,
    onBoardCards: [],
    currentPlayer: 0,
    playerGoals: [],
    playerGoalOptions: [],
    gameState: 'DESTINATION_CHOOSING',
    drawedCards: 0,
    selectedGoalIndex: 0,
    hoveredData: {
        'fromCity': '',
        'toCity': ''
    }
  },
  reducers: {
    setPlayerCount: (state, action) => {
        state.playerCount = action.payload
    },
    initPlayerHands: (state) => {
        //clearing all players hand
        state.playerHands = []
        state.currentPlayer = 0

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
                state.playerHands[i].filter(card => card.color == drawed)[0].count += 1
            })
        })

        //shuffling destination cards
        shuffle(state.destinations, 10)
        shuffle(state.longDestinations, 10)
    },
    initOnBoardCars: (state) => {
        state.onBoardCards = []
        Array.from(Array(5).keys()).map(i => {
            state.onBoardCards.push(state.trainCards.shift())
        })
    },
    drawCardToBoard: (state, action) => {
        if(state.gameState != 'IN_GAME' 
            || (action.payload.color == 'Joker' && state.drawedCards > 0)) return
        if(action.payload.color == 'Cover'){
            const drawed = state.trainCards.shift()
            state.playerHands[state.currentPlayer].filter(x => x.color == drawed)[0].count += 1
            state.drawedCards++
        }else{
            state.playerHands[state.currentPlayer].filter(x => x.color == action.payload.color)[0].count += 1
            state.onBoardCards[action.payload.idx] = state.trainCards.shift()
            if(action.payload.color == 'Joker'){
                state.currentPlayer += 1
                state.currentPlayer %= state.playerCount
                state.drawedCards = 0
            }else{
                state.drawedCards++
            }
        }

        if(state.drawedCards == 2){
            state.currentPlayer += 1
            state.currentPlayer %= state.playerCount
            state.drawedCards = 0    
        }

        if(state.onBoardCards.filter(x => x == 'Joker').length >= 3){
            state.trainCards.concat(state.onBoardCards)
            state.onBoardCards = []
            Array.from(Array(5).keys()).map(i => {
                state.onBoardCards.push(state.trainCards.shift())
            })
        }
    },
    drawLongDestinations: state => {
        state.playerGoals = []
        Array.from(Array(state.playerCount).keys()).map(i => {
            state.playerGoals.push([])
            let item = state.longDestinations.shift()
            item.completed = false
            state.playerGoals[i].push(item) 
        })
    },
    drawGoalOptionsForAllPlayers: (state) => {
        state.playerGoalOptions = []
        Array.from(Array(state.playerCount).keys()).map(i => {
            state.playerGoalOptions.push([])
            Array.from(Array(3).keys()).map(j => {
                let item = state.destinations.shift()
                item.completed = false
                state.playerGoalOptions[i].push(item)
            })
        })
    },
    acceptDestinations: (state, action) => {
        console.log(state.playerGoals[state.currentPlayer])
        
        //adding the selected cards to the active players goals
        state.playerGoals[state.currentPlayer] = state.playerGoals[state.currentPlayer].concat(action.payload.selected)
        
        //putting back the unused options
        state.destinations = state.destinations.concat(action.payload.returnToDeck)
        state.currentPlayer++
        if(state.currentPlayer == state.playerCount){
            state.gameState = 'IN_GAME'
        }
        state.currentPlayer %= state.playerCount
    },
    stepSelectedGoalIndex: (state, action) => {
        state.selectedGoalIndex += action.payload
        state.selectedGoalIndex = mod(state.selectedGoalIndex, state.playerGoals[state.currentPlayer].length)
    },
    setHoveredData: (state, action) => {
        state.hoveredData.fromCity = action.payload.from
        state.hoveredData.toCity = action.payload.to
    },
    nextPlayer: (state) => {
        state.currentPlayer++
        state.currentPlayer %= state.playerCount
    }
  }
});

function shuffle(array, times) {
    for(let i = 0; i < times; ++i) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

function mod(n, m) {
    return ((n % m) + m) % m
}

export const { 
    setPlayerCount, 
    initPlayerHands, 
    initOnBoardCars, 
    drawCardToBoard,
    drawLongDestinations,
    drawGoalOptionsForAllPlayers,
    acceptDestinations,
    stepSelectedGoalIndex,
    setHoveredData
 } = dataSlice.actions

export const onBoardCards = state => state.data.onBoardCards
export const trainDeckLength = state => state.data.trainCards.length
export const goalDeckLength = state => state.data.destinations.length + state.data.longDestinations.length
export const currentGoalCards = state => state.data.playerGoalOptions[state.data.currentPlayer]
export const gameState = state => state.data.gameState
export const actualPlayerHand = state => state.data.playerHands[state.data.currentPlayer]
export const actualPlayerGoals = state => state.data.playerGoals[state.data.currentPlayer]
export const actualGoalIndex = state => state.data.selectedGoalIndex
export const hoveredData = state => state.data.hoveredData
//export const actualPlayer = state => state.data

// export const selectOpenMail = state => state.mail.selectedMail
// export const selectSendMessageIsOpen = state => state.mail.sendMessageIsOpen;

export default dataSlice.reducer