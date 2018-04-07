import React from 'react';
import './homepage.css';
import TopTen from './top-ten/top-ten.js';

function HomePage(props) {
    return (
        <div id="home-page" className="container">
            <div className="row full-height">
                <div id="best-bot" className="col-5">Best bot</div>
                <div id="leaderboard" className="offset-2 col-5"><TopTen /></div>
            </div>
        </div>
    );
}

export default HomePage;

// class BotPage extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         bot: "hithere",
//       }
//     }

//     render() {
//       return (
//         <div class="container">
//           <div class="row">
//             <h1>Bot Page</h1>
//           </div>
//           <div class="card-group">
//             <BotCard value={this.state.bot} />
//             <BotCard value={this.state.bot} />
//             <BotCard value={this.state.bot} />
//           </div>
//         </div>
//       );
//     }
//   }