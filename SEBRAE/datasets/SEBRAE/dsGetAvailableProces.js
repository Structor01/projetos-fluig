function createDataset(fields, constraints, sortFields) {
    log.warn('--Dataset dsGetAvailableProces');

    var dataset = DatasetBuilder.newDataset();
    var processId = '';

    //Cria as colunas

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "processId") {
                processId = constraints[i].initialValue;
            }
        }
    }

    if (processId == '') {
        dataset.addColumn("ERRO");
        dataset.addColumn("processId");
        dataset.addRow(new Array("Insira o código do processo"));
        return dataset;
    }

    try {
        var c1 = DatasetFactory.createConstraint("processId", processId, processId, ConstraintType.MUST);
        var processos = DatasetFactory.getDataset("workflowProcess", null, new Array(c1), null);
        if (processos.rowsCount > 0) {
            dataset.addColumn("processId");
            dataset.addColumn("processInstanceId");
            dataset.addColumn("requesterId");
            dataset.addColumn("active");
            dataset.addColumn("version");
            dataset.addColumn("expired");
            dataset.addColumn("codTask");
            dataset.addColumn("cardId");
            dataset.addColumn("task");

            for (var i = 0; i < processos.rowsCount; i++) {
                var c2 = DatasetFactory.createConstraint("processInstanceId", processos.getValue(i, "workflowProcessPK.processInstanceId"), processos.getValue(i, "workflowProcessPK.processInstanceId"), ConstraintType.MUST);
                var task = DatasetFactory.getDataset("workflowProcess", null, new Array(c2), null);
                var ativ = getAtividade(processos.getValue(i, "workflowProcessPK.processInstanceId"), processos.getValue(i, "version"), processId);
                if(ativ == false) continue;
                var processHistory = ativ[0];
                var procesState = ativ[1];
                dataset.addRow(new Array(
                    processos.getValue(i, "processId"),
                    processos.getValue(i, "workflowProcessPK.processInstanceId"),
                    processos.getValue(i, "requesterId"),
                    processos.getValue(i, "active"),
                    processos.getValue(i, "version"),
                    processos.getValue(i, "expired"),
                    processHistory.getValue(0, "stateSequence"),
                    processos.getValue(i, "cardDocumentId"),
                    procesState.getValue(0, "stateName")
                ));
            }
        } else {
            dataset.addRow(new Array("Não existe Solicitações Abertas para esse processo."));
        }
    } catch (e) {
        dataset.addColumn("ERRO");
        dataset.addRow(new Array(e + " " + e.lineNumber));
    }

    return dataset;
}

function getAtividade(numProcesso, version, processId) {
    log.warn('--Arthur--getAtividade');
    log.warn('--Arthur--getAtividade Processo: ' + numProcesso + ' - ' + version);
    var c1 = DatasetFactory.createConstraint("processInstanceId", numProcesso, numProcesso, ConstraintType.MUST);
    var c2 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);
    var val = DatasetFactory.getDataset("processHistory", null, new Array(c1, c2), null);
    var result = new Array();
    if (val.rowsCount > 0) {
        var stateSequence = val.getValue(0, "stateSequence");
        log.warn('--Arthur--getAtividade stateSequence: ' + stateSequence);

        var c3 = DatasetFactory.createConstraint("version", version, version, ConstraintType.MUST);
        var c4 = DatasetFactory.createConstraint("sequence", stateSequence, stateSequence, ConstraintType.MUST);
        var c5 = DatasetFactory.createConstraint("processId", processId, processId, ConstraintType.MUST);
        var val2 = DatasetFactory.getDataset("processState", null, new Array(c3, c4, c5), null);
    
        result.push(val);
        result.push(val2);
        return result;
    } else {
        return false;
    }
}

// function getWebService(m) {

//     var ECMWorkflowEngine = ServiceManager.getService('ECMWorkflowEngineService');
//     log.warn("--Debbug-- ECMWorkflowEngine: " + ECMWorkflowEngine);
//     var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
//     log.warn("--Debbug-- serviceLocator: " + serviceLocator);
//     var service = serviceLocator.getWorkflowEngineServicePort();
//     log.warn("--Debbug-- service: " + serviceLocator);
//     var serviceObj = ECMWorkflowEngine.instantiate('net.java.dev.jaxb.array.ObjectFactory');
//     log.warn("--Debbug-- serviceObj: " + serviceObj);

//     if (m == 'getActualThread') {
//         var result = service.getActualThread("");
//     }

//     return result;
// }