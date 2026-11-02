
const express = require("express");
const openDatabase = require("./database");

const app = express();

app.use(express.json());

let db;

// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await openDatabase();

        await db.exec(`
            CREATE TABLE IF NOT EXISTS book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                price REAL NOT NULL,
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

// GET all books with search, sorting, pagination and price filters
app.get("/books", async (request, response) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = request.query;

        const allowedColumns = ["id", "title", "author", "price", "pages"];

        if (
            !allowedColumns.includes(order_by) ||
            typeof order !== "string" ||
            !["ASC", "DESC"].includes(order.toUpperCase()) ||
            !Number.isInteger(Number(limit)) ||
            !Number.isInteger(Number(offset)) ||
            Number(limit) <= 0 ||
            Number(offset) < 0
        ) {
            return response.status(400).send({
                message: "Invalid sorting or pagination parameters"
            });
        }

        const conditions = [];
        const values = [];

        if (search_q) {
            conditions.push("title LIKE ?");
            values.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            if (min_price === "" || !Number.isFinite(Number(min_price))) {
                return response.status(400).send({
                    message: "Invalid minimum price"
                });
            }

            conditions.push("price >= ?");
            values.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (max_price === "" || !Number.isFinite(Number(max_price))) {
                return response.status(400).send({
                    message: "Invalid maximum price"
                });
            }

            conditions.push("price <= ?");
            values.push(Number(max_price));
        }

        if (
            min_price !== undefined &&
            max_price !== undefined &&
            Number(min_price) > Number(max_price)
        ) {
            return response.status(400).send({
                message: "Minimum price cannot exceed maximum price"
            });
        }

        const whereClause =
            conditions.length > 0
                ? `WHERE ${conditions.join(" AND ")}`
                : "";

        const query = `
            SELECT * FROM book
            ${whereClause}
            ORDER BY ${order_by} ${order.toUpperCase()}
            LIMIT ? OFFSET ?;
        `;

        values.push(Number(limit), Number(offset));

        const books = await db.all(query, values);

        response.status(200).send(books);
    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});

// GET a book by ID
app.get("/books/:bookId", async (request, response) => {
    try {
        const { bookId } = request.params;

        const book = await db.get(
            "SELECT * FROM book WHERE id = ?;",
            bookId
        );

        if (!book) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        response.status(200).send(book);
    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});

// POST - Add a new book with validation
app.post("/books", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body || {};

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim() ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return response.status(400).send({
                message: "Title, author and a valid numeric price are required"
            });
        }

        if (
            pages !== undefined &&
            (typeof pages !== "number" ||
                !Number.isInteger(pages) ||
                pages < 0)
        ) {
            return response.status(400).send({
                message: "Pages must be a valid non-negative integer"
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?);`,
            title.trim(),
            author.trim(),
            price,
            pages === undefined ? null : pages
        );

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });
    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});

// PUT - Update an existing book
app.put("/books/:bookId", async (request, response) => {
    try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body || {};

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim() ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return response.status(400).send({
                message: "Title, author and a valid numeric price are required"
            });
        }

        if (
            pages !== undefined &&
            (typeof pages !== "number" ||
                !Number.isInteger(pages) ||
                pages < 0)
        ) {
            return response.status(400).send({
                message: "Pages must be a valid non-negative integer"
            });
        }

        const existingBook = await db.get(
            "SELECT * FROM book WHERE id = ?;",
            bookId
        );

        if (!existingBook) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?;`,
            title.trim(),
            author.trim(),
            price,
            pages === undefined ? null : pages,
            bookId
        );

        response.status(200).send({
            message: "Book updated successfully"
        });
    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});

// DELETE - Delete a book
app.delete("/books/:bookId", async (request, response) => {
    try {
        const { bookId } = request.params;

        const result = await db.run(
            "DELETE FROM book WHERE id = ?;",
            bookId
        );

        if (result.changes === 0) {
            return response.status(404).send({
                message: "Book not found"
            });
        }

        response.status(200).send({
            message: "Book deleted successfully"
        });
    } catch (error) {
        response.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = app;
