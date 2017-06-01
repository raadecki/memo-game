import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';

export default class CardGrid extends React.PureComponent {
	static propTypes = {
		header: PropTypes.string.isRequired,
		picked: PropTypes.bool.isRequired,
		deckKey: PropTypes.string.isRequired,
		matchedDeckKey: PropTypes.string.isRequired,
		cardCodes: PropTypes.array.isRequired,
		cardItems: PropTypes.object.isRequired,
		onCardSelect: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		let onCardSelect = this.props.picked ? () => {} : this.props.onCardSelect;
		let cardGrid = _.range(this.props.cardCodes.length / 3).map((rowNumber) => {
			let cardIndex = rowNumber * 3;
			let firstCard = this.props.cardItems[this.props.cardCodes[cardIndex]];
			let secondCard = this.props.cardItems[this.props.cardCodes[cardIndex+1]];
			let thirdCard = this.props.cardItems[this.props.cardCodes[cardIndex+2]];
			return (<div key={rowNumber} className="row">
				<div className="col-md-4 text-center">
					<Card deckKey={this.props.deckKey} matchedDeckKey={this.props.matchedDeckKey} matched={firstCard.matched} code={firstCard.code} imageSrc={firstCard.image} onCardSelect={onCardSelect}/>
				</div>
				<div className="col-md-4 text-center">
					<Card deckKey={this.props.deckKey} matchedDeckKey={this.props.matchedDeckKey} matched={secondCard.matched} code={secondCard.code} imageSrc={secondCard.image} onCardSelect={onCardSelect}/>
				</div>
				<div className="col-md-4 text-center">
					<Card deckKey={this.props.deckKey} matchedDeckKey={this.props.matchedDeckKey} matched={thirdCard.matched} code={thirdCard.code} imageSrc={thirdCard.image} onCardSelect={onCardSelect}/>
				</div>
			</div>);
		});

		return (
			<div className="col-md-6">
				<fieldset>
				 	<legend>{this.props.header}</legend>
				  	<div className="container-fluid">
				  		{cardGrid}
				 	</div>
				 </fieldset>
			</div>
		);
	}
}