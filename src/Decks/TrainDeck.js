export default class TrainDeck {

    constructor(normalCards, jokerCards, colors){
        this.cards = []
        Array.from(Array(normalCards).keys()).map(i => {
            colors.map(color => {
                this.cards.push(color)
            })
        })
    
        Array.from(Array(jokerCards - normalCards).keys()).map(i => {
            this.cards.push('Joker')
        })
        
        this.shuffle(10)

    }

    shuffle(times) {
        Array.from(Array(times).keys()).map(i => {
            this.cards = this.cards
                .map(card => ({sortValue: Math.random(), card: card}))
                .sort((a, b) => a.sortValue - b.sortValue)
                .map(card => card.card)
        })
    }

    draw() {
        return this.cards.shift()
    }
}
