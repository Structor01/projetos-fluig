function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    //Cria as colunas
    dataset.addColumn("Sincronizado");
    dataset.addColumn("CodEvento");
    dataset.addColumn("CodCidade");
    dataset.addColumn("PeriodoInicial");
    dataset.addColumn("PeriodoFinal");
    dataset.addColumn("Local");
    dataset.addColumn("TituloEvento");
    dataset.addColumn("PublicoEvento");
    dataset.addColumn("DescProduto");
    dataset.addColumn("DescUnidadeOrganizacional");
    dataset.addColumn("Preco");

    var dtInicio = '2018-01-01';
    var dtFinal = '2018-31-12';
    var mode;

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "date") {
                dtInicio = constraints[i].initialValue;
                dtFinal = constraints[i].finalValue;
            }

            if (constraints[i].fieldName == "mode") {
                mode = constraints[i].initialValue;
            }
        }
    }

    try {
        var clientService = fluigAPI.getAuthorizeClientService();

        var data = {
            companyId : getValue("WKCompany") + '',
            serviceCode : 'SAS',
            endpoint : '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial='+dtInicio+'&PeriodoFinal='+dtFinal,
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
                var sinc = 'false';
                var jaCadastrado = DatasetFactory.getDataset("dsEventos", null, [DatasetFactory.createConstraint("codSAS", result[i]['CodEvento'].toString(), result[i]['CodEvento'].toString(), ConstraintType.MUST)], null);

                if(jaCadastrado.rowsCount > 0) {
                    sinc = 'true';
                    if(mode == 'edit') {
                        
                    }
                } else {

                }

                dataset.addRow(new Array(
                    sinc,
                    result[i]['CodEvento'].toString(),
                    result[i]['CodCidade'].toString(),
                    result[i]['PeriodoInicial'].toString(),
                    result[i]['PeriodoFinal'].toString(),
                    result[i]['Local'].toString(),
                    result[i]['TituloEvento'].toString(),
                    result[i]['PublicoEvento'].toString(),
                    result[i]['DescProduto'].toString(),
                    result[i]['DescUnidadeOrganizacional'].toString(),
                    result[i]['Preco'].toString()
                ));
            }
        }
        
        return dataset;

    } catch(err) {
        throw err;
    }
}

function atualizaForm() {
    
}