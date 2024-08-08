const Book = require("../models/bookmodel")

const deleteBook = async (req, res) => {
    const result = await Book.findOneAndDelete({title: req.body.title})
        if (result === null) {
            const responseMessage = {
                msg: "Book not found"
            }
         res.status(400).send(responseMessage);
        } else {
            const responseMessage = {
                msg:"Book has been deleted.",
                dbresponse: result
            }
            res.status(200).send(responseMessage);
        }
}

module.exports = deleteBook