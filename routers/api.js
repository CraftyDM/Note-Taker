const express = require(`express`);
const router = express.Router();
const memory = require(`../memory/memory.js`);

router.use(express.json());

router.get(`/notes`, async (req, res) => {
    res.send(await memory.load());
});

router.post(`/notes`, async (req, res) => {
    const data = req.body;
    const newNote = await memory.add(data);
    res.status(201).send(newNote);
})

router.delete(`/notes/:id`, async (req, res) => {
    await memory.delete(req.params.id);
    res.sendStatus(200);
})

module.exports = router;