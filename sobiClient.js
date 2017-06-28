const _ = require('lodash');
const config = require('config');
const rp = require('request-promise');

const options = {
    headers: {
        'Application-Name': 'bikeshare-data',
        'Application-Version': '0.0.1',
        'Authorization': 'Bearer ' + config.get('auth_token')
    },
    json: true
}

rp(_.extend(options, {url: 'https://app.socialbicycles.com/api/routes.json'}))
    .then( body => {
        console.log(body)
    })
    .catch( err => {
        console.error('oops, something went wrong: ' + err)
    });
