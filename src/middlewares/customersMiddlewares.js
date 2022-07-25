import {validateCustomers} from "../validateSchema/customersSchema.js"
import connection from "../database/database.js"

export async function getCustomers (req,res,next){
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
        res.send(error)
    }
 
}

export async function validaId(req,res,next){
    let id = req.params.buscaId;
   
    try {
        const {rows: customer} = await connection.query(`SELECT * FROM customers WHERE id = $1`,[id]);
        if(customer.length === 0){
            res.status(404).send("Esse usuário não existe");
            return;
        }
        res.locals.customer = customer;
        next();
    } catch (error) {
        res.sendStatus(500);
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
    res.locals.name= name;
    res.locals.phone= phone;
    res.locals.cpf= cpf;
    res.locals.birthday= birthday;
    next();
}

export async function validaBodyUpdate(req,res,next){
    const updateId = req.params.updateId;
    const validou = validateCustomers.validate(req.body);
    console.log(validou)
    const name = req.body.name;
    const phone = req.body.phone;
    const cpf = req.body.cpf;
    const birthday = req.body.birthday;

    if(validou.error){
        res.status(400).send("Todos os campos são obrigatórios e devem ser válidos");
        return;
    }
    if(updateId === undefined){
        res.status(400).send("Informe o id do usuário que deseja atualizar");
        return;
    }

    const{rows: customerUpdate} = await connection.query(`SELECT * FROM customers WHERE id = $1;`,[updateId]);
    if(customerUpdate.length === 0){
        res.status(400).send("Não existe um usuário com esse id");
        return;
    }
    await connection.query(`UPDATE customers SET name = $1,phone = $2, cpf= $3,birthday = $4 WHERE id = $5;`,[name,phone,cpf,birthday,updateId])
    next();
}