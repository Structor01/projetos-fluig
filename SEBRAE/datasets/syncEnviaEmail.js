function defineStructure() {
    addColumn("DataEv");
    addColumn("Cidade");
    addColumn("nEnvios");
    addColumn("travaSeguranca");
    setKey(new Array("DataEv"));
    addIndex(new Array("DataEv"));
}

function onSync(lastSyncDate){
    var dataset = DatasetBuilder.newDataset();
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("syncEnviaEmail", null, null, null);
    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }
    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"DataEv"),""),
                ifNull(newerDataset.getValue(i,"Cidade"),""),
                ifNull(newerDataset.getValue(i,""),""),
                ifNull(newerDataset.getValue(i,"travaSeguranca"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"DataEv")));
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"DataEv") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"DataEv"),""),
                        ifNull(olderDataset.getValue(i,"Cidade"),""),
                        ifNull(olderDataset.getValue(i,"nEnvios"),""),
                        ifNull(olderDataset.getValue(i,"travaSeguranca"),"")
                    ));
                }
            }
        }
    }
    return dataset;
}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var c = new Array();
    var c1 = DatasetFactory.createConstraint("travaSeguranca", 'true', 'true', ConstraintType.MUST);
    c.push(c1);
    var envia =  DatasetFactory.getDataset("enviaEmailAconteceHoje", null, c, null);
    dataset = envia;

    return dataset;
}