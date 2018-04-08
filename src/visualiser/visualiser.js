import React from 'react';

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
    let match = next.match
    let turn = next.turn

    return {
      match,
      turn
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.match) return

    const canvas = this.refs.visualiser
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#222f3eD0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let gutter = 10

    let gridSize = (canvas.width - gutter * 2) / 19

    for (let i = 0; i <= 19; i++) {
      ctx.strokeStyle = 'rgba(0,0,0,0.2)'
      ctx.lineWidth = 2

      ctx.beginPath()
      ctx.moveTo(gutter, gutter + i * gridSize)
      ctx.lineTo(canvas.width - gutter, gutter + i * gridSize)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(gutter + i * gridSize, gutter)
      ctx.lineTo(gutter + i * gridSize, canvas.height - gutter)
      ctx.stroke()
    }

    for (let i = -1; i <= Math.min(this.state.turn, this.state.match.moveList.length); i++) {
      if (i == -1) continue
      let move = this.state.match.moveList[i]
      let position = this.moveIntToXY(move)
      let buffer = 4
      if (i % 2 == 0) {
        this.drawX(ctx, gridSize, gutter, buffer, position.x, position.y)
      } else {
        this.drawO(ctx, gridSize, gutter, buffer, position.x, position.y)
      }
    }

  }

  moveIntToXY(n) {
    let x = n % 19
    let y = (n - x) / 19
    return { x, y }
  }

  drawX(ctx, gridSize, gutter, buffer, x, y) {
    ctx.strokeStyle = '#ee5253'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.lineTo(gutter + x * gridSize + buffer, gutter + y * gridSize + buffer)
    ctx.lineTo(gutter + x * gridSize + gridSize - buffer, gutter + y * gridSize + gridSize - buffer)
    ctx.stroke()

    ctx.beginPath()
    ctx.lineTo(gutter + x * gridSize + gridSize - buffer, gutter + y * gridSize + buffer)
    ctx.lineTo(gutter + x * gridSize + buffer, gutter + y * gridSize + gridSize - buffer)
    ctx.stroke()
  }

  drawO(ctx, gridSize, gutter, buffer, x, y) {
    ctx.strokeStyle = '#48dbfb'
    ctx.lineWidth = 2
    ctx.beginPath();
    ctx.arc(gutter + x * gridSize + (gridSize / 2), gutter + y * gridSize + (gridSize / 2), gridSize / 2 - buffer, 0, Math.PI * 2, true)
    ctx.stroke()
  }

  render() {
    return (
      <canvas className="visualiser" ref="visualiser" width="400" height="400"></canvas>
    );
  }
}

export default Visualiser