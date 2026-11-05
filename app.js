const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(' AgriTech poder dos vingadores funciona pfvr');
});

app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta ${PORT}`);
});