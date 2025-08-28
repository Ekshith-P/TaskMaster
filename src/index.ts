import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Auth service is running!');
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});