const Book = require("../models/bookmodel")

const readBook = async (req, res) => {
    const result = await Book.find({})
    const responseMessage = {
        msg: "List of books found.",
        books: result
    }
    res.status(200).send(responseMessage);
}

module.exports = readBook