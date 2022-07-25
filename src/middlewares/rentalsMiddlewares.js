import connection from "../database/database.js";
import { validateBodyRentals } from "../validateSchema/rentalsSchema.js";
import dayjs from "dayjs"

export async function metodosDeBuscaAlugueis(req,res,next){
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    if((customerId === undefined) && (gameId === undefined)){
        try {
            const {rows : pegaTodosAlugueis} = await connection.query(`SELECT rentals.*,
                                                                        row_to_json(customers) AS customer,
                                                                        row_to_json(games) AS game
                                                                        FROM rentals
                                                                        JOIN(SELECT id,name FROM customers) customers
                                                                        ON rentals."customerId" = customers.id
                                                                       JOIN (SELECT id,name,"categoryId" FROM games) games
                                                                       ON rentals."gameId" = games.id;`)
            if(pegaTodosAlugueis.length === 0){
                res.locals.pegaTodosAlugueis = pegaTodosAlugueis;
                next();
                return;
            }
            res.locals.pegaTodosAlugueis = pegaTodosAlugueis;
            next();
        } catch (error) {
            res.sendStatus(500);
        }  
    }
    if(customerId !== undefined){
        try {
            const {rows : AlugueisDoClienteSelec} = await connection.query(`SELECT rentals.*,
                                                                            row_to_json(customers) AS customer,
                                                                            row_to_json(games) AS game
                                                                            FROM rentals
                                                                            JOIN(SELECT id,name FROM customers) customers
                                                                            ON rentals."customerId" = customers.id
                                                                            JOIN (SELECT id,name,"categoryId" FROM games) games
                                                                            ON rentals."gameId" = games.id
                                                                            WHERE "customerId" = $1;`,[customerId]);
          
            if(AlugueisDoClienteSelec.length === 0){
                res.status(404).send("Esse cliente não existe");
                return;
            }
            res.locals.AlugueisDoClienteSelec = AlugueisDoClienteSelec;
            next();
        } catch (error) {
            res.send(error)
        }
   
    }
    if(gameId !== undefined){
        try {
            const {rows : AlugueisDoGameSelec} = await connection.query(`SELECT rentals.*,
                                                                            row_to_json(customers) AS customer,
                                                                            row_to_json(games) AS game
                                                                            FROM rentals
                                                                            JOIN(SELECT id,name FROM customers) customers
                                                                            ON rentals."customerId" = customers.id
                                                                            JOIN (SELECT id,name,"categoryId" FROM games) games
                                                                            ON rentals."gameId" = games.id
                                                                            WHERE "gameId" = $1;`,[gameId]);

            if(AlugueisDoGameSelec.length === 0){
            res.status(404).send("Esse game ainda não foi alugado");
            return;
            }
            res.locals.AlugueisDoGameSelec = AlugueisDoGameSelec;
            next();
        } catch (error) {
            
        }
    }
}

export async function validaBody(req,res,next){
    const validou = validateBodyRentals.validate(req.body);

    if(validou.error){
        res.status(400).send("Todos o campos são obrigatórios e os dias alugados deve ser maior que 0");
        return;
    }

    try {
        const {rows: customerIdValido} = await connection.query(`SELECT * FROM customers WHERE id = $1;`,[req.body.customerId]);
        if(customerIdValido.length === 0){
            res.sendStatus(400);
            return;
        }
        const {rows: gameIdValido} = await connection.query(`SELECT * FROM games WHERE id = $1;`,[req.body.gameId]);
        if(gameIdValido.length === 0){
            res.sendStatus(400);
            return;
        }
        const {rows:updateStocksGame} = await connection.query(`SELECT * FROM games WHERE id = $1;`,[req.body.gameId]);
        if(updateStocksGame[0].stockTotal < 0){
            res.status(400).send("O estoque desse jogo esta esgotado!");
            return;
        }
        let customerId = req.body.customerId;
        let gameId = req.body.gameId;
        let rentDate = dayjs().format('YYYY/MM/DD');
        let daysRented = req.body.daysRented;
        let returnDate = null;
        let originalPrice = gameIdValido[0].pricePerDay * req.body.daysRented;
        let delayFee = null;

        await connection.query(`UPDATE games SET "stockTotal" = "stockTotal" - 1 WHERE id = $1;`,[req.body.gameId]);
        
        await connection.query(`INSERT INTO rentals("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") 
                                VALUES($1,$2,$3,$4,$5,$6,$7);`,[customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee]);
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}
export async function retornoDoAluguel(req,res,next){
    const idAluguel = req.params.id;
    try {
        const{rows: existeIdAluguel} = await connection.query(`SELECT * FROM rentals WHERE rentals.id = $1;`,[idAluguel]);
        if(existeIdAluguel.length === 0){
            res.status(404).send("Esse aluguel não existe");
            return;
        }
        const devolucaoAluguel = dayjs().format("YYYY/MM/DD");
        await connection.query(`UPDATE rentals SET "returnDate" = $1,"delayFee" = 0;`,[devolucaoAluguel])

        next();
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deletaAluguel(req,res,next){
    const idAluguel = req.params.id;
    try {
        const{rows: existeIdAluguel} = await connection.query(`SELECT * FROM rentals WHERE rentals.id = $1`,[idAluguel]);
        if(existeIdAluguel.length === 0){
            res.status(404).send("Esse aluguel não existe");
            return;
        }
        await connection.query(`DELETE FROM rentals WHERE rentals.id = $1`,[idAluguel]);
        next();
    } catch (error) {
        res.sendStatus(500);
    }
}