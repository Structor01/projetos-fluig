function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    var collection = '';

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "collection") {
                collection = constraints[i].initialValue;
            }
        }
    }

    try {
        if(collection == '') throw 'Insira o nome da Collection <collection>.';

        dataset.addColumn('nmTitulo');
        dataset.addColumn('nmDestinoRelativoMidia');
        dataset.addColumn('nmCategoria');

        var clientService = fluigAPI.getAuthorizeClientService();
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'Migracao',
            endpoint : '/select?c=' + collection,
            method : 'get',
            timeoutService: '100' // segundos
        }
        var vo = clientService.invoke(JSON.stringify(data));
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw "Retorno está vazio";
        } else {
            var result = JSON.parse(vo.getResult());
            log.info(result[0]);
            for(var i in result) {
                dataset.addRow(new Array(
                    result[i]['nmTitulo'].toString(),
                    result[i]['nmDestinoRelativoMidia'].toString(),
                    result[i]['nmCategoria'].toString()
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