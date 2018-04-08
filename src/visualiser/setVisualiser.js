import React from 'react';
import './setVisualiser.css';
import axios from 'axios';
import Visualiser from './visualiser.js';

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
    axios.get('http://localhost:3000/matches/efcf9466-fe94-44c4-b00e-72be1fd9efaa').then(response => {
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
          <Visualiser match={m[1]} turn={this.state.turn} />
          <Visualiser match={m[2]} turn={this.state.turn} />
          <input type='range' onChange={this.handleSliderChange} defaultValue='-1' min='-1' max={Math.max(...this.state.matches.map(x => x.moveList.length))} /> 
        </div>
      </div>
    );
  }
}

export default SetVisualiser