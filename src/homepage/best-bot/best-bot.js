import React from 'react';
import './best-bot.css';
import apiService from '../../services/api-service.js';

class BestBot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bot: null,
            author: null,
        };
        apiService.getBestBot().then(bot => {
            apiService.getAuthor(bot.authorID).then(author => {
                this.setState({ author });
            });
            this.setState({ bot });
        });
        this.getBotInfo = this.getBotInfo.bind(this);
    }

    getBotInfo() {
        if (this.state.bot == null || this.state.author == null) return;
        return (
            <div className="row bot-info-content-row">
                <div className="col bot-info-content">
                    <h3>{this.state.bot.botName}</h3>
                    <h5>{this.state.author.authorName}</h5>
                    <p>With a glorious {(this.state.bot.winRate * 100).toFixed(0)}% winrate!</p>
                    <p className="footer-quote">"Do you dare to challenge the smartest bot known to man?"</p>
                </div>
            </div>);
    }

    render() {
        return (
            <div id="best-bot-main">
                <div className="row justify-content-center">
                    <div className="col">
                        <h4 id="best-bot-title">Best Bot</h4>
                    </div>
                </div>
                <div className="row bot-image" />
                {this.getBotInfo()}
            </div>
        );
    }
}

export default BestBot;