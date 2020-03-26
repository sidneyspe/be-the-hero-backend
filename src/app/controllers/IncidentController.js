import * as Yup from 'yup';

import Ong from '../models/Ong';
import Incident from '../models/Incident';

import Pagination from '../../util/Pagination';

class IncidentController {
  async index(req, res, next) {
    try {
      const { limit = 10, page = 1 } = req.query;
      const offset = (page - 1) * limit;

      const data = await Incident.findAndCountAll({
        offset,
        limit,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'title', 'description', 'value'],
        include: [
          {
            model: Ong,
            as: 'ong',
            attributes: ['id', 'name', 'email', 'whatsapp', 'city', 'uf'],
          },
        ],
      });

      const result = Pagination.transform(data, limit);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    req.body.ong_id = req.ong_id;

    const { id, title, description, value } = await Incident.create(req.body);

    return res.json({
      id,
      title,
      description,
      value,
    });
  }

  async delete(req, res) {
    try {
      const { ong_id } = await Incident.findOne({
        where: { id: req.params.id },
      });

      if (ong_id !== req.ong_id) {
        res.status(401).json({
          error: 'Operation not permitted.',
        });
      }
      await Incident.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        data: { message: 'Unexpected error when removing a Incident' },
      });
    }
  }
}

export default new IncidentController();
