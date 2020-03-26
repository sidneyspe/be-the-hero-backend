import * as Yup from 'yup';

import Ong from '../models/Ong';

import Pagination from '../../util/Pagination';

class OngController {
  async index(req, res, next) {
    try {
      const { limit = 10, page = 1 } = req.query;
      const offset = (page - 1) * limit;

      const ongs = await Ong.findAndCountAll({
        offset,
        limit,
        order: [['created_at', 'DESC']],
        attributes: ['id', 'name', 'email', 'whatsapp', 'city', 'uf'],
      });

      const result = Pagination.transform(ongs, limit);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      whatsapp: Yup.string().required(),
      city: Yup.string().required(),
      uf: Yup.string()
        .required()
        .min(2)
        .max(2),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { id, name, email, whatsapp, city, uf } = await Ong.create(req.body);

    return res.json({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });
  }
}

export default new OngController();
