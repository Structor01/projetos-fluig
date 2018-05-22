function defineStructure() {
    log.info("--OFFLINE-- defineStructure");

    addColumn("sol");
    addColumn("dtInicio");
    addColumn("dtFinal");
    addColumn("qtSolicitada");
    addColumn("codigoRecurso");

    log.info("--OFFLINE-- defineStructure addColumn");
    setKey(new Array( "sol"));
    addIndex(new Array( "sol"));

    log.info("--OFFLINE-- defineStructure FIM");
}

function onSync(lastSyncDate){
    log.info("--OFFLINE-- onSync ");

    var dataset = DatasetBuilder.newDataset();
    log.info("--OFFLINE-- dataset: "+dataset);

    var newerDataset = createDataset();
    log.info("--OFFLINE-- newerDataset: "+newerDataset);

    var olderDataset = DatasetFactory.getDataset("dsRecursosDisponiveis", null, null, null);
    log.info("--OFFLINE-- olderDataset: "+olderDataset);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"sol"),""),
                ifNull(newerDataset.getValue(i,"dtInicio"),""),
                ifNull(newerDataset.getValue(i,"dtFinal"),""),
                ifNull(newerDataset.getValue(i,"qtSolicitada"),""),
                ifNull(newerDataset.getValue(i,"codigoRecurso"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"sol")));
            log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"sol") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"sol"),""),
                        ifNull(olderDataset.getValue(i,"dtInicio"),""),
                        ifNull(olderDataset.getValue(i,"dtFinal"),""),
                        ifNull(olderDataset.getValue(i,"qtSolicitada"),""),
                        ifNull(olderDataset.getValue(i,"codigoRecurso"),"")
                    ));
                }
            }
        }
    }

    log.info("--OFFLINE-- return dataset: "+dataset);
    log.info("--OFFLINE-- onSync FIM");
    return dataset;
}

function onMobileSync(user) {
    log.warn("--MOBILE-- dsCidade.js - onMobileSync");

    var sortingFields = new Array();

    var fields = new Array(
        "sol",
        "dtInicio",
        "dtFinal",
        "qtSolicitada",
        "codigoRecurso"
    );

    var constraints = new Array();

    var result = {
        'fields' : fields,
        'constraints' : constraints,
        'sortingFields' : sortingFields
    };

    log.warn("--MOBILE-- dsCidade.js - fim onMobileSync");
    return result;
}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    dataset.addColumn("sol");
    dataset.addColumn("dtInicio");
    dataset.addColumn("dtFinal");
    dataset.addColumn("qtSolicitada");
    dataset.addColumn("codigoRecurso");

    try {
        var available = getAvailable();
        log.info("Vai entrar no for!");
        for (var i = 0; i < available.rowsCount; i++) {
            log.info("Entrou no "+ i +"!");
            var nconstraints = new Array();
            nconstraints.push(DatasetFactory.createConstraint("metadata#id", available.getValue(i, "cardId").toString(), available.getValue(i, "cardId").toString(), ConstraintType.MUST));
            var doc = DatasetFactory.getDataset("dsReserva_Recursos", null, nconstraints, null);
            if (doc && doc.rowsCount > 0) {
                var process = false;
                log.info("Entrou no "+ i +"!");
                if (available.getValue(i, 'codTask') == '6' && arrangeData(getDateNow()) > arrangeData(doc.getValue(0, 'dtFinal'))) {
                    process = atualizaProcessos(
                        dataset.values[i]["processInstanceId"],
                        7,
                        dataset.values[i]["requesterId"],
                        'Movimentado Automáticamente'
                    );
                }

                dataset.addRow(new Array(
                    doc.getValue(0, 'solicitanteInformado'),
                    doc.getValue(0, 'dtInicio'),
                    doc.getValue(0, 'dtFinal'),
                    doc.getValue(0, 'qtSolicitada'),
                    doc.getValue(0, 'codigoRecurso')
                ));
            }
        }
    } catch (e) {
        throw e + ' ' +e.lineNumber;
    }

    return dataset;
}

function atualizaProcessos(sol, atv, colab, comment) {
    var c1 = DatasetFactory.createConstraint("Solicitação", sol, sol, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("Atividade", atv, atv, ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("Usuário Executor", colab, colab, ConstraintType.MUST);
    var c4 = DatasetFactory.createConstraint("Comentário", comment, comment, ConstraintType.MUST);
    var c5 = DatasetFactory.createConstraint("Usuário Destino", "System:Auto", "System:Auto", ConstraintType.MUST);
    var constraints = new Array(c1, c2, c3, c4, c5);
    try {
        log.info(sol + "Movida!");
        return DatasetFactory.getDataset("dsMoverAtiv", null, constraints, null);
    } catch (e) {
        log.error(sol + "Erro!");
    }
}

function getAvailable() {
    log.info("Get Available!");
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("processId", 'reserva_recurso', 'reserva_recurso', ConstraintType.MUST));
    return DatasetFactory.getDataset("dsGetAvailableProces", null, constraints, null);
}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute;
    var currentDate = day + '/' + month + '/' + year;
    var currentTime = currentDate + " " + currentHour;
    return currentTime;
}

function arrangeData(e) {
    var t = e.split(' ');
    var date = t[0].split('/');
    var newDate = date[2] + '-' + date[1] + '-' + date[0] + 'T' + t[1] + ':00';
    return new Date(newDate);
}