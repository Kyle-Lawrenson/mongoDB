require("./db/connection.js");

const Book = require("./db/models/bookmodel.js")

const express = require("express");
const app = express();

const listOfBooks = [];
book_id = 1;

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
    const responseMessage = {
      message: "List of books is currently: ",
      books: listOfBooks
  }
  
  res.send(responseMessage)
  });

//UPDATE
app.put("/book", (req, res) => {
    const findBook = (x) => {
        return x.title === req.body.title
    }
    const index = listOfBooks.findIndex(findBook)

    if (index !== -1) {
        listOfBooks[index].author = req.body.author;
        listOfBooks[index].genre = req.body.genre;
        responseMessage = {
            msg: "author and genre updated",
            book: listOfBooks[index]
        }
    } else {
        responseMessage = {
            msg: "Book title not found",
            book: req.body.title
        }
    }

    res.send(responseMessage)

})

// DELETE
app.delete("/book", (req, res) => {
    const findBook = (x) => {
        return x.title = req.body.title
    }
    const index = listOfBooks.findIndex(findBook)

    listOfBooks.splice(index,1)

    responseMessage = {
        msg: "Book deleted",
        book: req.body.title,
        books: listOfBooks
    }

    res.send(responseMessage)
})