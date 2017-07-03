
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('bike_history', function(table) {
        table.integer('bike_id');
        table.integer('network_id');
        table.integer('hub_id');
        table.specificType('coordinates', 'POINT');
        table.boolean('inside_area');
        table.decimal('distance');
        table.string('address');
        table.boolean('sponsored');
        table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bike_history');
};
