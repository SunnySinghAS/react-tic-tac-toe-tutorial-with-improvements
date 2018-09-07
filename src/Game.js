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
      return (squares[a]);
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const bold = { fontWeight: 'bold' };
    const normal = { fontWeight: 'normal' };

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}: (${history[move].col}, ${history[move].row})` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} style={move === this.state.stepNumber ? bold : normal}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is: ${winner}`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
