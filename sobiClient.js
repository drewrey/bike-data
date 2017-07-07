const _ = require('lodash');
const config = require('config');
const knex = require('./data/connection');
const rp = require('request-promise');

const options = {
    headers: {
        'Application-Name': 'bikeshare-data',
        'Application-Version': '0.0.1',
        // TODO: fix this
        'Authorization': 'Bearer ' + config.get('auth_token')
    },
    json: true,
    url: 'https://app.socialbicycles.com/api/bikes.json?network_id=' + config.get('network_id') + '&per_page=1000'
    // TODO: handle this URL/config better
}

module.exports = () => {
    return rp(options)
        .then( body => {
            const bikes = _.map(body.items, (bike) => {
                return {
                    bike_id: bike.id,
                    network_id: bike.network_id,
                    hub_id: bike.hub_id,
                    coordinates: knex.raw(
                        'point(' +
                        bike.current_position.coordinates[0] +
                        ',' +
                        bike.current_position.coordinates[1] +
                        ')'),
                    inside_area: bike.inside_area,
                    distance: bike.distance,
                    address: bike.address,
                    sponsored: bike.sponsored
                }
            });
            return knex('bike_history').insert(bikes);
        })
        .catch( err => {
            console.error('oops, something went wrong: ' + err)
        });
}
