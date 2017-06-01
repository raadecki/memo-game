import logic from './logic';
import cardsInput from './cards-input';
import cardsOutput from './cards-output';

let playerName = 'test';

describe('logic.js', () => {
	let deckKey = 'deckOne';
	let matchedDeckKey = 'deckTwo';
	let cardCode = 'AC';
	let score = {
      turns: 1,
      player: 'test'
    };

	it('should transform cards taken from server', () => {
		expect(logic.transformCards(cardsInput.response)).toEqual(cardsOutput.initialState);
	});

	it('should apply player to state', () => {
		expect(logic.registerPlayer(cardsInput.stateWithEmptyPlayer, playerName)).toEqual(cardsOutput.stateWithPlayer);
	});

	it('should apply highscores', () => {
		
	    expect(logic.applyHighscores(cardsInput.stateWithEmptyHighscore, score)).toEqual(cardsOutput.stateWithHighscore);
	});

	it('should select card', () => {
		expect(logic.selectCard(cardsInput.stateWithoutPickedCard, deckKey, cardCode)).toEqual(cardsOutput.stateWithPickedCard);
	});

	it('should update state when cards don\'t match', () => {
		expect(logic.unmatchCards(cardsInput.stateWithUnmatchedCards, deckKey, matchedDeckKey)).toEqual(cardsOutput.stateWithUnmatchedCards);
	});

	it('should update state when cards match', () => {
		expect(logic.matchCards(cardsInput.stateWithMatchedCards, deckKey, matchedDeckKey)).toEqual(cardsOutput.stateWithMatchedCards);
	});
});