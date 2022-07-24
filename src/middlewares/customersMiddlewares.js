import {validateCustomers} from "../validateSchema/customersSchema.js"
import connection from "../database/database.js"

export async function buscaPorCpf (req,res,next){
    let cpf = req.query.cpf
    try {
        if(cpf === undefined){
            const {rows: AllCustomers} = await connection.query(`SELECT * FROM customers;`); 
                                                            
            res.locals.AllCustomers = AllCustomers;
            next();
            return;
        }else{
            cpf = cpf.toLowerCase();
            const {rows : customersSelecionados} = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1;`,[cpf + "%"]);
            if(!customersSelecionados){
             res.sendStatus(404);
             return;
            }
            res.locals.customersSelecionados = customersSelecionados;
            next();
            return;
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }
 
}

export async function validaBody (req,res,next){
    const validou = validateCustomers.validate(req.body);
    
    let name = req.body.name;
    let phone= req.body.phone;
    let cpf = req.body.cpf;
    let birthday = req.body.birthday;
    if(validou.error){
        res.status(400).send("Todos os campos devem ser válidos");
        return;
    }
    try {
        const {rows: cpfExistente} = await connection.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf]);
        console.log(cpfExistente)
        if(cpfExistente.length > 0){
            req.status(409).send("Esse CPF já esta em uso");
            return;
        }

        await connection.query(`INSERT INTO customers(name,phone,cpf,birthday) VALUES($1,$2,$3,$4);`,[name,phone,cpf,birthday]);
      
    } catch (error) {
        
    }
    next();
}