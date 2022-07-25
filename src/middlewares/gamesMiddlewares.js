import connection from "../database/database.js";
import { validateGames } from "../validateSchema/postGamesSchema.js";

export async function verificaCaracteres(req,res,next){
    let name = req.query.name
    try {
        if(name === undefined){
            const {rows: AllGames} = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games 
                                                             JOIN categories 
                                                             ON games."categoryId" = categories.id;`); 
            
            res.locals.AllGames = AllGames;
            next();
            return;
        }else{
            name = name.toLowerCase();
            const {rows : gamesSelecionados} = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games 
                                                                       JOIN categories 
                                                                       ON games."categoryId" = categories.id 
                                                                       WHERE lower (games.name) LIKE $1;`,[name + "%"]);
            res.locals.gamesSelecionados = gamesSelecionados
            next();
            return;
        }
    } catch (error) {
        res.send(error)
    }
 
   
}

export async function validaCriacaoGame (req,res,next){
    const validou = validateGames.validate(req.body);
    let name = req.body.name;
    let image = req.body.image;
    let stockTotal = req.body.stockTotal;
    let categoryId = req.body.categoryId;
    let pricePerDay = req.body.pricePerDay;

    if(validou.error){
        res.status(400).send("Todos os campos são obrigatórios");
        return;
    }

    if((stockTotal <= 0) || (pricePerDay <= 0)){
        res.status(400).send("Stock Total e Preço por dia devem ser maiores que 0");
        return;
    }
    res.locals.name = name;
    res.locals.image = image;
    res.locals.stockTotal = stockTotal;
    res.locals.categoryId = categoryId;
    res.locals.pricePerDay = pricePerDay;
    next()
}
