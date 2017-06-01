/*logic functions for memo app*/

import _ from 'lodash/fp';
import cardsInput from './cards-input';
import config from '../config/app-config';

/*
App State

{
	deckId: String,
	deckOneCodes: Array,
	deckOne: Object,
	deckTwoCodes: Array,
	deckTwo: Object,
	highscores: Array,
	deckOnePicked: Object,
	deckTwoPicked: Object,
	matches: number,
	turns: number,
	palyer: String
}
*/

// Promise based functions for server interactions
function initializeState(player = '') {
	return fetch(`${config.apiUrl}/init`)
		.then((resp) => resp.json()) 
		.then((json) => transformCards(json))
		.then((initialState) => Object.assign({
			deckOnePicked: null,
			deckTwoPicked: null,
			matches: 0,
			turns: 0,
			finished: false,
			player: player
		}, initialState));
}

function saveScore(state) {
	return fetch(`${config.apiUrl}/highscore/save`, {
    	method: 'POST',
    	body: JSON.stringify({
			turns: state.turns,
			player: state.player
		})
	})
	.then((resp) => resp.json());
}

function resetHighscore(state) {
	return fetch(`${config.apiUrl}/highscore/reset`, {
    	method: 'POST'
	}).then(() => _.set('highscores', [], state));
}

// state manipulation functions

function registerPlayer(state, player) {
	return _.set('player', player, state);
}

function shuffleCards(state) {
	return _.flow(
		_.set('deckOneCodes', _.shuffle(state.deckOneCodes)),
		_.set('deckTwoCodes', _.shuffle(state.deckTwoCodes))
	)(state)
}

function applyHighscores(state, highscores) {
	return _.set('highscores', [].concat(highscores), state);
}

function selectCard(state, deckKey, cardCode) {
	return _.flow(
		_.set(`${deckKey}.${cardCode}.matched`, true),
		_.set(`${deckKey}Picked`, cardCode)
	)(state);
}

function matchCards(state, deckKey, matchedDeckKey) {
	return _.flow(
		_.set('matches', ++state.matches),
		(state) => _.set('finished', state[`${deckKey}Codes`].length === state.matches, state),
		(state) => updateCards(state, deckKey, matchedDeckKey, true)
	)(state)
}

function unmatchCards(state, deckKey, matchedDeckKey) {
	return updateCards(state, deckKey, matchedDeckKey, false);
}

// helper functions

function updateCards(state, deckKey, matchedDeckKey, matched) {
	let pickedDeckCard = _.get(`${deckKey}Picked`, state);
	let pickedMatchedDeckCard = _.get(`${matchedDeckKey}Picked`, state);
	return _.flow(
		_.set('turns', ++state.turns),
		_.set(`${deckKey}.${pickedDeckCard}.matched`, matched),
		_.set(`${matchedDeckKey}.${pickedMatchedDeckCard}.matched`, matched),
		_.set(`${deckKey}Picked`, null),
		_.set(`${matchedDeckKey}Picked`, null)
	)(state);
}

function transformCards(cardsResponse) {
	let cards = cardsResponse.cards.reduce((reduced, card) => _.set(card.code, {
		code: card.code,
		image: card.image,
		matched: false,
	}, reduced), {});
	let cardCodes = Object.keys(cards);

	return {
		deckId: cardsResponse.deck_id,
		deckOneCodes: [].concat(cardCodes),
		deckOne: _.cloneDeep(cards), // Object.assign provides on shallow clone
		deckTwoCodes: [].concat(cardCodes),
		deckTwo: _.cloneDeep(cards),
		highscores: cardsResponse.highscores
	}
}

export default {
	initializeState,
	saveScore,
	applyHighscores,
	transformCards,
	shuffleCards,
	registerPlayer,
	resetHighscore,
	selectCard,
	matchCards,
	unmatchCards
}