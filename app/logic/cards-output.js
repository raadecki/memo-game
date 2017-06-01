export default {
  stateWithPlayer: {
    player: 'test'
  },
  stateWithHighscore: {
    highscores: [{
      turns: 1,
      player: 'test'
    }]
  },
  stateWithPickedCard: {
    deckOne: {
      AC: {
        matched: true
      }
    },
    deckOnePicked: 'AC'
  },
  stateWithUnmatchedCards: {
    turns: 1,
    deckOnePicked: null,
    deckTwoPicked: null,
    deckOne: {
      AC: {
        matched: false
      }
    },
    deckTwo: {
      '7C': {
        matched: false
      }
    },
  },
  stateWithMatchedCards: {
    turns: 1,
    matches: 1,
    finished: true,
    deckOnePicked: null,
    deckTwoPicked: null,
    deckOneCodes: ['AC'],
    deckOne: {
      AC: {
        matched: true
      }
    },
    deckTwo: {
      AC: {
        matched: true
      }
    },
  },
  initialState: {
    deckId: 'qdcxc0cn1dx0',
    deckOneCodes: ['7D', '0H', 'AH', 'QS', 'JC', '0C', '2S', '7C', 'AC'],
    deckOne: {
        '7D': {
          code: '7D',
          image: 'http://deckofcardsapi.com/static/img/7D.png',
          matched: false
        },
        '0H': {
          code: '0H',
          image: 'http://deckofcardsapi.com/static/img/0H.png',
          matched: false
        },
        'AH': {
          code: 'AH',
          image: 'http://deckofcardsapi.com/static/img/AH.png',
          matched: false
        },
        'QS': {
          code: 'QS',
          image: 'http://deckofcardsapi.com/static/img/QS.png',
          matched: false
        },
        'JC': {
          code: 'JC',
          image: 'http://deckofcardsapi.com/static/img/JC.png',
          matched: false
        },
        '0C': {
          code: '0C',
          image: 'http://deckofcardsapi.com/static/img/0C.png',
          matched: false
        },
        '2S': {
          code: '2S',
          image: 'http://deckofcardsapi.com/static/img/2S.png',
          matched: false
        },
        '7C': {
          code: '7C',
          image: 'http://deckofcardsapi.com/static/img/7C.png',
          matched: false
        },
        'AC': {
          code: 'AC',
          image: 'http://deckofcardsapi.com/static/img/AC.png',
          matched: false
        }
    },
    deckTwoCodes: ['7D', '0H', 'AH', 'QS', 'JC', '0C', '2S', '7C', 'AC'],
    deckTwo: {
        '7D': {
          code: '7D',
          image: 'http://deckofcardsapi.com/static/img/7D.png',
          matched: false
        },
        '0H': {
          code: '0H',
          image: 'http://deckofcardsapi.com/static/img/0H.png',
          matched: false
        },
        'AH': {
          code: 'AH',
          image: 'http://deckofcardsapi.com/static/img/AH.png',
          matched: false
        },
        'QS': {
          code: 'QS',
          image: 'http://deckofcardsapi.com/static/img/QS.png',
          matched: false
        },
        'JC': {
          code: 'JC',
          image: 'http://deckofcardsapi.com/static/img/JC.png',
          matched: false
        },
        '0C': {
          code: '0C',
          image: 'http://deckofcardsapi.com/static/img/0C.png',
          matched: false
        },
        '2S': {
          code: '2S',
          image: 'http://deckofcardsapi.com/static/img/2S.png',
          matched: false
        },
        '7C': {
          code: '7C',
          image: 'http://deckofcardsapi.com/static/img/7C.png',
          matched: false
        },
        'AC': {
          code: 'AC',
          image: 'http://deckofcardsapi.com/static/img/AC.png',
          matched: false
        }
    },
    highscores: []
  }
}