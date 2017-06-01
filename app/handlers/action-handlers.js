import logic from '../logic/logic';

//all handler functions will be executed within App component context

const CARD_TIMEOUT = 500;

function onInit(player = '') {
	return logic.initializeState(player)
		.then((state) => logic.shuffleCards(state))
		.then((state) => this.setState(state));
}

function onRegisterPlayer(player) {
	let newState = logic.registerPlayer(this.state, player);
	_.flow(
		(newState) => logic.selectCard(newState, 'deckOne', newState.deckOneCodes[Math.floor(Math.random() * newState.deckOneCodes.length)]),
		(newState) => logic.selectCard(newState, 'deckTwo', newState.deckTwoCodes[Math.floor(Math.random() * newState.deckTwoCodes.length)]),
		(newState) => {
			if(newState.deckOnePicked === newState.deckTwoPicked) {
				this.setState(logic.matchCards(newState, 'deckOne', 'deckTwo'));
			} else {
				//ugly solution for hiding two cards if they don't match
				this.setState(newState);
				let timer = setTimeout(() => {
					clearTimeout(timer);
					this.setState(logic.unmatchCards(newState, 'deckOne', 'deckTwo'))
				}, CARD_TIMEOUT);
			} 
		}
	)(newState);
}

function onShuffle() {
	return onInit.call(this, this.state.player);
}

function onResetHighscore() {
	logic.resetHighscore(this.state)
		.then((newState) => this.setState(newState));
}

function onCardSelect(deckKey, matchedDeckKey, cardCode) {
	let newState = logic.selectCard(this.state, deckKey, cardCode);

	//pick card and update state
	let deckCard = cardCode;
	let matchedDeckCard = this.state[`${matchedDeckKey}Picked`];
	let matchedState = {};

	//check if cared from second deck has been picked
	if(!!matchedDeckCard) {
		if(matchedDeckCard === deckCard) {
			newState = logic.matchCards(newState, deckKey, matchedDeckKey)
		} else {
			// timeout to let user remember cards
			let timer = setTimeout(() => {
				clearTimeout(timer);
				this.setState(logic.unmatchCards(newState, deckKey, matchedDeckKey))
			}, CARD_TIMEOUT);
		}
	}

	this.setState(newState);
	return newState;
}

function onSaveScore() {
	logic.saveScore(this.state)
		.then((highscores) => this.setState(logic.applyHighscores(this.state, highscores)))
		.catch((err) => console.error(err))
}

export default {
	onInit,
	onRegisterPlayer,
	onShuffle,
	onResetHighscore,
	onCardSelect,
	onSaveScore
}
