import React from 'react';
import PropTypes from 'prop-types';

export default class RegisterPlayer extends React.PureComponent {
	static propTypes = {
		onRegisterPlayer: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="text-center">
				<form className="form-inline">
				  <div className="form-group">
				    <input className="form-control" type="text" name="player" ref={(player) => this.player = player} placeholder="Enter player name"/>
				  </div>
				  <button className="btn btn-default" onClick={() => this.props.onRegisterPlayer(this.player.value)}>Enter</button>
				</form>
			</div>
		);
	}
}