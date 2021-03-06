import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let index = 0; index < lines.length; index += 1) {
    const [a, b, c] = lines[index];
    if (squares[a] && (squares[a] === squares[b]) && (squares[b] === squares[c])) {
      return ([a, b, c]);
    }
  }
  return (null);
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: null,
        row: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isToggleOn: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const col = (i % 3) + 1;
    const row = (i < 3) ? 1 : (i < 6) ? 2 : 3;

    this.setState({
      history: history.concat([{
        squares,
        col,
        row,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleToggle() {
    this.setState({
      isToggleOn: !this.state.isToggleOn,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const bold = { fontWeight: 'bold' };

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}: (${history[move].col}, ${history[move].row})` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={move === this.state.stepNumber ? bold : null}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is: ${current.squares[winner[0]]}`;
    } else if (!winner && !current.squares.includes(null)) {
      status = 'It\'s a Draw';
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} winner={winner} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.handleToggle()}>
            {this.state.isToggleOn ? 'Moves in Ascending Order' : 'Moves in Descending Order'}
          </button>
          {this.state.isToggleOn ? <ol>{moves}</ol> : <ol reversed>{moves.reverse()}</ol>}
        </div>
      </div>
    );
  }
}

export default Game;
