    # Lab 3 – REST API with SQLite

## Student Details

- **Name:** RAYABARAPU SRIRAM
- **Registration Number:** 252U1R9136
- **Section:** CSE(GENAI)2C&112
- **Subject:** Backend Development Fundamentals
- **Lab:** Lab 3 – REST API with SQLite

---

## 1. Objective

To develop a REST API using Node.js, Express.js and SQLite. This project implements CRUD operations along with query parameters, sorting, pagination, price filtering and input validation.

## 2. Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Thunder Client
- Visual Studio Code

## 3. Project Structure

```text
LAB3/
│
├── Screenshots/
│   ├── GET.png
│   ├── GET1BOOK.png
│   ├── POST.png
│   ├── PUT.png
│   └── DELETE.png
│
├── node_modules/
├── app.js
├── database.js
├── books.db
├── package.json
├── package-lock.json
└── README.md
```

## 4. Installation and Setup

**Step 1: Open the project folder**

Open the LAB3 folder in Visual Studio Code.

**Step 2: Install dependencies**

Run the following command in the terminal:

```bash
npm install
```

**Step 3: Start the server**

```bash
npm start
```

The server runs at:

```text
http://localhost:3000
```

## 5. Database Details

**Database Name:** `books.db`

**Table Name:** `book`

### Table Schema

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Primary key with auto increment |
| title | TEXT | Book title |
| author | TEXT | Book author |
| price | REAL | Book price |
| pages | INTEGER | Number of pages |

## 6. API Endpoints

The following REST API endpoints are implemented:

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:bookId` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:bookId` | Update an existing book |
| DELETE | `/books/:bookId` | Delete a book |

## 7. Query Parameters

The GET `/books` endpoint supports the following query parameters:

| Parameter | Description |
|---|---|
| `search_q` | Search books by title |
| `order_by` | Sort by id, title, author, price or pages |
| `order` | Sort in ASC or DESC order |
| `limit` | Maximum number of records to retrieve |
| `offset` | Number of records to skip |
| `min_price` | Filter books by minimum price |
| `max_price` | Filter books by maximum price |

### Example Request

```text
http://localhost:3000/books?search_q=Atomic&order_by=price&order=ASC&limit=5&offset=0
```

## 8. Input Validation

The API includes validation to handle invalid inputs.

- Title and author are required.
- Price must be a valid finite number.
- Pages must be a non-negative integer when provided.
- Sorting and pagination parameters are validated.
- Minimum price cannot exceed maximum price.
- Appropriate HTTP status codes are returned for errors.

## 9. Screenshots

### GET – Retrieve All Books

![GET All Books](./Screenshots/GET.png)

### GET – Retrieve Book by ID

![GET Book by ID](./Screenshots/GET1BOOK.png)

### POST – Add a New Book

![POST Book](./Screenshots/POST.png)

### PUT – Update an Existing Book

![PUT Book](./Screenshots/PUT.png)

### DELETE – Delete a Book

![DELETE Book](./Screenshots/DELETE.png)

## 10. API Testing

All five CRUD operations were tested using Thunder Client.

| Test Case | Expected Result | Status |
|---|---|---|
| GET all books | 200 OK | Passed |
| GET book by ID | 200 OK | Passed |
| POST new book | 201 Created | Passed |
| PUT update book | 200 OK | Passed |
| DELETE book | 200 OK | Passed |
| GET deleted book | 404 Not Found | Passed |

## 11. Conclusion

Successfully developed and tested a REST API using Node.js, Express.js and SQLite.

Implemented CRUD operations, query parameters, sorting, pagination, price filtering and input validation. Tested the API endpoints using Thunder Client and verified the responses.

This lab helped in understanding backend development, database connectivity and REST API implementation.