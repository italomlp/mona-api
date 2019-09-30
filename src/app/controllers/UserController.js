import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(5),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(403).json({ error: 'User already exists' });
    }

    const { _id, name, email } = await User.create(req.body);

    return res.json({
      _id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(5),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirmation: Yup.string()
        .min(6)
        .when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findById(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res
          .status(403)
          .json({ error: 'User with this email already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const userObj = {
      ...req.body,
      ...(req.body.password
        ? { password: await user.generateHashPassword(req.body.password) }
        : {}),
    };

    await user.update(userObj);

    return res.json({
      _id: user._id,
      name: req.body.name,
      email,
    });
  }

  async show(req, res) {
    if (!req.userId) {
      return res
        .status(401)
        .json({ error: 'You need to be authenticated for this' });
    }

    const { _id, name, email } = await User.findById(req.userId);

    return res.json({
      _id,
      name,
      email,
    });
  }
}

export default new UserController();
