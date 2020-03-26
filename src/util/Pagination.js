/* eslint-disable no-restricted-globals */
const LIMIT = 10;
const PAGE = 1;

class Pagination {
  mount(query) {
    const result = {
      limit: 10,
      offset: 0,
    };

    if (isNaN(query.limit) || query.limit <= 0) {
      result.limit = LIMIT;
    } else {
      result.limit = parseInt(query.limit, 10);
    }

    if (isNaN(query.page) || query.page <= 1) {
      result.offset = (PAGE - 1) * result.limit;
    } else {
      result.offset = (query.page - 1) * result.limit;
    }

    delete query.limit;
    delete query.page;

    return result;
  }

  transform(query, limit) {
    const result = {
      pages: Math.ceil(query.count / limit),
      total: query.count,
      data: query.rows,
    };

    return result;
  }
}

export default new Pagination();
