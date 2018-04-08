import axios from 'axios'
import constants from '../constants.js'


function uploadBot(data) {
    return axios.post(constants.API_URL + 'upload', data)
}

function getLeaderboard() {
    return axios.get(constants.API_URL + 'bots?count=10&orderby=winRate')
}

function getBestBot() {
    return axios.get(constants.API_URL + 'bots?count=1&orderby=winRate').then(response => response.data[0]);
}

function getAuthor(authorID) {
    return axios.get(`${constants.API_URL}authors/${authorID}`)
        .then(response => response.data[0]);
}

export default { uploadBot, getLeaderboard, getBestBot, getAuthor } 