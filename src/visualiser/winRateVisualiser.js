import React from 'react';

class WinRateVisualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: undefined,
    }
  }

  componentDidMount() {
    const canvas = this.refs.winRateVisualiser
    const ctx = canvas.getContext("2d")

    ctx.translate(0.5, 0.5);
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  static getDerivedStateFromProps(next, prev) {
    console.log(next)
    let matches = next.matches

    return {
      matches,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.matches) return

    const canvas = this.refs.winRateVisualiser
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#222f3eD0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let gameWidth = canvas.width / this.state.matches.length

    let botIDs = this.state.matches[0].scores.map(x => x.botID)

    let wins = {}
    wins[this.state.matches[0].scores[0].botID] = 0
    wins[this.state.matches[0].scores[1].botID] = 0
    let draws = 0

    for (let i = 0; i < this.state.matches.length; i++) {
      let match = this.state.matches[i]
      let winner = match.scores.find(x => x.won)
      if (winner) {
        wins[winner.botID]++
      } else {
        draws++
      } 

      let p1Height = (wins[botIDs[0]] / (i + 1)) * canvas.height
      let drawsHeight = (draws / (i + 1) ) * canvas.height
      let p2Height = (wins[botIDs[1]] / (i + 1) ) * canvas.height

      console.log(i * gameWidth, 0, gameWidth, p1Height)

      ctx.fillStyle = '#ee5253'
      ctx.fillRect(i * gameWidth, 0, gameWidth, p1Height)
      ctx.fillStyle = '#222f3e'
      ctx.fillRect(i * gameWidth, p1Height, gameWidth, drawsHeight)
      ctx.fillStyle = '#0abde3'
      ctx.fillRect(i * gameWidth, p1Height + drawsHeight, gameWidth, p2Height)
    }
  }

  render() {
    console.log('rendering visualiser')

    return (
      <canvas className="winRateVisualiser" ref="winRateVisualiser" width="1000" height="400"></canvas>
    );
  }
}

export default WinRateVisualiser