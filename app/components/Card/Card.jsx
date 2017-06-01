import React from 'react';
import PropTypes from 'prop-types';

require('./Card.css');

class Card extends React.PureComponent {
	static propTypes = {
		matched: PropTypes.bool.isRequired,
		deckKey: PropTypes.string.isRequired,
		matchedDeckKey: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		onCardSelect: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		let view = null;
		let onCardSelect = () => this.props.onCardSelect(this.props.deckKey, this.props.matchedDeckKey, this.props.code);

		if(this.props.matched) {
			view = <span><img className="img-responsive img-rounded center-block" src={this.props.imageSrc} /></span>
		} else {
			view = <span><button className="btn btn-default btn-card-back" onClick={onCardSelect}>SHOW CARD</button></span>
		}

		return (
			<div>
				{view}
			</div>
		);
	}
}

export default Card;