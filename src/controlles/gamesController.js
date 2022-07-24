import connection from "../database/database.js"


export async function getByCharacters(req,res){
    const gamesSelecionados = res.locals.gamesSelecionados;
    const AllGames = res.locals.AllGames;
    if(gamesSelecionados === undefined){
        res.send(AllGames);
        return;
    }else{
        res.send(gamesSelecionados);
        return;
    }
};

export async function createGame(req,res){
    let name = res.locals.name;
    let image = res.locals.image;
    let stockTotal = res.locals.stockTotal;
    let categoryId = res.locals.categoryId;
    let pricePerDay = res.locals.pricePerDay;

    try {
        const {rows:categoriaExiste} = await connection.query('SELECT * FROM categories WHERE id = $1',[categoryId]);
        if(!categoriaExiste){
            res.sendStatus(400);
            return;
        }
        const {rows: game} = await connection.query('SELECT * FROM games WHERE name = $1',[name]);
        if(game.length > 0){
            res.sendStatus(409);
            return;
        }
       

        await connection.query(`INSERT INTO games(name,image,"stockTotal","categoryId","pricePerDay") VALUES($1,$2,$3,$4,$5);`,[name,image,stockTotal,categoryId,pricePerDay]);
        res.sendStatus(201);
    }catch (error){
        res.sendStatus(500);
    }
};