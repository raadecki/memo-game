import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

const ATTRIBUTES = {
	matched: false,
	deckKey: 'test',
	matchedDeckKey: 'test1',
	code: 'code',
	image: 'src',
	onCardSelect: () => {}
}

describe('Card.jsx', () => {
	it('should generate card face down', () => {
		const card = shallow(<Card deckKey={ATTRIBUTES.deckKey} matchedDeckKey={ATTRIBUTES.matchedDeckKey} matched={ATTRIBUTES.matched} code={ATTRIBUTES.code} imageSrc={ATTRIBUTES.image} onCardSelect={ATTRIBUTES.onCardSelect} />);
		const button = card.find('button.btn-card-back');
		expect(button.exists()).toBe(true);
		expect(button.text()).toEqual('SHOW CARD');
	});

	it('should generate card face up', () => {
		const card = shallow(<Card deckKey={ATTRIBUTES.deckKey} matchedDeckKey={ATTRIBUTES.matchedDeckKey} matched={!ATTRIBUTES.matched} code={ATTRIBUTES.code} imageSrc={ATTRIBUTES.image} onCardSelect={ATTRIBUTES.onCardSelect} />);
		const img = card.find('img');
		const button = card.find('button.btn-card-back');
		expect(img.exists()).toBe(true);
		expect(button.exists()).toBe(false);
	})
});
