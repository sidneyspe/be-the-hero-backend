module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'be-the-hero',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    // prevent sequelize from pluralizing table names
  },
};
