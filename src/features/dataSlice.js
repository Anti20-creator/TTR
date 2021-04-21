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
    },
    selectedFirstCity: '',
    neighbourCities: [],
    buyingArrays: [],
    openBuyingOptions: false,
    buyingOpts: [],
    playerLines: [],
    isHovering: false,
    playerInfos: [],
    bigLineData: []
  },
  reducers: {
    setPlayerCount: (state, action) => {
        state.playerCount = action.payload
    },
    initPlayerHands: (state) => {
        //clearing all players hand
        state.playerHands = []
        state.bigLineData = []
        state.currentPlayer = 0

        Array.from(Array(state.playerCount).keys()).map(i => {
            state.playerHands.push([])
            state.playerLines.push([])
            
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

        Array.from(Array(state.playerCount).keys()).map(i => {
            state.bigLineData.push([])
            state.playerInfos.push([])
            const seed = Math.floor(Math.random() * 10000)
            state.playerInfos[i] = {
                name: 'Player' + (i+1),
                playerColor: colors[i],
                playerScore: 0,
                playerTrainCount: 45,
                rounds: 1,
                seed: seed
            }
        })
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
            nextPlayer(state)
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
        if(state.gameState == 'DESTINATION_IN_GAME'){
            state.gameState = 'IN_GAME'
        }
        else if(state.currentPlayer == state.playerCount){
            state.gameState = 'IN_GAME'
            state.destinations = state.destinations.concat(state.longDestinations)
            shuffle(state.destinations, 10)
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
    selectFirstCity: (state, action) => {
        if(state.drawedCards > 0 || state.gameState != 'IN_GAME') return
        state.selectedFirstCity = state.selectedFirstCity == action.payload ? '' : action.payload
        state.neighbourCities = []
        state.buyingArrays = []
        if(selectFirstCity == '') return
        let newItems = []
        for(let i = 1; i <= Object.keys(ticketToRideData.connections).length; ++i){
            const item = ticketToRideData.connections[i]
            
            if(item?.fromCity == state.selectedFirstCity 
                && canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length)){
                newItems.push(item.toCity)
                console.log(item.toCity)
                state.buyingArrays.push({
                    city: item.toCity,
                    options: canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length)
                })
            }
            if(item?.toCity == state.selectedFirstCity
                && canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length)){
                newItems.push(item.fromCity)
                console.log(item.fromCity)
                state.buyingArrays.push({
                    city: item.fromCity,
                    options: canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length)
                })
            }
        }
        state.neighbourCities = state.neighbourCities.concat([...new Set(newItems)])
    },
    selectSecondCity: (state, action) => {
        if(state.selectedFirstCity == '') return
        state.buyingOpts = state.buyingArrays.find(arr => arr.city == action.payload)
        state.openBuyingOptions = true
    },
    build: (state, action) => {
        state.openBuyingOptions = false
        if(action.payload == undefined) return
        const boughtWith = state.buyingOpts.options[action.payload]
        console.log(boughtWith)
        state.playerHands[state.currentPlayer].filter(x => x.color == boughtWith[0].color.capitalize())[0].count -= boughtWith[0].count
        state.playerHands[state.currentPlayer].filter(x => x.color == boughtWith[1].color.capitalize())[0].count -= boughtWith[1].count
        
        let buildedValue = 0
        for(let i = 1; i <= Object.keys(ticketToRideData.connections).length; ++i){
            if((ticketToRideData.connections[i].fromCity == state.selectedFirstCity && ticketToRideData.connections[i].toCity == state.buyingOpts.city) || (ticketToRideData.connections[i].toCity == state.selectedFirstCity && ticketToRideData.connections[i].fromCity == state.buyingOpts.city)){
                buildedValue = ticketToRideData.connections[i].elements.length
            }
        }

        state.playerLines[state.currentPlayer].push({
            fromCity: state.selectedFirstCity,
            toCity: state.buyingOpts.city,
            color: colors[state.currentPlayer]
        })

        const appendable = {
            fromCity: state.selectedFirstCity,
            toCity: state.buyingOpts.city
        }

        //algorithm to concat cities
        let breaked = false
        for(let i = 0; i < state.bigLineData[state.currentPlayer].length; ++i){
            const set = state.bigLineData[state.currentPlayer][i]
            if(set.data.includes(appendable.fromCity)){
                set.data.push(appendable.toCity)
                set.value += buildedValue
                breaked = true
                break
            }else if(set.data.includes(appendable.toCity)){
                set.data.push(appendable.fromCity)
                set.value += buildedValue
                breaked = true
                break
            }
        }
        if(!breaked){
            const arr = [appendable.fromCity, appendable.toCity]
            state.bigLineData[state.currentPlayer].push({
                data: arr,
                value: buildedValue
            })
        }
        let indexes = [-1, -1]
        for(let i = 0; i < state.bigLineData[state.currentPlayer].length; ++i){
            for(let j = 0; j < state.bigLineData[state.currentPlayer][i].data.length; ++j){
                for(let k = i + 1; k < state.bigLineData[state.currentPlayer].length; ++k){
                    console.log(state.bigLineData[state.currentPlayer][k])
                    console.log(state.bigLineData[state.currentPlayer][i].data[j])
                    console.log('-----------')
                    if(state.bigLineData[state.currentPlayer][k].data.includes(state.bigLineData[state.currentPlayer][i].data[j])){
                        indexes[0] = i
                        indexes[1] = k
                        break
                    }
                }
            }
        }
        if(indexes[0] != -1 && indexes[1] != -1){
            state.bigLineData[state.currentPlayer][indexes[0]] = [...new Set(state.bigLineData[state.currentPlayer][indexes[0]].concat(state.bigLineData[state.currentPlayer][indexes[1]]))]
            state.bigLineData[state.currentPlayer][indexes[0]].value += state.bigLineData[state.currentPlayer][indexes[1]].value
            state.bigLineData[state.currentPlayer].splice(indexes[1], 1)
        }

        for(let i = 0; i < state.bigLineData[state.currentPlayer].length; ++i){
            const data = state.bigLineData[state.currentPlayer][i].data
            for(let j = 0; j < state.playerGoals[state.currentPlayer].length; ++j){
                const currentGoal = state.playerGoals[state.currentPlayer][j]
                if(data.includes(currentGoal.fromCity) && data.includes(currentGoal.toCity)){
                    state.playerGoals[state.currentPlayer][j].completed = true
                }
            }
        }

        state.buyingOpts = []
        state.selectedFirstCity = ''
        nextPlayer(state)
    },
    hoveringGoal: (state, action) => {
        state.isHovering = action.payload
    },
    drawDestinationsInGame: (state, action) => {
        if(state.destinations.length == 0) return
        state.gameState = 'DESTINATION_IN_GAME'
        state.playerGoalOptions[state.currentPlayer] = []
        Array.from(Array(state.destinations.length < 3 ? state.destinations.length : 3).keys()).map(i => {
            state.playerGoalOptions[state.currentPlayer].push(state.destinations.shift())
        })
    }
}
});

function nextPlayer(state){
    state.currentPlayer++
    state.currentPlayer %= state.playerCount
    state.hoveredData = {
        'fromCity': '',
        'toCity': ''
    }
    state.selectedGoalIndex = 0
    state.selectedFirstCity = ''
    state.buyingOpts = []
    state.isHovering = false
    state.neighbourCities = []
    state.drawedCards = 0
}

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

function canPayForIt(cardsInHand, color, length){
    
    let result = []

    if(color != 'gray'){
        console.log(color)
        const matchingCards = cardsInHand.filter(x => x.color == color.capitalize()).length > 0  ? cardsInHand.filter(x => x.color == color.capitalize())[0].count : 0
        const jokerCards = cardsInHand.filter(x => x.color == 'Joker').length > 0  ? cardsInHand.filter(x => x.color == 'Joker')[0].count : 0
        console.log(matchingCards + jokerCards)
        if((matchingCards + jokerCards) >= length){
                console.log('IGAZ')
                for(let i = 0; i <= length; ++i){
                    if(matchingCards >= length - i && jokerCards >= i){
                        let array = []
                        array.push({
                            'color': color,
                            'count': length - i
                        })
                        array.push({
                            'color': 'Joker',
                            'count': i
                        })
                        result.push(array)
                    }
                }
                return result
        }else{
            return false
        }
    }else{
        colors.map(ccolor => {
            const matchingCards = cardsInHand.filter(x => x.color == ccolor.capitalize()).length > 0  ? cardsInHand.filter(x => x.color == ccolor.capitalize())[0].count : 0
            const jokerCards = cardsInHand.filter(x => x.color == 'Joker').length > 0  ? cardsInHand.filter(x => x.color == 'Joker')[0].count : 0
            console.log(matchingCards + jokerCards)
            if((matchingCards + jokerCards) >= length){
                    console.log('IGAZ')
                    for(let i = 0; i <= length; ++i){
                        if(matchingCards >= length - i && jokerCards >= i){
                            let array = []
                            array.push({
                                'color': ccolor,
                                'count': length - i
                            })
                            array.push({
                                'color': 'Joker',
                                'count': i
                            })
                            result.push(array)
                        }
                    }
                }
        })
        if(result.length == 0){
            return false
        }else{
            return result
        }
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
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
    setHoveredData,
    selectFirstCity,
    selectSecondCity,
    build,
    hoveringGoal,
    drawDestinationsInGame
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
export const selectedFirstCity = state => state.data.selectedFirstCity
export const neighbourCitiesData = state => state.data.neighbourCities
export const buyingOpts = state => state.data.buyingOpts
export const openBuying = state => state.data.openBuyingOptions
export const playerLines = state => state.data.playerLines
export const isHovering = state => state.data.isHovering
export const playerInfos = state => state.data.playerInfos
export const allPlayerHand = state => state.data.playerHands
export const allGoals = state => state.data.playerGoals
export const currentIdx = state => state.data.currentPlayer

export default dataSlice.reducer