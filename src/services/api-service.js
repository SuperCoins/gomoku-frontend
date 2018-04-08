import axios from 'axios'
import constants from '../constants.js'


function uploadBot(data) {
    return axios.post(constants.API_URL + 'upload', data)
}

function getSets() {
    return axios.get(constants.API_URL + 'sets')
}

function getMatchesFromSetID(id) {
    return axios.get(constants.API_URL + 'matches/' + id)
}

function getMatchesOfMostRecentSet() {
    return getSets().then(response => {
        let sets = response.data
        let first = sets[sets.length - 1]

        return getMatchesFromSetID(first.setID)
    })
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

export default {
    uploadBot,
    getLeaderboard,
    getBestBot,
    getAuthor,
    getMatchesFromSetID,
    getSets, 
    getMatchesOfMostRecentSet,
} 