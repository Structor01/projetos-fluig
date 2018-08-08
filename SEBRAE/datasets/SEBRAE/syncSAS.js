function defineStructure() {
    addColumn("Sincronizado");
    addColumn("CodEvento");
    addColumn("CodCidade");
    addColumn("PeriodoInicial");
    addColumn("PeriodoFinal");
    addColumn("localEvento");
    addColumn("TituloEvento");
    addColumn("PublicoEvento");
    addColumn("DescProduto");
    addColumn("DescUnidadeOrganizacional");
    addColumn("Preco");
    setKey(new Array("CodEvento"));
    addIndex(new Array("CodEvento"));
}

function onSync(lastSyncDate){
    var dataset = DatasetBuilder.newDataset();
    var newerDataset = createDataset();
    var olderDataset = DatasetFactory.getDataset("dsRecursosDisponiveis", null, null, null);
    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }
    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"Sincronizado"),""),
                ifNull(newerDataset.getValue(i,"CodEvento"),""),
                ifNull(newerDataset.getValue(i,"CodCidade"),""),
                ifNull(newerDataset.getValue(i,"PeriodoInicial"),""),
                ifNull(newerDataset.getValue(i,"PeriodoFinal"),""),
                ifNull(newerDataset.getValue(i,"localEvento"),""),
                ifNull(newerDataset.getValue(i,"TituloEvento"),""),
                ifNull(newerDataset.getValue(i,"PublicoEvento"),""),
                ifNull(newerDataset.getValue(i,"DescProduto"),""),
                ifNull(newerDataset.getValue(i,"DescUnidadeOrganizacional"),""),
                ifNull(newerDataset.getValue(i,"Preco"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"CodEvento")));
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"CodEvento") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"Sincronizado"),""),
                        ifNull(olderDataset.getValue(i,"CodEvento"),""),
                        ifNull(olderDataset.getValue(i,"CodCidade"),""),
                        ifNull(olderDataset.getValue(i,"PeriodoInicial"),""),
                        ifNull(olderDataset.getValue(i,"PeriodoFinal"),""),
                        ifNull(olderDataset.getValue(i,"localEvento"),""),
                        ifNull(olderDataset.getValue(i,"TituloEvento"),""),
                        ifNull(olderDataset.getValue(i,"PublicoEvento"),""),
                        ifNull(olderDataset.getValue(i,"DescProduto"),""),
                        ifNull(olderDataset.getValue(i,"DescUnidadeOrganizacional"),""),
                        ifNull(olderDataset.getValue(i,"Preco"),"")
                    ));
                }
            }
        }
    }
    return dataset;
}

function onMobileSync(user) {
    // log.warn("--MOBILE-- dsCidade.js - onMobileSync");

    var sortingFields = new Array();

    var fields = new Array(
        "Sincronizado",
        "CodEvento",
        "CodCidade",
        "PeriodoInicial",
        "PeriodoFinal",
        "localEvento",
        "TituloEvento",
        "PublicoEvento",
        "DescProduto",
        "DescUnidadeOrganizacional",
        "Preco"
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
    //Cria as colunas
    dataset.addColumn("Sincronizado");
    dataset.addColumn("CodEvento");
    dataset.addColumn("CodCidade");
    dataset.addColumn("PeriodoInicial");
    dataset.addColumn("PeriodoFinal");
    dataset.addColumn("localEvento");
    dataset.addColumn("TituloEvento");
    dataset.addColumn("PublicoEvento");
    dataset.addColumn("DescProduto");
    dataset.addColumn("DescUnidadeOrganizacional");
    dataset.addColumn("Preco");


    var dtInicio = getDateNow();
    var dtFinal = '2018-31-12';
    var mode;
    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "date") {
                dtInicio = constraints[i].initialValue;
                dtFinal = constraints[i].finalValue;
            }
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
        log.info('/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial='+dtInicio+'&PeriodoFinal='+dtFinal);
        var data = {};
        data.companyId = "" + getValue("WKCompany");
        data.serviceCode  = "" + 'SAS'
        data.endpoint  = "" + '/Service/Evento/Consultar?CodSebrae=17&PeriodoInicial='+dtInicio+'&PeriodoFinal='+dtFinal;
        data.method  = "" + 'get';
        data.timeoutService = "" + '100';

        // var jsonS = JSON.stringify(data);
        log.info(JSON.stringify(data));
        var vo = clientService.invoke(JSON.stringify(data));
        if(vo.getResult()== null || vo.getResult().isEmpty()){
            throw "Retorno está vazio";
        } else {
            var result = JSON.parse(vo.getResult());
            for(var i in result) {
                var sinc = 'false';
                var jaCadastrado = DatasetFactory.getDataset("dsEventos", null, [DatasetFactory.createConstraint("codSAS", result[i]['CodEvento'].toString(), result[i]['CodEvento'].toString(), ConstraintType.MUST)], null);
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
                if(jaCadastrado.rowsCount == 0) {
                    salvarForm(constraints, false);
                } else {
                    salvarForm(constraints, jaCadastrado.getValue(0,'documentId'));
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

function salvarForm(constraints, cardId) {
    var registro;
    if(!cardId) {
        registro = criaRegistro(36117);
        cardId = registro.getValue(0, 'Retorno');
        // log.info('Foi gravado um novo registro ' + cardId);
    }
    constraints.push(DatasetFactory.createConstraint("CardId", parseInt(cardId), "", ConstraintType.MUST));
    var insere = DatasetFactory.getDataset("dsAlteraForm", null, constraints, null);
    var msg = 'O registro ' + cardId + ' foi alterado!';
    // log.info(msg);
}

function verificaTipoEv(ev) {
    var tipoEventos = DatasetFactory.getDataset("dsTipoEvento", null, null, null);
    if(tipoEventos && tipoEventos.rowsCount > 0) {
        for(var i=0; i < tipoEventos.rowsCount; i++) {
            var rec = tipoEventos.getValue(i, "Tipo");
            if(ev.indexOf(rec) > -1) return rec;
        }
    }
}


function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = year+'-'+month+'-'+day;
    var currentTime = currentDate + "  " + currentHour;
    return currentDate;
}

function disarrangeData(e) {
    var date = e.split('T');
    date = date[0].split('-');
    var hora = e.split('T')[1];
    date = date[2]+'/'+date[1]+'/'+date[0] + ' ' + hora;
    return date;
}