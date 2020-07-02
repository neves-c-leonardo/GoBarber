// Controler para criação de um usuário

import * as yup from 'yup';
import User from '../models/User';

// A classe userController contém os metodos de CRUD da criação de um usuário
class UserController {

  //Metodo store é responsavel por fazer o CREATE
  async store(req, res) {

    // O Yup é uma biblioteca de validação, passando um objeto com as propriedades e as validações que devem ser realizadas
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
    });
    // Se o esquema de validação não for valido (encontrou erro nas informaçãoes passadas no Body da api) ele retorna erro 400
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Buscando usuário pelo e-mail
    const userExists = await User.findOne({ where: { email: req.body.email } });

    // Se alguem usuário já existir com o e-mail informado, retorna que usuário ja existe
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Se passar de todas validações, o metodo create o Sequelize (equivalente a um Insert de SQL) realizar a inserção do novo usuário
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // metodo update que atualiza um usuário
  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    // busca o registro pelo id
    // o registro tem os metodos da model de User
    const user = await User.findByPk(req.id);

    // verifica se o e-mail que esta sendo forncecido para alteração há existe
    const userExists = await User.findOne({ where: { email } });

    if (email !== user.email && userExists) {
      return res.status(400).json({ error: 'E-mail already in use' });
    }

    // verificando se senha antiga é realmente a senha do usuario
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    // Medoto update do Sequelize realiza o Update do SQL, no usuário buscado pela PK
    const { id, name, provider } = await user.update(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
