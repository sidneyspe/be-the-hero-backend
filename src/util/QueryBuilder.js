import { Op } from 'sequelize';

class QueryBuilder {
  build(query) {
    if (!query.search || !query) {
      return query;
    }
    return {
      [Op.or]: [
        { '$product.name$': { [Op.iLike]: `%${query.search}%` } },
        { '$product.description$': { [Op.iLike]: `%${query.search}%` } },
        { '$product.code$': { [Op.iLike]: `%${query.search}%` } },
        { '$product.unity.name$': { [Op.iLike]: `%${query.search}%` } },
        { '$product.category.name$': { [Op.iLike]: `%${query.search}%` } },
      ],
    };
  }

  buildByName(query) {
    if (!query.search) {
      return query;
    }
    return {
      [Op.or]: [{ $name$: { [Op.iLike]: `%${query.search}%` } }],
    };
  }

  buildProduct(query) {
    if (!query.search) {
      return query;
    }
    return {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.search}%` } },
        { description: { [Op.iLike]: `%${query.search}%` } },
        { code: { [Op.iLike]: `%${query.search}%` } },
      ],
    };
  }

  buildStore(query) {
    if (!query.search) {
      return query;
    }
    return {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.search}%` } },
        { cnpj: { [Op.iLike]: `%${query.search}%` } },
        { street: { [Op.iLike]: `%${query.search}%` } },
        { zipcode: { [Op.iLike]: `%${query.search}%` } },
      ],
    };
  }
}

export default new QueryBuilder();
