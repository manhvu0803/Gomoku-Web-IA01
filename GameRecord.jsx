class GameRecord extends React.Component {
	constructor(props) {
		super(props);

		let squares = Array(this.props.row);
		for (let i = 0; i < this.props.row; ++i) {
			squares[i] = Array(this.props.column);
		}

		this.state = {
			squares: squares,
			gameEnded: false,
			isDirty: false,
			history: []
		}
	}

	render() {
		let popup = null;
		if (this.state.gameEnded) {
			popup = <Popup content={this.state.winner + " won!"}/>
		}

		let board = 
			<div className="Game">
				<Board 
					squares={this.state.squares}
					isDirty={this.state.isDirty}
					winCount={this.props.winCount}
					onWin={(winner) => this.handleWin(winner)}
					onClick={(x, y, turnPlayer) => this.handleClick(x, y, turnPlayer)}
				/>
				<button style={{marginTop: 2 + "rem"}} onClick={() => this.rewind()}>
					Undo
				</button>
				<div className="history">
					{this.state.history.map((item, index) => 
						<div key={index}>
							{item[0]} {item[1]}
						</div>
					)}
				</div>
				{popup}
			</div>

		this.state.isDirty = false;

		return board;
	}

	handleWin(winner) {
		this.state.gameEnded = true;
		this.state.winner = winner;
	}

	handleClick(x, y, turnPlayer) {
		if (this.state.gameEnded || this.state.squares[x][y]) {
			return false;
		}

		this.state.squares[x][y] = turnPlayer;
		this.state.history.push([x, y]);
		this.setState({isDirty: true});

		return true;
	}

	rewind() {
		let move = this.state.history.pop();
		if (move) {
			this.state.squares[move[0]][move[1]] = null;
			this.setState({isDirty: true, gameEnded: false});
		}
	}
}