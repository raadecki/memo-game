import React from 'react';
import { shallow } from 'enzyme';
import Highscore from './Highscore';

const ATTRIBUTES = {
	emptyScores: [],
	scores: [{
		turns: 1,
		player: 'test'
	}]
}

describe('Highscore.jsx', () => {
	Object.keys(ATTRIBUTES).forEach((key) => {
		it(`should generate ${key}`, () => {
			const highscore = shallow(<Highscore scores={ATTRIBUTES[key]}/>);
			const tbody = highscore.find('tbody');
			expect(tbody.children().length).toBe(ATTRIBUTES[key].length);
		});
	});
});
