require("./db/connection.js");
const readBook = require("./db/controllers/readBook.js")
const deleteBook = require("./db/controllers/deleteBook.js")
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
app.get("/listbooks", async (req, res) => {
   const result = await Book.find({})
   const responseMessage = {
    msg:"List of books found.", 
    books: result
   }
   res.status(200).send(responseMessage);
  });

//UPDATE
app.put("/book", async (req, res) => {
        const result = await Book.findOneAndUpdate({
            title: req.body.title
        }, {
            author: req.body.author,
            genre: req.body.genre
        } )
        if (result === null) {
            const responseMessage = {
                msg: "Book not found"
            }
         res.status(400).send(responseMessage);
        } else {
            const responseMessage = {
                msg:"Book has been updated.",
                dbresponse: result
            }
            res.status(200).send(responseMessage);
        }
})

// DELETE
app.delete("/book", deleteBook );