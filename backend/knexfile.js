// Update with your config settings.
require('dotenv').config(); // Carrega variáveis do arquivo .env
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */  

/**/


module.exports = {

    development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,        // Endereço do banco de dados
      user: process.env.DB_USER,        // Usuário do banco
      password: process.env.DB_PASSWORD, // Senha do banco
      database: process.env.DB_NAME      // Nome do banco de dados
    }
  },
  migrations: {
    directory: './migrations'  // Pasta onde as migrations serão armazenadas
  },  

};

