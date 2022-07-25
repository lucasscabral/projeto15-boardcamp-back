

export async function getRentals(req,res){
    const pegaTodosAlugueis = res.locals.pegaTodosAlugueis;
    const AlugueisDoClienteSelec = res.locals.AlugueisDoClienteSelec;
    const AlugueisDoGameSelec = res.locals.AlugueisDoGameSelec;
    
    if((AlugueisDoClienteSelec === undefined) && (AlugueisDoGameSelec === undefined)){
        res.status(200).send(pegaTodosAlugueis);
        return;
    }
    if(AlugueisDoClienteSelec !== undefined){
        res.status(200).send(AlugueisDoClienteSelec);
        return
    }

    res.status(200).send(AlugueisDoGameSelec);
}

export async function insertRentals(req,res){
    res.sendStatus(201);
}

export async function finishRentals(req,res){
    res.sendStatus(200)
}

export async function deleteRentals(req,res){
    res.sendStatus(200);
}