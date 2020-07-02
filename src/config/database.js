module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5433',
  username: 'postgres',
  password: '123456',
  database: 'gobarber',
  define: {
    // cria coluna created_at e updated_at para todas as tabelas criadas atraves do sequelize
    timestamps: true,
    // cria o padrão de underline para separar nome de tabela ao inves de camelcase
    underscored: true,
    // aplica o padrao underscore tambem para colunas e demais elementos
    underscoredAll: true,
  },
};
