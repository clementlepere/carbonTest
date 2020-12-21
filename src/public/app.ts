import express = require('express');
const app = express();
const port = 3000;
import path = require('path');
// const treasureHuntService = require('../back/infra/services/treasureHuntService/treasureHuntService')
app.use(express.static(path.join(__dirname)));
app.use(express.static('back'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
