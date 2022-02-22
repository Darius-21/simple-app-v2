import nc from 'next-connect';
import { sessionMiddleware } from '../../middlewares/session';
import { createStrapiAxios } from '../../utils/strapi';

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const user = await axios.post(`${API_URL}/auth/local`, {
            identifier: identifier,
            password: password
        })
        .then((res) => res.data)
        .then((data) => ({
          ...data.user,
          strapiToken: data.jwt,
        }));

      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: 'User not confirmed'
        });
      }

      req.session.set('user', user);
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.log(error)
    }
  });
