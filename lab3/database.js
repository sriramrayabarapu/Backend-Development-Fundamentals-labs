const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "books.db");

const openDatabase = async () => {
    return await sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
};

module.exports = openDatabase;