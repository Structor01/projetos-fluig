function carregaTable(table){
    var row = wdkAddChild(table);
}

function sincRegistros() {
    var dataset = DatasetFactory.getDataset("sebrae_cadastra_recursos", null, null, null);
    for(var i in dataset) {
        console.log(dataset.values);
    }
}