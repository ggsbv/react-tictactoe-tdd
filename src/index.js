import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export class Square extends React.Component {
    render() {
        return (
          <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
          </button>
        );
      }
}

export class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          player: 'X'
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (! squares[i]) {
            squares[i] = this.state.player;
            this.setState({squares: squares, player: this.nextPlayer()});
        }
    }

    nextPlayer() {
       return this.state.player === 'X' ? 'O' : 'X';     
    }

    renderSquare(i) {
        return (
            <Square
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)}
            />
          );
    }

    gameStatus() {
        const board = this.state.squares;

        if (! board.includes(null)) return "Draw!";

        return this.hasWinner()
            ? `Winner is ${this.nextPlayer()}.`
            : `Current player is:${this.state.player}`;
    }

    hasWinner() {
        const board = this.state.squares;

        return (board[0] === board[1] && board[1] === board[2] && board[1] !== null);
    }

    render() {
        const status = this.gameStatus();

        return <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>

            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>

            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>;
    }
}

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <TicTacToe />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
//   ===========================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );