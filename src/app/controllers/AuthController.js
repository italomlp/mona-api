import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { _id, name } = user;

    return res.json({
      user: {
        _id,
        name,
        email,
      },
      token: jwt.sign({ _id }, authConfig.secret),
    });
  }
}

export default new AuthController();
