const express = require('express');
const fs = require('fs');
const path = require('path');
const productsDBPath = path.join(__dirname, './db/products.json');
const cartDBPath = path.join(__dirname, './db/userCart.json');

const app = express();

app.use(express.json());
app.use('/', express.static('./public'));
app.use('/cart', express.static('./public/cart.html'));

app.get('/api/products', (req, res) => {
    fs.readFile(productsDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

app.get('/api/cart', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
});

app.get('/api/products/:id', (req, res) => {
    fs.readFile(productsDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            let products = JSON.parse(data)
            res.send(
                JSON.stringify(
                    products.filter((product) => product.id_product === +req.params.id)[0]
                )
            );
        }
    });
});



app.post('/api/cart', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            const cartData = JSON.parse(data);
            cartData.contents.push(req.body);

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            const cartData = JSON.parse(data);
            const find = cartData.contents.find((good) => {
                return good.id_product === +req.params.id
            });
            find.quantity += req.body.quantity;

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile(cartDBPath, 'utf-8', (err, data) => {
        if (err) res.send(err);
        else {
            console.log(req.body);
            const cartData = JSON.parse(data);
            const find = cartData.contents.find((good) => {
                return good.id_product === +req.params.id
            });
            console.log(cartData.contents);
            cartData.contents.splice(cartData.contents.indexOf(find), 1);

            fs.writeFile(cartDBPath, JSON.stringify(cartData), 'utf-8', (err) => {
                if (err) res.send(err);
                else res.send(JSON.stringify({ result: 1 }));
            });
        }
    });
});

app.listen(8082, () => {
    console.log('Server started!');
});