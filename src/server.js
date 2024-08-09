require("./db/connection.js");
const readBook = require("./db/controllers/readBook.js");
const updateBook = require("./db/controllers/updateBook");
const deleteBook = require("./db/controllers/deleteBook.js");
const Book = require("./db/models/bookmodel.js")

const express = require("express");
const app = express();

app.use(express.json());


//CREATE
app.post("/addbook", async (req, res) => {
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
});

app.listen(5001, () => console.log("Server is listening on port 5001"));

// READ
app.get("/listbooks", readBook);

//UPDATE
app.put("/book", updateBook);

// DELETE
app.delete("/book", deleteBook);