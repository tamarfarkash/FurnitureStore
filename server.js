const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;
let furniture = [
    { name: "Table", price: 500, color: "Brown" },
    { name: "Chair", price: 150, color: "Black" },
    { name: "Sofa", price: 2000, color: "Gray" },
    { name: "Bed", price: 1500, color: "White" },
    { name: "Closet", price: 2500, color: "Brown" }
];
app.get('/furniture/names', (req, res) => {
    const names = furniture.map(item => item.name);
    res.json(names);
});

app.get('/', (req, res) => {
    res.send('Furniture Store Server is running!');
});
app.get('/furniture/:name', (req, res) => {
    const name = req.params.name;

    const item = furniture.find(item => item.name === name);

    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Furniture not found');
    }
});
app.put('/furniture/:name', (req, res) => {
    const name = req.params.name;
    const newPrice = req.body.price;

    const item = furniture.find(item => item.name === name);

    if (item) {
        item.price = newPrice;
        res.json(item);
    } else {
        res.status(404).send('Furniture not found');
    }
});
app.post('/furniture', (req, res) => {
    const newItem = req.body;

    furniture.push(newItem);

    res.status(201).json(newItem);
});
app.delete('/furniture/:name', (req, res) => {
    const name = req.params.name;

    const index = furniture.findIndex(item => item.name === name);

    if (index !== -1) {
        furniture.splice(index, 1);
        res.send('Furniture deleted successfully');
    } else {
        res.status(404).send('Furniture not found');
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
