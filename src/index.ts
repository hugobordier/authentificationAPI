import express from 'express';
import cors from 'cors';
import db from './config/config';
import User from './models/User';

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', async (req, res) => {
  const { pseudo, email, mdp } = req.body;

  try {
    const user = await User.create({ pseudo, email, mdp });
    res.status(201).json(user);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(400)
      .json({ error: "Impossible de créer l'utilisateur", details: error });
  }
});

db.authenticate()
  .then(() =>
    console.log('Connection to the database has been established successfully.')
  )
  .catch((error) => console.error('Unable to connect to the database:', error));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
