import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token)
    return res.status(401).json({ error: 'Accès interdit, pas de token' });

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token invalide' });
    req.user = user;
    next();
  });
};
