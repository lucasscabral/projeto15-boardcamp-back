import connection from "../database/database.js";

export async function getAllCustomers (req,res){
    const customersSelecionados = res.locals.customersSelecionados;
    const AllCustomers = res.locals.AllCustomers;
    if(customersSelecionados === undefined){
        res.send(AllCustomers);
        return;
    }else{
        res.send(customersSelecionados);
    }
};

export async function getByIdCustomers (req,res){
    const customer = res.locals.customer
    res.send(customer);
};

export async function insertCustomers (req,res){
    let name = res.locals.name;
    let phone = res.locals.phone;
    let cpf = res.locals.cpf;
    let birthday = res.locals.birthday;

    try {
        const {rows: cpfExistente} = await connection.query(`SELECT * FROM customers WHERE cpf = $1`,[cpf]);
        if(cpfExistente.length > 0){
            res.status(409).send("Esse CPF já esta em uso");
            return;
        }

        await connection.query(`INSERT INTO customers(name,phone,cpf,birthday) VALUES($1,$2,$3,$4);`,[name,phone,cpf,birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

export async function updateCustomers (req,res){
    res.sendStatus(200);
};