const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3000


let currentHerd =
    [
        {
            type: 'labyak',
            name: 'Betty-1',
            age: 4,
            sex: 'f'
        },
        {
            type: 'labyak',
            name: 'Betty-2',
            age: 8,
            sex: 'f'
        },
        {
            type: 'labyak',
            name: 'Betty-3',
            age: 9.5,
            sex: 'f'
        }
    ];



app.use(cors());
app.use(bodyParser.json());

app.get('/yak-shop/all', (req, res) => {
    res.status(200).json(currentHerd);
});

app.get('/yak-shop/reset', (req, res) => {
    currentHerd = [];
    // TODO: find out why status code 205 is giving an error. 200 HTTP response should be sufficient
    res.status(200).json(currentHerd);

    // TODO: send all data to a database like MongoDB
})

app.post('/yak-shop/load', (req, res) => {
    let arrays = [currentHerd, req.body];
    var merged = [].concat.apply([], arrays);

    
    // TODO: find out why status code 205 is giving an error. 200 HTTP response should be sufficient
    res.status(200).json(merged);

    // TODO: send all data to a database like MongoDB
})

app.get('/yak-shop/stock/:days', (req, res) => {
//     Each day a LabYak produces 50-D*0.03 liters of milk (D = age in days).
// • At most every 8+D*0.01 days you can again shave a LabYak (D = age in days).
// • A yak can be first shaven when he is 1 year.
// • TODO: A LabYak dies the day he turns 10
    const numberOfDays = req.params.days;
    function getStockMilk(herd) {
        let stockMilk = 0;
        for (let i = 0; i < herd.length; i++) {
            // convert age to days
            herd[i].ageAccumalitiveInDays = herd[i].age * 100;
            for(let j = 0; j < numberOfDays; j++) {
                herd[i].ageAccumalitiveInDays++;
                // check if the yak is dead
                if (herd[i].ageAccumalitiveInDays < 1000) {
                    stockMilk = stockMilk + 50-herd[i].ageAccumalitiveInDays*0.03;
                }
            }
        };
        return stockMilk;    
    }
    
    function getStockSkins(herd) {
        let stockSkins = 0;
        for (let i = 0; i < herd.length; i++) {
            // convert age to days
            herd[i].ageAccumalitiveInDays = herd[i].age * 100;
            for(let j = 0; j < numberOfDays; j++) {
                herd[i].ageAccumalitiveInDays++;
                // check if the yak is dead and is shaveable
                if (herd[i].ageAccumalitiveInDays < 1000 && (8+herd[i].ageAccumalitiveInDays*0.01 >= 1)) {
                    stockSkins++;
                }
            }
        };
        return stockSkins;
    }
    
    console.log(currentHerd);
    res.status(200).json({"milk": getStockMilk(currentHerd), "skins": getStockSkins(currentHerd)});
});





app.listen(port, () => {
    console.log(`Herd shop listening at http://localhost:${port}`)
})