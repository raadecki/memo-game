import logic from './logic';
import cardsInput from './cards-input';
import cardsOutput from './cards-output';

describe('logic.js', () => {

	it('should transform cards taken from server', () => {
		expect(logic.transformCards(cardsInput)).toEqual(cardsOutput);
	});

	it('should apply player to state', () => {

	});

	it('should apply highscores', () => {

	});

	it('should select card', () => {

	});

	it('should update state when cards match', () => {

	});

	it('should update state when cards don\'t match', () => {

	});
});