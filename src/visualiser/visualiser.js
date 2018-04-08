import React from 'react';
import './visualiser.css';

class Visualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: undefined,
      turn: 0,
    }
  }

  componentDidMount() {
    const canvas = this.refs.visualiser
    const ctx = canvas.getContext("2d")

    ctx.translate(0.5, 0.5);
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(10, 10, 100, 100)

  }

  static getDerivedStateFromProps(next, prev) {
    console.log(next)
    let match = next.match
    let turn = next.turn

    return {
      match,
      turn
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //if (!this.state.match) return
    if (this.state.turn >= this.state.match.moveList.length) return

    console.log('this many turns: ' + this.props.turn)

    const canvas = this.refs.visualiser
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#222f3eD0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let gridSize = canvas.width / 19

    for (let i = 0; i <= 19; i++) {
      ctx.strokeStyle = '#3b4651c0'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(0, i * gridSize)
      ctx.lineTo(canvas.width, i * gridSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(i * gridSize, 0)
      ctx.lineTo(i * gridSize, canvas.height)
      ctx.stroke()
    }

    for (let i = -1; i <= this.state.turn; i++) {
      if (i == -1) continue
      let move = this.state.match.moveList[i]
      let position = this.moveIntToXY(move)
      let buffer = 4
      console.log(position)
      if (i % 2 == 0) {
        this.drawX(ctx, gridSize, buffer, position.x, position.y)
      } else {
        this.drawO(ctx, gridSize, buffer, position.x, position.y)
      }
    }

  }

  moveIntToXY(n) {
    let x = n % 19
    let y = (n - x) / 19
    return { x, y }
  }

  drawX(ctx, gridSize, buffer, x, y) {
    ctx.strokeStyle = '#ee5253'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.lineTo(x * gridSize + buffer, y * gridSize + buffer)
    ctx.lineTo(x * gridSize + gridSize - buffer, y * gridSize + gridSize - buffer)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(x * gridSize + gridSize - buffer, y * gridSize + buffer)
    ctx.lineTo(x * gridSize + buffer, y * gridSize + gridSize - buffer)
    ctx.stroke()
  }

  drawO(ctx, gridSize, buffer, x, y) {
    ctx.strokeStyle = '#48dbfb'
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.arc(x * gridSize + (gridSize / 2), y * gridSize + (gridSize / 2), gridSize / 2 - buffer, 0, Math.PI * 2, true)
    ctx.stroke()
  }

  render() {
    console.log('rendering visualiser')

    return (
      <canvas ref="visualiser" width="300" height="300"></canvas>
    );
  }
}

export default Visualiser