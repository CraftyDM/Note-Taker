const api = require(`./routers/api.js`)
const path = require(`path`);

const express = require(`express`);
const app = express();

app.use(express.static(`public`));

app.use(`/api`, api);

app.get(`/notes`, (req, res) => {
    res.sendFile(path.join(__dirname, `public`, `notes.html`))
});

app.get(`*`, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', `index.html`))
});

app.listen(8000, () => {
    console.log(`Now listening on 8000`);
});