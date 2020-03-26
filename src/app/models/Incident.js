import Sequelize, { Model } from 'sequelize';

class Incident extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: Sequelize.DOUBLE,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    /* This command bellow create a relationship between two or more tables
     please refer the foreingKey id used on migrations file */
    this.belongsTo(models.Ong, {
      onDelete: 'cascade',
      foreignKey: 'ong_id',
      as: 'ong',
    });
  }
}

export default Incident;
