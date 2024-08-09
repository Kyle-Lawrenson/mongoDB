require("./db/connection.js");
const createBook = require("./db/controllers/createBook.js");
const readBook = require("./db/controllers/readBook.js");
const updateBook = require("./db/controllers/updateBook");
const deleteBook = require("./db/controllers/deleteBook.js");
const Book = require("./db/models/bookmodel.js")

const express = require("express");
const app = express();

app.use(express.json());


//CREATE
app.post("/addbook", createBook);

app.listen(5001, () => console.log("Server is listening on port 5001"));

// READ
app.get("/listbooks", readBook);

//UPDATE
app.put("/book", updateBook);

// DELETE
app.delete("/book", deleteBook);