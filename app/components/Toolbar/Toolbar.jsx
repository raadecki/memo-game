import React from 'react';
import PropTypes from 'prop-types';

export default class Toolbar extends React.PureComponent {
	static propTypes = {
		player: PropTypes.string.isRequired,
		turns: PropTypes.number.isRequired,
		finished: PropTypes.bool.isRequired,
		onShuffle: PropTypes.func.isRequired,
		onResetHighscore: PropTypes.func.isRequired,
		onSaveScore: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		let saveResults = null;
		if(this.props.finished) {
			saveResults = <div className="col-md-1 text-center">
							<button className="btn btn-success" onClick={this.props.onSaveScore}>Save result</button>
						</div>;
		}

		return (
			<div className="row">
				<div className="col-md-1 text-center">
					<button className="btn btn-primary" onClick={this.props.onShuffle}>Play / Shuffle</button>
				</div>
				<div className="col-md-1 text-center">
					<button className="btn btn-primary" onClick={this.props.onResetHighscore}>Reset highscore</button>
				</div>
				{saveResults}
				<div className="col-md-8 text-right">Turns so far: <b>{this.props.turns}</b></div>
				<div className="col-md-1 text-center">Player: <b>{this.props.player}</b></div>
			</div>
		);
	}
}