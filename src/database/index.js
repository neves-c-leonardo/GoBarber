import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  // fazer a conexão com a base de dados e carregar as models
  init() {
    // instanciando uma variavel que fara a conexão com o banco de dados de acordo com o arquivo de conexão
    this.connection = new Sequelize(databaseConfig);

    // acessando o metodo init de cada model e realizando a conexão
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
