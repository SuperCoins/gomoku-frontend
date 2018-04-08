import React from 'react';
import './homepage.css';
import TopTen from './top-ten/top-ten.js';
import BestBot from './best-bot/best-bot.js';

function HomePage(props) {
    return (
        <div id="home-page" className="container">
            <div className="row full-height">
                <div id="best-bot" className="col-5"><BestBot /></div>
                <div id="leaderboard" className="offset-2 col-5"><TopTen /></div>
            </div>
        </div>
    );
}

export default HomePage;