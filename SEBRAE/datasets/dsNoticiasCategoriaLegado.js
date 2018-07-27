function defineStructure() {
    addColumn('idCategoria');
    addColumn('nmCategoria');
    addColumn('pasta');
    setKey(new Array("idCategoria"));
    addIndex(new Array("idCategoria"));
}

function onSync(lastSyncDate){
    var dataset = DatasetBuilder.newDataset();
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("dsNoticiasLegado", null, null, null);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"idCategoria"),""),
                ifNull(newerDataset.getValue(i,"nmCategoria"),""),
                ifNull(newerDataset.getValue(i,"pasta"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"idCategoria")));
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"idCategoria") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"idCategoria"),""),
                        ifNull(olderDataset.getValue(i,"nmCategoria"),""),
                        ifNull(olderDataset.getValue(i,"pasta"),"")
                    ));
                }
            }
        }
    }

    return dataset;
}

function onMobileSync(user) {

    var sortingFields = new Array();

    var fields = new Array(
        'idCategoria',
        'nmCategoria',
        'pasta'
    );

    var constraints = new Array();

    var result = {
        'fields' : fields,
        'constraints' : constraints,
        'sortingFields' : sortingFields
    };

    return result;
}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var collection = '';

    try {
        dataset.addColumn('idCategoria');
        dataset.addColumn('nmCategoria');
        dataset.addColumn('pasta');

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'Migracao',
            endpoint : "/select?c=noticia_categoria&s=idCategoria&o=1",
            method : 'get',
            timeoutService: '100' // segundos
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw "Retorno está vazio";
        } else {
            var result = JSON.parse(vo.getResult());
            for(var i in result) {
                dataset.addRow(new Array(
                    result[i]['idCategoria'].toString(),
                    result[i]['nmCategoria'].toString(),
                    result[i]['pasta'].toString()
                ));
            }
        }
    } catch(err) {
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("Erro");
        dataset.addColumn("Erro Linha");
        dataset.addRow(new Array(
            err.toString(),
            err.lineNumber.toString()
        ));
    }

    return dataset;
}