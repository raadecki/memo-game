import React from 'react';
import PropTypes from 'prop-types';

export default class Highscore extends React.PureComponent {
	static propTypes = {
		scores: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {
		let scores = this.props.scores.map((score, index) => {
			return (
				<tr key={index}>
					<td>{index+1}</td>
					<td>{score.turns}</td>
					<td>{score.player}</td>
				</tr>
			)
		})
		return (
			<div className="col-md-12 table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>#</th>
							<th>Turns</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{scores}
					</tbody>
				</table>
			</div>
		);
	}
}