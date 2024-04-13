const { createApp } = Vue

function getRandomAttackValue(speed) {
    return Math.round(Math.random() * speed)
}
createApp({
    data() {
        return {
            playerScore: 100,
            monsterScore: 100,
            gameMessage: null,
            logsData: []
        }
    },
    computed: {
        monsterhealth() {
            return { width: this.monsterScore + '%' }
        },
        playerhealth() {
            return { width: this.playerScore + '%' }
        },
    },
    watch: {
        monsterScore(value) {
            if (value < 0 && this.playerScore < 0) {
                this.gameMessage = 'Draw'
            } else if (value <= 0) {
                this.gameMessage = 'Player Won'
            }
        },
        playerScore(value) {
            if (value < 0 && this.monsterScore < 0) {
                this.gameMessage = 'Draw'
            } else if (value <= 0) {
                this.gameMessage = 'Monster Won'
            }
        }
    },
    methods: {
        attackPlayer() {
            const attackValue = getRandomAttackValue(10)
            this.playerScore -= attackValue
            if (this.playerScore < 0) {
                this.playerScore = 0
            }
            this.logs('from monster to player', attackValue, 'attack')
        },
        attackMonster() {
            const attackValue = getRandomAttackValue(10)
            this.monsterScore -= attackValue
            if (this.monsterScore < 0) {
                this.monsterScore = 0
            }
            this.logs('from player to monster', attackValue, 'attack')
            this.attackPlayer()
        },
        specialAttackMonster() {
            const attackValue = getRandomAttackValue(30)
            this.monsterScore -= attackValue
            if (this.monsterScore < 0) {
                this.monsterScore = 0
            }
            this.logs('from player to monster', attackValue, 'special-attack')
            this.specialAttackPlayer()
        },
        specialAttackPlayer() {
            const attackValue = getRandomAttackValue(30)
            this.playerScore -= attackValue
            if (this.playerScore < 0) {
                this.playerScore = 0
            }
            this.logs('from monster to player', attackValue, 'special-attack')
        },
        heal() {
            const attackValue = getRandomAttackValue(40)
            this.playerScore += attackValue
            if (this.playerScore + attackValue > 100) {
                this.playerScore = 100
            }
            this.logs('player', attackValue, 'heal')
            this.attackPlayer()
        },
        logs(attack, attackValue, what) {
            this.logsData.unshift({
                attack,
                attackValue,
                what
            })
        },
        restartGame() {
            this.logsData = []
            this.gameMessage = null
            this.monsterScore = 100
            this.playerScore = 100
        },
        surrender() {
            this.monsterScore = 100
            this.playerScore = 100
            this.gameMessage = 'Monster won'
        }
    },
}).mount('#app')