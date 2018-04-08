import React from 'react';
import './top-ten.css';
import apiService from '../../services/api-service.js';

class TopTen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bots: [],
        };
        this.positionColours = {
            0: "table-success",
            1: "table-warning",
            2: "table-error"
        }
        this.fetchData();
        console.log(process.env)
        var ws = new WebSocket(`ws://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_WS_PORT}`);
        ws.onmessage = message => {
            this.fetchData(); 
        }
    }

    fetchData() {
        apiService.getLeaderboard().then(response => {
            this.setState({ bots: response.data });
        });
    }

    getPlayerRow(bot, index) {
        var colour = this.positionColours[index];
        var classString = colour || "";
        return (<tr className={classString} key={bot.botID}>
            <th scope="row">{index + 1}</th>
            <td>{bot.botName}</td>
            <td>{(bot.winRate * 100).toFixed(0)}%</td>
        </tr>);
    }

    render() {
        return (
            <div id="top-ten-main">
                <div className="row justify-content-center">
                    <div className="col">
                        <h4 id="top-ten-title">Top Ten</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Bot Name</th>
                                    <th scope="col">Winrate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bots.map((bot, index) => {
                                    return this.getPlayerRow(bot, index);
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopTen;