import { StarRateTwoTone } from '@material-ui/icons';
import { createSlice } from '@reduxjs/toolkit'
import TrainDeck from '../Decks/TrainDeck';
import { ticketToRideData } from '../mapdata/MapData';
import {getPlayerId} from '../socket/ClientSocket'

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
    bigLineData: [],
    remainingRounds: null,
    showCompleted: [],
    throwDeck: [],
    playersJoined: 0,
    isRoomFull: false,
    history: []
  },
  reducers: {
    initNames: (state, action) => {
        state.playerInfos = []
        state.playerCount = action.payload
        Array.from(Array(state.playerCount).keys()).map(i => {
            state.bigLineData.push([])
            state.playerInfos.push([])
            const seed = Math.floor(Math.random() * 10000)
            state.playerInfos[i] = {
                name: '',
                playerColor: colors[i],
                playerScore: 0,
                playerTrainCount: 45,
                rounds: 0,
                seed: seed
            }
        })
    },
    setPlayerCount: (state, action) => {
        state.playerCount = action.payload
    },
    initPlayerHands: (state) => {
        //clearing all players hand
        state.playerHands = []
        //state.bigLineData = []
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
    },
    initOnBoardCars: (state) => {
        state.onBoardCards = []
        Array.from(Array(5).keys()).map(i => {
            state.onBoardCards.push(state.trainCards.shift())
        })
    },
    drawCardToBoard: (state, action) => {
        if(state.currentPlayer != getPlayerId()) return

        if(state.gameState != 'IN_GAME' 
        || (action.payload.color == 'Joker' && state.drawedCards > 0)) return
        if(action.payload.color == 'Cover'){
            const drawed = state.trainCards.shift()
            if(state.trainCards.length == 0){
                generateDeck(state)
            }
            state.playerHands[state.currentPlayer].filter(x => x.color == drawed)[0].count += 1
            state.drawedCards++
        }else{
            state.playerHands[state.currentPlayer].filter(x => x.color == action.payload.color)[0].count += 1
            state.onBoardCards[action.payload.idx] = state.trainCards.shift()
            if(state.trainCards.length == 0){
                generateDeck(state)
            }
            if(action.payload.color == 'Joker'){
               state.history.push('' + state.playerInfos[state.currentPlayer].name + ' Jokert húzott!')
               nextPlayer(state)
            }else{
                state.drawedCards++
            }
        }
        
        if(state.trainCards.length == 0){
            generateDeck(state)
        }
        
        if(state.drawedCards == 2){
            state.history.push('' + state.playerInfos[state.currentPlayer].name + ' két kártyát húzott!')
            nextPlayer(state)
        }

        while(state.onBoardCards.filter(x => x == 'Joker').length >= 3){
            //state.trainCards.concat(state.onBoardCards)
            state.throwDeck.concat(state.onBoardCards)
            state.onBoardCards = []
            Array.from(Array(5).keys()).map(i => {
                if(state.trainCards.length == 0){
                    generateDeck(state)
                }
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
        if(state.currentPlayer != getPlayerId()) {
            alert('Nem te vagy soron!')
        }

        console.log(state.playerGoals[state.currentPlayer])
        
        //adding the selected cards to the active players goals
        state.playerGoals[state.currentPlayer] = state.playerGoals[state.currentPlayer].concat(action.payload.selected)
        
        //putting back the unused options
        state.destinations = state.destinations.concat(action.payload.returnToDeck)
        state.playerInfos[state.currentPlayer].rounds++
        state.currentPlayer++
        if(state.gameState == 'DESTINATION_IN_GAME'){
            state.gameState = 'IN_GAME'
        }
        else if(state.currentPlayer == state.playerCount){
            state.gameState = 'IN_GAME'
            state.destinations = state.destinations.concat(state.longDestinations)
            state.longDestinations = []
            shuffle(state.destinations, 10)
        }
        //nextPlayer(state)
        state.currentPlayer %= state.playerCount
        state.history.push('' + state.playerInfos[state.currentPlayer]?.name + ' célkártyákat húzott!')
    },
    stepSelectedGoalIndex: (state, action) => {
        state.selectedGoalIndex += action.payload
        state.selectedGoalIndex = mod(state.selectedGoalIndex, state.playerGoals[state.currentPlayer].length)
        
        const fromCity = state.playerGoals[state.currentPlayer][state.selectedGoalIndex].fromCity
        const toCity = state.playerGoals[state.currentPlayer][state.selectedGoalIndex].toCity
        const completed = state.playerGoals[state.currentPlayer][state.selectedGoalIndex]?.completed

        if(completed == true){
            for(let i = 0; i < state.bigLineData[state.currentPlayer].length; ++i){
                const item = state.bigLineData[state.currentPlayer][i]
                if(item.data.includes(fromCity) && item.data.includes(toCity)){
                    const filtered = state.playerLines[state.currentPlayer].filter(x => item.data.includes(x.fromCity) && item.data.includes(x.fromCity))
                    console.log('FILTERED')
                    console.log(filtered)
                    state.showCompleted = filtered 
                    break
                }
            }
        }else{
            state.showCompleted = []
        }
    },
    setHoveredData: (state, action) => {
        state.hoveredData.fromCity = action.payload.from
        state.hoveredData.toCity = action.payload.to
    },
    selectFirstCity: (state, action) => {
        if(state.currentPlayer != getPlayerId()) return

        if(state.drawedCards > 0 || state.gameState != 'IN_GAME') return
        state.selectedFirstCity = state.selectedFirstCity == action.payload ? '' : action.payload
        state.neighbourCities = []
        state.buyingArrays = []
        if(selectFirstCity == '') return
        let newItems = []
        for(let i = 1; i <= Object.keys(ticketToRideData.connections).length; ++i){
            const item = ticketToRideData.connections[i]
            const minJokers = ticketToRideData.connections[i]?.locomotive ? ticketToRideData.connections[i].locomotive : 0
            
            if(item?.fromCity == state.selectedFirstCity
                && canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length, minJokers)){
                newItems.push(item.toCity)
                console.log(item.toCity)
                state.buyingArrays.push({
                    city: item.toCity,
                    options: canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length, minJokers),
                    color: item.color
                })
            }
            if(item?.toCity == state.selectedFirstCity
                && canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length, minJokers)){
                newItems.push(item.fromCity)
                console.log(item.fromCity)
                state.buyingArrays.push({
                    city: item.fromCity,
                    options: canPayForIt(state.playerHands[state.currentPlayer], item.color, item.elements.length, minJokers),
                    color: item.color
                })
            }
        }

        let deleteableIndexes = []
        for(let i = 0; i < state.buyingArrays.length; ++i){
            const data = state.buyingArrays[i].options
            for(let j = 0; j < data.length; ++j){
                let equals = true
                for(let k = j + 1; k < data.length; ++k){
                    if(data[j].color != data[k].color || data[j].count != data[k].count) equals = false
                }
                if(equals) deleteableIndexes.push({
                    'i': i,
                    'j': j
                })
            }
        }

        [deleteableIndexes].reverse().map(({i, j}) => {
            state.buyingArrays[i]?.options.splice(j, 1)
        })

        //delete indexes, which are already bought from someone
        let deleteIndexes = []
        let blacklist = []
        for(let i = 0; i < state.buyingArrays.length; ++i){
            for(let j = 0; j < state.playerLines.length; ++j){
                for(let k = 0; k < state.playerLines[j].length; ++k){
                    if(state.playerLines[j][k].fromCity == state.buyingArrays[i].city
                        && state.playerLines[j][k].toCity == state.selectedFirstCity
                        && state.playerLines[j][k].trainColor == state.buyingArrays[i].color
                        && blacklist.filter((item) => item.j == j && item.k == k).length == 0
                    ){
                        console.log(state.playerLines[j][k])
                        console.log(state.buyingArrays[i])
                        deleteIndexes.push(i)
                        blacklist.push({'j': j, 'k': k})
                    }
                    else if(state.playerLines[j][k].toCity == state.buyingArrays[i].city
                        && state.playerLines[j][k].fromCity == state.selectedFirstCity
                        && state.playerLines[j][k].trainColor == state.buyingArrays[i].color
                        && blacklist.filter((item) => item.j == j && item.k == k).length == 0
                    ){
                        console.log(state.playerLines[j][k])
                        console.log(state.buyingArrays[i])
                        deleteIndexes.push(i)
                        blacklist.push({'j': j, 'k': k})
                    }
                    else if(state.playerLines[j][k].fromCity == state.buyingArrays[i].city
                        && state.playerLines[j][k].toCity == state.selectedFirstCity
                        && state.playerLines[j][k].color == colors[state.currentPlayer])
                    {
                        console.log(state.playerLines[j][k])
                        console.log(state.buyingArrays[i])
                        deleteIndexes.push(i)
                        blacklist.push({'j': j, 'k': k})
                    }else if(state.playerLines[j][k].toCity == state.buyingArrays[i].city
                        && state.playerLines[j][k].fromCity == state.selectedFirstCity
                        && state.playerLines[j][k].color == colors[state.currentPlayer]
                    ){
                        console.log(state.playerLines[j][k])
                        console.log(state.buyingArrays[i])
                        deleteIndexes.push(i)
                        blacklist.push({'j': j, 'k': k})
                    }
                }
            }
        }
        [...new Set(deleteIndexes)].reverse().map(index => {
            console.log('OUT: ')
            console.log(state.buyingArrays[index])
            state.buyingArrays.splice(index, 1)
            newItems.splice(index, 1)
        })
        state.neighbourCities = state.neighbourCities.concat([...new Set(newItems)])
    },
    selectSecondCity: (state, action) => {
        if(state.currentPlayer != getPlayerId()) return

        if(state.selectedFirstCity == '') return
        state.buyingOpts = state.buyingArrays.filter(arr => arr.city == action.payload)
        state.openBuyingOptions = true
    },
    build: (state, action) => {
        if(state.currentPlayer != getPlayerId()) return

        state.openBuyingOptions = false
        if(action.payload == undefined) return
        const boughtWith = state.buyingOpts[action.payload.i].options[action.payload.j] //state.buyingOpts.options[action.payload]
        console.log(boughtWith)
        boughtWith.map(item => {
            Array.from(Array(item.count).keys()).map(i => {
                const color = item.color.capitalize()
                state.throwDeck.push(color)
            })
        })
        /*we have to check the color on the map
        Option1: the color is the one we are paying with
        Option2: it is a gray trainColor and we are paying with a random trainColor
        */
       let trainColor = ''
        if(boughtWith[0].color != 'Joker'){
            trainColor = boughtWith[0].color
        }else{
            trainColor = boughtWith[1].color
        }
        
        let buildedValue = 0
        let isPossibleColor = false
        for(let i = 1; i <= Object.keys(ticketToRideData.connections).length; ++i){
            if((ticketToRideData.connections[i].fromCity == state.selectedFirstCity && ticketToRideData.connections[i].toCity == state.buyingOpts[action.payload.i].city) || (ticketToRideData.connections[i].toCity == state.selectedFirstCity && ticketToRideData.connections[i].fromCity == state.buyingOpts[action.payload.i].city)){
                buildedValue = ticketToRideData.connections[i].elements.length
                console.log('ÁRAK MEGTALÁLVA')
                console.log(ticketToRideData.connections[i].elements)
                console.log(buildedValue)
                //trainColor = ticketToRideData.connections[i].color
                if(ticketToRideData.connections[i].color == trainColor) isPossibleColor = true
            }
        }
        if(state.playerInfos[state.currentPlayer].playerTrainCount < buildedValue) return

        state.playerInfos[state.currentPlayer].playerTrainCount -= buildedValue
        state.playerInfos[state.currentPlayer].playerScore += parseInt(pointCounter(buildedValue))

        if(state.playerInfos[state.currentPlayer].playerTrainCount <= 2 && state.remainingRounds == null){
            state.remainingRounds = 1
        }

        state.playerHands[state.currentPlayer].filter(x => x.color == boughtWith[0].color.capitalize())[0].count -= boughtWith[0].count
        state.playerHands[state.currentPlayer].filter(x => x.color == boughtWith[1].color.capitalize())[0].count -= boughtWith[1].count
        
        if(!isPossibleColor) trainColor = 'gray'
        //alert(state.selectedFirstCity)
        state.playerLines[state.currentPlayer].push({
            fromCity: state.selectedFirstCity,
            toCity: state.buyingOpts[action.payload.i].city,
            color: colors[state.currentPlayer],
            trainColor: action.payload.color
        })

        const appendable = {
            fromCity: state.selectedFirstCity,
            toCity: state.buyingOpts[action.payload.i].city
        }

        //algorithm to concat cities
        let breaked = false
        const upperBound = state.bigLineData.length > 0 ? state.bigLineData[state.currentPlayer].length : 0
        for(let i = 0; i < upperBound; ++i){
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
                    //console.log(state.bigLineData[state.currentPlayer][k])
                    //console.log(state.bigLineData[state.currentPlayer][i].data[j])
                    //console.log('-----------')
                    if(state.bigLineData[state.currentPlayer][k].data.includes(state.bigLineData[state.currentPlayer][i].data[j])){
                        indexes[0] = i
                        indexes[1] = k
                        break
                    }
                }
            }
        }
        if(indexes[0] != -1 && indexes[1] != -1){
            state.bigLineData[state.currentPlayer][indexes[0]].data = [...new Set(state.bigLineData[state.currentPlayer][indexes[0]].data.concat(state.bigLineData[state.currentPlayer][indexes[1]].data))]
            state.bigLineData[state.currentPlayer][indexes[0]].value += state.bigLineData[state.currentPlayer][indexes[1]].value
            state.bigLineData[state.currentPlayer].splice(indexes[1], 1)
        }

        for(let i = 0; i < state.bigLineData[state.currentPlayer].length; ++i){
            const data = state.bigLineData[state.currentPlayer][i].data
            for(let j = 0; j < state.playerGoals[state.currentPlayer].length; ++j){
                const currentGoal = state.playerGoals[state.currentPlayer][j]
                if(data && data.includes(currentGoal.fromCity) && data.includes(currentGoal.toCity) 
                    && state.playerGoals[state.currentPlayer][j].completed == false){
                    state.playerGoals[state.currentPlayer][j].completed = true
                    state.playerInfos[state.currentPlayer].playerScore += parseInt(state.playerGoals[state.currentPlayer][j].value)
                }
            }
        }

        state.buyingOpts = []
        state.selectedFirstCity = ''
        state.history.push('' + state.playerInfos[state.currentPlayer].name + ' útvonalat épített!')
        nextPlayer(state)
    },
    hoveringGoal: (state, action) => {
        state.isHovering = action.payload
    },
    drawDestinationsInGame: (state, action) => {
        if(state.currentPlayer != getPlayerId()) return

        if(state.gameState != 'IN_GAME' || state.drawedCards > 0) return
        if(state.destinations.length == 0) return
        state.gameState = 'DESTINATION_IN_GAME'
        state.playerGoalOptions[state.currentPlayer] = []
        Array.from(Array(state.destinations.length < 3 ? state.destinations.length : 3).keys()).map(i => {
            state.playerGoalOptions[state.currentPlayer].push(state.destinations.shift())
        })
    },
    setPlayerName: (state, action) => {
        for(let i = 0; i < state.playerInfos.length; ++i){
            if(state.playerInfos[i].name == '' || state.playerInfos[i].name == undefined){
                state.playerInfos[i].name = action.payload.name
                state.playersJoined++
                console.log('SETTING NAME')
                break
            }
        }
    },
    playerLeaved: (state, action) => {
        for(let i = 0; i < state.playerInfos.length; ++i){
            if(state.playerInfos[i].name == action.payload.name){
                state.playerInfos[i].name = ''
                state.playersJoined--
            }
        }
    },
    roomIsFull: (state) => {
        console.log('SLICE ROOM SET TO FULL')
        if(!state.isRoomFull)
            state.isRoomFull = true
    },
    synchronize: (state, action) => {
        state.trainCards        = action.payload.trainCards
        state.drawedCards       = action.payload.drawedCards
        state.playerGoalOptions = action.payload.playerGoalOptions
        state.bigLineData       = action.payload.bigLineData
        state.currentPlayer     = action.payload.currentPlayer
        state.destinations      = action.payload.destinations
        state.longDestinations  = action.payload.longDestinations
        state.isRoomFull        = action.payload.isRoomFull
        state.onBoardCards      = action.payload.onBoardCards
        state.throwDeck         = action.payload.throwDeck
        state.playerInfos       = action.payload.playerInfos
        state.playerGoals       = action.payload.playerGoals
        state.drawedCards       = action.payload.drawedCards
        state.playerHands       = action.payload.playerHands
        state.playerCount       = action.payload.playerCount
        state.gameState         = action.payload.gameState
        state.playerLines       = action.payload.playerLines
        state.history           = action.payload.history
    }
}
});

function nextPlayer(state){
    state.playerInfos[state.currentPlayer].rounds++
    state.currentPlayer++
    if(state.currentPlayer == state.playerCount && state.remainingRounds == 0){
        state.gameState = 'END_GAME'
        let maximums = Array(state.playerCount)
        for(let i = 0; i < state.bigLineData.length; ++i){
            for(let j = 0; j < state.bigLineData[i].length; ++j){
                const item = state.bigLineData[i][j]

                if(item.value > (maximums[i] == undefined ? 0 : maximums[i])){
                    maximums[i] = item.value
                }
            }
        }
        for(let i = 0; i < maximums.length; ++i){
            state.playerInfos[i].longestTrain = maximums[i]
        }
        let maxValue = maximums.reduce((a, b) => b > a ? b : a)
        maximums.map((value, index) => {
            if(value == maxValue){
                state.playerInfos[index].playerScore += 10
            }
        })
    }
    if(state.currentPlayer == state.playerCount && state.remainingRounds == 1){
        state.remainingRounds = 0
    }
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

function canPayForIt(cardsInHand, color, length, minJokers){
    
    let result = []

    if(color != 'gray'){
        console.log(color)
        const matchingCards = cardsInHand.filter(x => x.color == color.capitalize()).length > 0  ? cardsInHand.filter(x => x.color == color.capitalize())[0].count : 0
        const jokerCards = cardsInHand.filter(x => x.color == 'Joker').length > 0  ? cardsInHand.filter(x => x.color == 'Joker')[0].count : 0
        console.log(matchingCards + jokerCards)
        if((matchingCards + jokerCards) >= length){
                console.log('IGAZ')
                for(let i = 0; i <= length; ++i){
                    if(matchingCards >= length - i && jokerCards >= i && jokerCards >= minJokers){
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
                for(let i = 0; i < result.length; ++i){
                    result[i] = [...new Set(result[i])]
                }
                return result
        }else{
            return false
        }
    }else{
        colors.filter(ccolor => ccolor != 'Joker').map(ccolor => {
            const matchingCards = cardsInHand.filter(x => x.color == ccolor.capitalize()).length > 0  ? cardsInHand.filter(x => x.color == ccolor.capitalize())[0].count : 0
            const jokerCards = cardsInHand.filter(x => x.color == 'Joker').length > 0  ? cardsInHand.filter(x => x.color == 'Joker')[0].count : 0
            console.log(matchingCards + jokerCards)
            if((matchingCards + jokerCards) >= length){
                    console.log('IGAZ')
                    for(let i = 0; i <= length; ++i){
                        if(matchingCards >= length - i && jokerCards >= i && jokerCards >= minJokers){
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
            for(let i = 0; i < result.length; ++i){
                result[i] = [...new Set(result[i])]
            }
        })
        if(result.length == 0){
            return false
        }else{
            return result
        }
    }
}

function notBoughtFromOthers(city, playerLines, color) {
    playerLines.map(player => {
        player.map(line => {
            if(line.city == city && line.color == color) return false
        })
    })
    return true
}

function pointCounter(length){
    switch(length){
        case 1:
            return 1;
            break;
        case 2:
            return 2;
            break;
        case 3:
            return 4;
            break;
        case 4:
            return 7;
            break;
        case 6:
            return 15;
            break;
        case 8:
            return 21;
            break;
    }
}

function generateDeck(state) {
    shuffle(state.throwDeck, 10)
    state.trainCards = state.throwDeck
    state.throwDeck = []
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
    drawDestinationsInGame,
    setPlayerName,
    playerLeaved,
    initNames,
    roomIsFull,
    synchronize
 } = dataSlice.actions

export const onBoardCards           = state => state.data.onBoardCards
export const trainDeckLength        = state => state.data.trainCards.length
export const goalDeckLength         = state => state.data.destinations.length + state.data.longDestinations.length
export const currentGoalCards       = state => state.data.playerGoalOptions[state.data.currentPlayer]
export const gameState              = state => state.data.gameState
export const actualPlayerHand       = state => state.data.playerHands[state.data.currentPlayer]
export const actualPlayerGoals      = state => state.data.playerGoals[state.data.currentPlayer]
export const actualGoalIndex        = state => state.data.selectedGoalIndex
export const hoveredData            = state => state.data.hoveredData
export const selectedFirstCity      = state => state.data.selectedFirstCity
export const neighbourCitiesData    = state => state.data.neighbourCities
export const buyingOpts             = state => state.data.buyingOpts
export const openBuying             = state => state.data.openBuyingOptions
export const playerLines            = state => state.data.playerLines
export const isHovering             = state => state.data.isHovering
export const playerInfos            = state => state.data.playerInfos
export const allPlayerHand          = state => state.data.playerHands
export const allGoals               = state => state.data.playerGoals
export const currentIdx             = state => state.data.currentPlayer
export const showCompletedLine      = state => state.data.showCompleted
export const isRoomFull             = state => state.data.isRoomFull
export const playersJoined          = state => state.data.playersJoined
export const history                = state => state.data.history

export const ownPlayerHand = state => state.data.playerHands[getPlayerId()]
export const ownPlayerGoalOptions = state => state.data.playerGoalOptions[getPlayerId()]
export const ownPlayerGoals = state => state.data.playerGoals[getPlayerId()]

export default dataSlice.reducer