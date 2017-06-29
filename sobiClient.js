const _ = require('lodash');
const config = require('config');
const rp = require('request-promise');

const options = {
    headers: {
        'Application-Name': 'bikeshare-data',
        'Application-Version': '0.0.1',
        // TODO: fix this
        'Authorization': 'Bearer ' + config.get('auth_token')
    },
    json: true
}

rp(_.extend(options, {url: 'https://app.socialbicycles.com/api/bikes.json?network_id=' + config.get('network_id') + '&per_page=1000'}))
    // TODO: handle this better
    .then( body => {
        console.log(body)
    })
    .catch( err => {
        console.error('oops, something went wrong: ' + err)
    });
