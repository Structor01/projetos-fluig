function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();
    //Cria as colunas
    dataset.addColumn("codEstado");
    dataset.addColumn("codCidade");
    dataset.addColumn("descricaoCidade");
    var codEstado = '10';
    var codCidade = '';

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "codEstado") {
                codEstado = constraints[i].initialValue;
            }

            if (constraints[i].fieldName == "codCidade") {
                codCidade = constraints[i].initialValue;
            }
        }
    }

    try {
        var clientService = fluigAPI.getAuthorizeClientService();
        if(codEstado == '') throw "Insira o Código do Estado <codEstado>";
        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'SAS-Estados',
            endpoint : '/Service/Endereco/ConsultarCidade?CodSebrae=17&CodEst='+codEstado,
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
                if(codCidade != '') {
                    if(result[i]['CodCid'] != codCidade) continue;
				}
                dataset.addRow(new Array(
                    result[i]['CodEst'].toString(),
                    result[i]['CodCid'].toString(),
                    result[i]['DescCid'].toString()
                ));
            }
        }
    } catch(err) {
        throw err;
    }

    return dataset;
}
