import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  // metodo que é chamado automaticamente pelo sequelize
  static init(sequelize) {
    // classe pai que extendemos e chamados o metodo init da classe
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // VIRTUAL é um tipo de campo que nunca existira na base de dados, apenas no codigo
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      // o sequelize como parametro recebido no static init deve ser passado como segundo parametro do metodo
      {
        sequelize,
      }
    );
    // Hooks do sequelize são trechos de codigos que são executados de forma automatica baseados em ações no Model
    this.addHook('beforeSave', async user => {
      // encriptando senha apenas para usuarios que não possuem senha
      if (user.password) {
        // atribuindo user.password a user.password_hash, todas as vezes que a model for utilizada, o campo password_hash receberá password do body da req
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  // Metodo de comparação de senha para autenticação de usuario
  checkPassword(password) {
    // as informaçoes do usuario estão dentro do this
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
