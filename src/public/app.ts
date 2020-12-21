import express = require('express');
const app = express();
const port = 3000;
import path = require('path');

app.use(express.static(path.join(__dirname)));
app.use(express.static('back'));

app.get('/', (req, res) => {
  res.redirect('index.html');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
