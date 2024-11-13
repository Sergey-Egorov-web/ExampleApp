"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//create express app
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const products = [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
];
const addresses = [
    { id: 1, value: "Shipilovskaya 45" },
    { id: 2, value: "flotskaya 41" },
];
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.get("/", (req, res) => {
    let helloMessage = "version 0.01!!!";
    res.send(helloMessage);
});
app.get("/products", (req, res) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.filter((p) => p.title.indexOf(searchString) > -1));
    }
    else {
        res.send(products);
    }
});
app.post("/products", (req, res) => {
    const newProduct = {
        id: +new Date(),
        title: req.body.title,
    };
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put("/products/:id", (req, res) => {
    let product = products.find((p) => p.id === +req.params.id);
    if (!req.body.title) {
        return res.status(400).send('Отсутствует обязательное поле "title"');
    }
    if (!product) {
        res.send(404);
    }
    else {
        product.title = req.body.title.toString();
        //   products.push(newProduct);
        res.status(200).send(product);
    }
});
app.get("/products/:id", (req, res) => {
    let product = products.find((p) => p.id === +req.params.id);
    if (product) {
        res.send(product);
    }
    else
        res.send(404);
});
app.delete("/products/:id", (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
app.get("/addresses", (req, res) => {
    res.send(addresses);
});
app.get("/addresses/:id", (req, res) => {
    let address = addresses.find((p) => p.id === +req.params.id);
    if (address) {
        res.send(address);
    }
    else
        res.send(404);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
