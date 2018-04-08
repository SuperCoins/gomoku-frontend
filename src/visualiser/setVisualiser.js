import React from 'react';
import './setVisualiser.css';
import axios from 'axios';
import Visualiser from './visualiser.js';
import apiService from '../services/api-service.js';
import WinRateVisualiser from './winRateVisualiser.js';

class SetVisualiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      turn: 0
    }

    this.handleSliderChange = this.handleSliderChange.bind(this)
  }

  componentDidMount() {
    apiService.getMatchesOfMostRecentSet().then(response => {
      this.setState({
        matches: response.data,
        turn: -1,
      })
    })
  }

  handleSliderChange(e) {
    this.setState({
      turn: e.target.value
    })
  }

  render() {
    let m = this.state.matches.filter(x => x.scores.some(y => y.won))

    console.log('set visualiser rerendering', this.state.matches)
    return (
      <div className="container">
        <div id="visualisers">
          <Visualiser match={m[0]} turn={this.state.turn} />
          <WinRateVisualiser matches={this.state.matches} />
        </div>
        <div id="inputContainer">
            <input type='range' onChange={this.handleSliderChange} defaultValue='-1' min='-1' max={Math.max(...this.state.matches.map(x => x.moveList.length))} />
          </div>
      </div>
    );
  }
}

export default SetVisualiser