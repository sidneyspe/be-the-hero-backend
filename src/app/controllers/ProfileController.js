import Ong from '../models/Ong';
import Incident from '../models/Incident';

import Pagination from '../../util/Pagination';

class ProfileController {
  async index(req, res, next) {
    try {
      const { limit = 10, page = 1 } = req.query;
      const offset = (page - 1) * limit;

      const data = await Incident.findAndCountAll({
        where: { ong_id: req.ong_id },
        offset,
        limit,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'description', 'value'],
        include: [
          {
            model: Ong,
            as: 'ong',
            attributes: ['id', 'name'],
          },
        ],
      });

      const result = Pagination.transform(data, limit);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
