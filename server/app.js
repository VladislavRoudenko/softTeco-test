const express = require("express");
const cors = require("cors");
const uniqueNames = require('unique-names-generator');

const { uniqueNamesGenerator, adjectives, animals, colors, countries, languages, names, starWars } = uniqueNames;

const firstNameCfg = {
    dictionaries: [animals],
    separator: '',
    length: 1,
};

const lastNameCfg = {
    dictionaries: [adjectives],
    separator: '',
    length: 1,
};

const app = express();

const PORT = process.env.MOCKS_PORT || 8080;


const usersListLength = 56;

const users = [];

for (let i = 1; i <= usersListLength; i++) {
    users.push({
        id: i,
        firstName: uniqueNamesGenerator(firstNameCfg),
        lastName: uniqueNamesGenerator(lastNameCfg),
    })
}


app.use(cors());

const pageSize = 10;
const pagesCount = Math.ceil(users.length / pageSize);

app.get('/api/users', (req, res) => {
    const {page} = req.query;
    if (!page) {
        return res.status(400).send({error: "Page param is required."})
    }
    const pageNumber =  Number(page);

    if (pageNumber <= 0 || pageNumber > pagesCount) {
        return res.status(200).send({count: users.length, result: []})
    }

    const firstElementIdx = Number(pageNumber * pageSize - pageSize);
    const results = users.slice(firstElementIdx, firstElementIdx + pageSize);
    return res.status(200).send({count: users.length, results })
});

const items = [];
const itemsListLength = 400;
const itemsCfg = {
    dictionaries: [animals, colors, adjectives, countries, languages, names, starWars],
    separator: '',
    length: 1,
};

for (let i = 0; i < itemsListLength; i++) {
    items.push(uniqueNamesGenerator(itemsCfg));
}

app.get('/api/items', (req, res) => {
    const {q} = req.query;
    if (!q) {
        return res.status(400).send({error: "Q param is required."})
    }
    const regQ = new RegExp(q, 'gi');
    const result = items.filter(item => regQ.test(item));
    return res.status(200).send(result);
});

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));