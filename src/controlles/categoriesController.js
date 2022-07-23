import connection from "../database/database.js";

export async function getCategories (req,res) {
    const {rows : categories} = await connection.query('SELECT * FROM categories;');
    res.send(categories)
}

export async function createCategories (req,res) {
    res.sendStatus(201)
}