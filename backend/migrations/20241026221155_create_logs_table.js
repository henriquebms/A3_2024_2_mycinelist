/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};

// migrations/[timestamp]_create_logs_table.js
exports.up = function (knex) {
  return knex.schema.createTable('logs', function (table) {
    table.increments('id').primary();                    // Identificador único, autoincrementado
    table.timestamp('timestamp').defaultTo(knex.fn.now()); // Data e hora do evento
    table.string('level', 50);                            // Nível de severidade do log
    table.text('message').notNullable();                  // Descrição do evento de log
    table.string('origin', 100);                          // Serviço ou componente de origem (opcional)
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('logs');  // Para desfazer a migration
};