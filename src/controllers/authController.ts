import AuthService from '../services/authService';

export default class authController {
  static async login(req, res) {
    console.log(req.body);
    const { email, mdp } = req.body;

    try {
      const { accessToken, refreshToken } = await AuthService.loginUser(
        email,
        mdp
      );
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        sameSite: 'strict',
      });
      res.status(200).json({ accessToken });
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: error.message });
    }
  }

  static async register(req, res) {
    const { pseudo, email, mdp } = req.body;

    try {
      const user = await AuthService.registerUser(pseudo, email, mdp);
      console.log('text1');
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      console.log('test2');
      res.status(401).json({ error: error.message });
    }
  }

  static async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ error: 'No refresh token found' });
    }

    try {
      const { accessToken, newRefreshToken } =
        await AuthService.refreshAccessToken(refreshToken);
      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({ error: 'Invalid refresh token' });
    }
  }
}
