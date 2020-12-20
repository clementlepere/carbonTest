// import express = require("express");
// const app = express();
// const port = 3000;
// import path = require('path');
// app.use(express.static(path.join(__dirname)));
// app.use(express.static('back'));
// app.get('/', function (req, res) {
//     res.redirect('index.html');
// });
// app.listen(port, () => {
//     return console.log(`server is listening on ${port}`);
// });
var Reptile = /** @class */ (function () {
    function Reptile() {
        this.reptiles = [
            'Alligator',
            'Crocodile',
            'Chameleon',
            'Komodo Dragon',
            'Iguana',
            'Salamander',
            'Snake',
            'Lizard',
            'Python',
            'Tortoise',
            'Turtle',
        ];
    }
    Reptile.prototype.shuffle = function () {
        for (var i = this.reptiles.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.reptiles[i];
            this.reptiles[i] = this.reptiles[j];
            this.reptiles[j] = temp;
        }
    };
    Reptile.prototype.random = function (count, allowDupes) {
        if (count === void 0) { count = 1; }
        var selected = [];
        if (!allowDupes && count > this.reptiles.length) {
            throw new Error("Can't ensure no dupes for that count");
        }
        for (var i = 0; i < count; i++) {
            if (allowDupes) {
                // Dupes are cool, so let's just pull random reptiles
                selected.push(this.reptiles[Math.floor(Math.random() * this.reptiles.length)]);
            }
            else {
                // Dupes are no go, shuffle the array and grab a few
                this.shuffle();
                selected = this.reptiles.slice(0, count);
            }
        }
        return selected;
    };
    return Reptile;
}());
var reptile = new Reptile();
console.log("With Dupes: " + reptile.random(10, true));
console.log("And Without: " + reptile.random(10));
