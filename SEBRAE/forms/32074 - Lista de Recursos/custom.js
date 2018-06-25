function carregaTable(table){
    var row = wdkAddChild(table);
}

function sincRegistros() {
    var dataset = DatasetFactory.getDataset("sebrae_cadastra_recursos", null, null, null);
    for(var i in dataset.values) {
        var reg = criaRegistro(39224);
        var values = dataset.values[i];
        insere(values, reg['values'][0]['Retorno']);
        // var form = DatasetFactory.getDataset("sebrae_cadastra_recursos", null, null, null);
    }
}

function criaRegistro(id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
    return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
}

function insere(val, id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("CardId", id, "", ConstraintType.MUST));
    var keys = Object.keys(val);
    for(k in keys) {
        constraints.push(DatasetFactory.createConstraint("CardData", keys[k]+";" + val[keys[k]], "", ConstraintType.MUST));
    }
    return DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
}