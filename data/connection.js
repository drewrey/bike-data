var config = require('../knexfile');
var env = process.env.NODE_ENV || 'local';
var knex = require('knex')(config[env]);

console.log(config[env]);

module.exports = knex;
