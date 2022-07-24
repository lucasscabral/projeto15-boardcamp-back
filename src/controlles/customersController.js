


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
    
};

export async function insertCustomers (req,res){
    res.sendStatus(201);
};

export async function updateCustomers (req,res){
    
};