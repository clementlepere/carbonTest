import express = require("express");
const app = express();
const port = 3000;
import path = require('path');
// const treasureHuntService = require('../back/infra/services/treasureHuntService/treasureHuntService')
import MapLoader from '../back/infra/mapLoader/mapLoader';
app.use(express.static(path.join(__dirname)));
app.use(express.static('back'));

app.get('/', function (req, res) {
    const mapLoader = new MapLoader();
    mapLoader.readMap('line');
    console.log("tata")
    res.redirect('index.html');
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
