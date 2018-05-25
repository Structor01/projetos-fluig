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
                if(jaCadastrado.rowsCount == 0) {
                    var constraints = new Array();
                    constraints.push(DatasetFactory.createConstraint("CardData", "dtFinal;" + disarrangeData(result[i]['PeriodoFinal']), "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "codSAS;" + result[i]['CodEvento'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "codCidade;" + result[i]['CodCidade'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "dtInicio;" + disarrangeData(result[i]['PeriodoInicial']), "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "endereco;" + result[i]['Local'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "location;" + result[i]['Local'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "nomeEvento;" + result[i]['TituloEvento'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "publicoAlvo;" + result[i]['PublicoEvento'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "tipoEvento;" + verificaTipoEv(result[i]['DescProduto']), "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "unidadeVinculada;" + result[i]['DescUnidadeOrganizacional'], "", ConstraintType.MUST));
                    constraints.push(DatasetFactory.createConstraint("CardData", "valorInscricao;" + result[i]['Preco'], "", ConstraintType.MUST));
                    salvarForm(constraints);
                } else {
                    sinc = 'true';
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

function criaRegistro(id) {
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("Parent Id", id, "", ConstraintType.MUST));
    return DatasetFactory.getDataset("dsCriaRegistro", null, constraints, null);
}

function salvarForm(constraints) {
    var registro = criaRegistro(36117);
    var cardId = registro.getValue(0, 'Retorno');
    log.info('Foi gravado um novo registro ' + cardId);
    constraints.push(DatasetFactory.createConstraint("CardId", parseInt(cardId), "", ConstraintType.MUST));
    var insere = DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
    var msg = 'O registro ' + cardId + ' foi alterado!';
    log.info(msg);
}

function verificaTipoEv(ev) {
    var tipoEventos = DatasetFactory.getDataset("dsTipoEvento", null, null, null);
    if(tipoEventos.values && tipoEventos.values.length) {
        for(var i in tipoEventos.values) {
            var rec = tipoEventos.values[i]['Tipo'];
            if(ev.indexOf(rec) > -1) return rec;
        }
    }
}

function disarrangeData(e) {
    var date = e.split('T');
    date = date[0].split('-');
    var hora = e.split('T')[1];
    date = date[2]+'/'+date[1]+'/'+date[0] + ' ' + hora;
    return date;
}