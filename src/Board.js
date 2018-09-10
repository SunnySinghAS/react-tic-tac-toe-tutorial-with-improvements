import React from 'react';

function Square(props) {
  const highlightWinner = { background: 'red' };
  return (
    <button className="square" style={props.winningSquare ? highlightWinner : null} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square key={i} value={this.props.squares[i]} winningSquare={this.props.winner && this.props.winner.includes(i)} onClick={() => this.props.onClick(i)} />
    );
  }

  render() {
    let cells = [];
    let rows = [];
    let cellNumber = 0;

    for (let nextRow = 0; nextRow < 3; nextRow++) {
      for (let index = 0; index < 3; index++) {
        cells.push(this.renderSquare(cellNumber));
        cellNumber++;
      }
      rows.push(<div key={nextRow} className="board-row">{cells}</div>);
      cells = [];      
    }
    
    return (
      <div>
        {rows}
      </div>
    );
  }
}

export default Board;
