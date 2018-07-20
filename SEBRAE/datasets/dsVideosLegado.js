function defineStructure() {
    addColumn('idVideo');
    addColumn('nmTitulo');
    addColumn('nmDestinoRelativoMidia');
    addColumn('nmCategoria');
    addColumn('docId');
    setKey(new Array( "idVideo"));
    addIndex(new Array( "idVideo"));
}

function onSync(lastSyncDate){
    var dataset = DatasetBuilder.newDataset();
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("dsVideosLegado", null, null, null);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"idVideo"),""),
                ifNull(newerDataset.getValue(i,"nmTitulo"),""),
                ifNull(newerDataset.getValue(i,"nmDestinoRelativoMidia"),""),
                ifNull(newerDataset.getValue(i,"nmCategoria"),""),
                ifNull(newerDataset.getValue(i,"docId"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"idVideo")));
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"idVideo") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"idVideo"),""),
                        ifNull(olderDataset.getValue(i,"nmTitulo"),""),
                        ifNull(olderDataset.getValue(i,"nmDestinoRelativoMidia"),""),
                        ifNull(olderDataset.getValue(i,"nmCategoria"),""),
                        ifNull(olderDataset.getValue(i,"docId"),"")
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
        "idVideo",
        "nmTitulo",
        "nmDestinoRelativoMidia",
        "nmCategoria",
        "docId"
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
        dataset.addColumn('idVideo');
        dataset.addColumn('nmTitulo');
        dataset.addColumn('nmDestinoRelativoMidia');
        dataset.addColumn('nmCategoria');
        dataset.addColumn('docId');

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'Migracao',
            endpoint : "/select?c=video&s=idVideo&o=-1",
            method : 'get',
            timeoutService: '100' // segundos
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw "Retorno está vazio";
        } else {
            var result = JSON.parse(vo.getResult());
            for(var i in result) {
                var mediaName = result[i]['nmDestinoRelativoMidia'].toString().replace('/uploads/sebrae/video/', '');
                log.info('--Media: ' + mediaName);
                var c1 = DatasetFactory.createConstraint("phisicalFile", mediaName, mediaName, ConstraintType.MUST);
                var cDoc = new Array(c1);
                var docId = DatasetFactory.getDataset("document", null, cDoc, null);
                log.info('--Doc Id: ' + docId.rowsCount);
                var id = '';
                if(docId.rowsCount > 0) {
                    id = docId.getValue(0, "documentPK.documentId");
                }

                dataset.addRow(new Array(
                    result[i]['idVideo'].toString(),
                    result[i]['nmTitulo'].toString(),
                    mediaName,
                    result[i]['nmCategoria'].toString(),
                    id
                ));
            }
        }
    } catch(err) {
        dataset = DatasetBuilder.newDataset();
        dataset.addColumn("Erro");
        dataset.addRow(new Array(
            err.toString()
        ));
    }

    return dataset;
}