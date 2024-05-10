const router = require('express').Router()
const Person = require('../models/Person');


// POST
router.post("/", async (req, res) => {
    const { name, salary, number, city } = req.body;

    if (!name) {
        res.status(422).json({ error: 'Nome Obrigatorio' })
        return
    }

    const person = {
        name,
        salary,
        number,
        city,
    };

    try {
        await Person.create(person);

        res.status(201).json({ message: 'Usuario Adicionado!' })
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET (todos)
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// GET (retorna 1 usuario apenas)
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({ message: 'O produto não foi encontrado' })
            return
        }

        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// PATCH
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const { name, salary, number, city } = req.body;

    const person = {
        name,
        salary,
        number,
        city,
    };

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person)

        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuario não encontrado' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// DELETE
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({ message: 'Usuario não encontrado' })
        return
    }

    try {

        await Person.deleteOne({ _id: id })

        res.status(200).json({ message: 'Usuario Removido com Sucesso!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router