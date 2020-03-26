import Pagination from '../../util/Pagination';

export default async (req, res, next) => {
  try {
    const pagination = Pagination.mount(req.query);
    req.limit = pagination.limit;
    req.offset = pagination.offset;
    next();
  } catch (error) {
    next(error);
  }
};
