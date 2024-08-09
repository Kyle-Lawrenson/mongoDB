const Book = require("../models/bookmodel")

const createBook = async (req, res) => {
    try {
        const results = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre
        });
        const responseMessage = {
            message: `Book ${req.body.title} has been added.`,
            dbresponse: results
        }
        res.status(201).send(responseMessage);
    } catch (error) {
        console.log(error)
        const responseMessage = {
            message: `Book ${req.body.title} has been added.`,
            dbresponse: error
        }
        res.status(400).send(responseMessage);
    }
}

module.exports = createBook