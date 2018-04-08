
const constants = {
    API_URL: `http://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}/`
}
constants.EXAMPLE_BOT_URL = constants.API_URL + 'random.js';

export default constants;