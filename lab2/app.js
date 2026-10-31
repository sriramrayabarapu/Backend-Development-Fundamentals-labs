
const express = require("express");
const openDatabase = require("./database");

const app = express();
app.use(express.json());

let db;

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await openDatabase();

        await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        author TEXT,
        price INTEGER,
        pages INTEGER
      );
    `);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

// GET all books
app.get("/books/", async (request, response) => {
    const books = await db.all("SELECT * FROM book;");
    response.send(books);
});

// GET book by ID
app.get("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const book = await db.get(
        "SELECT * FROM book WHERE id = ?;",
        bookId
    );

    if (book === undefined) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.send(book);
    }
});

// POST a new book
app.post("/books/", async (request, response) => {
    const { title, author, price, pages } = request.body;

    const result = await db.run(
        `INSERT INTO book (title, author, price, pages)
     VALUES (?, ?, ?, ?);`,
        title,
        author,
        price,
        pages
    );

    response.status(201).send({
        message: "Book added successfully",
        bookId: result.lastID,
    });
});

// PUT update book
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const { title, author, price, pages } = request.body;

    const result = await db.run(
        `UPDATE book
     SET title = ?, author = ?, price = ?, pages = ?
     WHERE id = ?;`,
        title,
        author,
        price,
        pages,
        bookId
    );

    if (result.changes === 0) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.send({ message: "Book updated successfully" });
    }
});

// DELETE book
app.delete("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;

    const result = await db.run(
        "DELETE FROM book WHERE id = ?;",
        bookId
    );

    if (result.changes === 0) {
        response.status(404).send({ message: "Book not found" });
    } else {
        response.send({ message: "Book deleted successfully" });
    }
});

module.exports = app;
