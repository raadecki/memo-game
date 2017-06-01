import React from 'react';
import PropTypes from 'prop-types';

import handlers from '../../handlers/action-handlers';

import RegisterPlayer from '../RegisterPlayer/RegisterPlayer';
import Toolbar from '../Toolbar/Toolbar';
import CardGrid from '../CardGrid/CardGrid';
import Highscore from '../Highscore/Highscore';

require('./App.css');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.onRegisterPlayer = handlers.onRegisterPlayer.bind(this);
		this.onShuffle = handlers.onShuffle.bind(this);
		this.onResetHighscore = handlers.onResetHighscore.bind(this);
		this.onCardSelect = handlers.onCardSelect.bind(this);
		this.onSaveScore = handlers.onSaveScore.bind(this);
	}

	componentWillMount() {
		handlers.onInit.call(this);
	}

	render() {
		let view = null;

		if(!this.state.player) {
			view = <RegisterPlayer onRegisterPlayer={this.onRegisterPlayer}/>;
		} else {
			view = <div className="container-fluid">
						<Toolbar 
							turns={this.state.turns} 
							player={this.state.player}
							finished={this.state.finished}
							onSaveScore={this.onSaveScore}
							onShuffle={this.onShuffle} 
							onResetHighscore={this.onResetHighscore} />
						<div className="row">
							<CardGrid 
								header="Deck 1"
								deckKey="deckOne"
								matchedDeckKey="deckTwo"
								picked={!!this.state.deckOnePicked}
								cardCodes={this.state.deckOneCodes} 
								cardItems={this.state.deckOne}
								onCardSelect={this.onCardSelect}
								/>
							<CardGrid 
								header="Deck 2"
								deckKey="deckTwo"
								matchedDeckKey="deckOne"
								picked={!!this.state.deckTwoPicked}
								cardCodes={this.state.deckTwoCodes} 
								cardItems={this.state.deckTwo}
								onCardSelect={this.onCardSelect} />
						</div>
						<div className="row">
							<Highscore scores={this.state.highscores}/>
						</div>
					</div>
					
		}

		return (
			<div className="container-fluid">
				<div className="row">
					<h1 className="text-center">Memo Game</h1>
					{view}
				</div>
			</div>
		);
	}
}

export default App;
