require('dotenv').config();
const express = require('express');
const routes = require('./routes'); 
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json({ limit: '2mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', routes);
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
