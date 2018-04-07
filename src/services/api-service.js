import axios from 'axios'
import constants from '../constants.js'


function uploadBot(data) {
    return axios.post(constants.API_URL + 'upload', data)
}

function getLeaderboard(){
    return axios.get(constants.API_URL + 'bots?count=10&orderby=winRate')
}

export default {uploadBot, getLeaderboard} 