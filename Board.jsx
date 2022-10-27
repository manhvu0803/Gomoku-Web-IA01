class Board extends React.Component {
	constructor(props) {
		super(props);

		let highlight = Array(this.props.squares.length);
		for (let i = 0; i < highlight.length; ++i) {
			highlight[i] = Array(this.props.squares[i].length);
		}

		this.state = {
			highlight: highlight,
			turnPlayer: "O"
		}
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.isDirty;
	}

	render() {
		let board = [];
		let squares = this.props.squares;

		this.state.turnPlayer = (this.state.turnPlayer == "X")? "O" : "X";

		for (let i = 0; i < squares.length; ++i) {
			let row = [];
			for (let j = 0; j < squares[i].length; ++j) {
				row.push(<Square 
							value={squares[i][j]}
							highlight={this.state.highlight[i][j]}
							onClick={() => this.handleClick(i, j)} 
							key={j}
						/>
				);
				this.state.highlight[i][j] = false;
			}

			board.push(<div className="Board-Row" key={i}>{row}</div>);
		}

		return <div className="Board">{board}</div>;
	}

	handleClick(x, y) {
		if (!this.props.onClick(x, y, this.state.turnPlayer)) {
			return;
		}

		if (this.isWin(x, y)) {
			this.props.onWin(this.state.turnPlayer);
		}
	}

	isWin(x, y) {
		return this.isWinCallback(x, this.props.squares.length, (i) => [i, y]) // Vertical
			|| this.isWinCallback(y, this.props.squares[0].length, (i) => [x, i]) // Horizontal
			|| this.isWinCallback(x, this.props.squares.length, (i) => [i, y - x + i]) // Main diagonal
			|| this.isWinCallback(x, this.props.squares.length, (i) => [i, y + x - i]) // Side diagonal
	}

	isWinCallback(start, max, positionGetter) {
		let winMoves = [positionGetter(start)];

		for (let i = start - 1; i >= 0; --i) {
			let pos = positionGetter(i);
			if (this.player(pos) == this.state.turnPlayer) {
				winMoves.push(pos);
			}
			else {
				break;
			}
		}

		for (let i = start + 1; i < max; ++i) {
			let pos = positionGetter(i);
			if (this.player(pos) == this.state.turnPlayer) {
				winMoves.push(pos);
			}
			else {
				break;
			}
		}

		if (winMoves.length >= this.props.winCount) {
			for (const move of winMoves) {
				this.state.highlight[move[0]][move[1]] = true;
			}
			return true;
		}

		return false;
	}

	player(pos) {
		return this.props.squares[pos[0]][pos[1]];
	}
}