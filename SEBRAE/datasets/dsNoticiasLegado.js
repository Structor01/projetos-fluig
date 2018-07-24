function defineStructure() {
    addColumn('docId');
    addColumn('idNoticia');
    addColumn('idCategoria');
    addColumn('dataPublicacao');
    addColumn('nmTitulo');
    addColumn('nmSubtitulo');
    addColumn('txConteudo');
    addColumn('nmFonte');
    addColumn('idMidia');
    addColumn('nmMedia');
    setKey(new Array("idNoticia"));
    addIndex(new Array("idNoticia"));
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
                ifNull(newerDataset.getValue(i,"docId"),""),
                ifNull(newerDataset.getValue(i,"idNoticia"),""),
                ifNull(newerDataset.getValue(i,"idCategoria"),""),
                ifNull(newerDataset.getValue(i,"dataPublicacao"),""),
                ifNull(newerDataset.getValue(i,"nmTitulo"),""),
                ifNull(newerDataset.getValue(i,"nmSubtitulo"),""),
                ifNull(newerDataset.getValue(i,"txConteudo"),""),
                ifNull(newerDataset.getValue(i,"nmFonte"),""),
                ifNull(newerDataset.getValue(i,"idMidia"),""),
                ifNull(newerDataset.getValue(i,"nmMedia"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"idNoticia")));
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"idNoticia") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"docId"),""),
                        ifNull(olderDataset.getValue(i,"idNoticia"),""),
                        ifNull(olderDataset.getValue(i,"idCategoria"),""),
                        ifNull(olderDataset.getValue(i,"dataPublicacao"),""),
                        ifNull(olderDataset.getValue(i,"nmTitulo"),""),
                        ifNull(olderDataset.getValue(i,"nmSubtitulo"),""),
                        ifNull(olderDataset.getValue(i,"txConteudo"),""),
                        ifNull(olderDataset.getValue(i,"nmFonte"),""),
                        ifNull(olderDataset.getValue(i,"idMidia"),""),
                        ifNull(olderDataset.getValue(i,"nmMedia"),"")
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
        'docId',
        'idNoticia',
        'idCategoria',
        'dataPublicacao',
        'nmTitulo',
        'nmSubtitulo',
        'txConteudo',
        'nmFonte',
        'idMidia',
        'nmMedia'
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
        dataset.addColumn('docId');
        dataset.addColumn('idNoticia');
        dataset.addColumn('idCategoria');
        dataset.addColumn('dataPublicacao');
        dataset.addColumn('nmTitulo');
        dataset.addColumn('nmSubtitulo');
        dataset.addColumn('txConteudo');
        dataset.addColumn('nmFonte');
        dataset.addColumn('idMidia');
        dataset.addColumn('nmMedia');

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'Migracao',
            endpoint : "/select?c=noticias&s=dataPublicacao&o=1",
            method : 'get',
            timeoutService: '100' // segundos
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw "Retorno está vazio";
        } else {
            var result = JSON.parse(vo.getResult());
            for(var i in result) {
                var mediaName = '';
                var id = 'null';
                if(result[i]['nmDestinoRelativoMidia'] != null) {
                    mediaName = result[i]['nmDestinoRelativoMidia'].toString().replace('/uploads/sebrae/noticia/', '');
                    var c1 = DatasetFactory.createConstraint("phisicalFile", mediaName, mediaName, ConstraintType.MUST);
                    var cDoc = new Array(c1);
                    var docId = DatasetFactory.getDataset("document", null, cDoc, null);
                    log.info('--Doc Count: ' + docId.rowsCount);
                    if(docId.rowsCount > 0) {
                        id = docId.getValue(0, "documentPK.documentId");
                        log.info('--DocId: ' + id);
                    }
                }
                log.info('--Media: ' + mediaName);

                var arr = new Array(
                    'docId',
                    'idNoticia',
                    'idCategoria',
                    'dataPublicacao',
                    'nmTitulo',
                    'nmSubtitulo',
                    'txConteudo',
                    'nmFonte',
                    'idMidia',
                    'nmMedia'
                );

                for(var j=0; j < arr.length; j++) {
                    if(result[i][arr[j]] == null) {
                        result[i][arr[j]] = '';
                    }
                }

                dataset.addRow(new Array(
                    id,
                    result[i]['idNoticia'].toString(),
                    result[i]['idCategoria'].toString(),
                    result[i]['dataPublicacao'].toString(),
                    result[i]['nmTitulo'].toString(),
                    result[i]['nmSubtitulo'].toString(),
                    result[i]['txConteudo'].toString(),
                    result[i]['nmFonte'].toString(),
                    result[i]['idMidia'].toString(),
                    mediaName
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