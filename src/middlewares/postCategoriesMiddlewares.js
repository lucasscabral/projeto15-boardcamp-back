import  {validateCategories}  from "../validateSchema/postCategoriesSchema.js"
import connection from "../database/database.js"

export async function validateBody(req,res,next){
    const valida = validateCategories.validate(req.body)
    if(valida.error){
        res.status(400).send("Campos obrigatórios e devem ser uma string")
        return
    }
    try {
        const {rows : categoria} = await connection.query(`SELECT * FROM categories WHERE name = $1 ;`,[req.body.name]);
        console.log(categoria)
        if(categoria.length > 0){
            res.sendStatus(409)
            return
        }
        
        await connection.query(`INSERT INTO categories (name) VALUES($1)`,[req.body.name])
        
    } catch (error) {
            res.sendStatus(500)
    }

    next()
}

 
