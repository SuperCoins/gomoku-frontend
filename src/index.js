import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  HashRouter,
} from 'react-router-dom';
import './index.css';

import Navbar from './navbar/navbar.js';
import HomePage from './homepage/homepage.js';
import Authors from './authors/authors.js';
import Leaderboard from './leaderboard/leaderboard.js';
import SetVisualiser from './visualiser/setVisualiser.js';

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Navbar />
          <div className="content">
            <Route exact path="/" component={HomePage} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/authors" component={Authors} />
            <Route path="/visualiser" component={SetVisualiser} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);