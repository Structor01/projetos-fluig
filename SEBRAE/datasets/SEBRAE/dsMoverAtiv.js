function defineStructure() {

}
function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {
    var dataset = DatasetBuilder.newDataset();

    var sol = false;
    var threadSequence = 0;
    var thread = false;
    var recebeUser = false;
    var execUser = false;
    var userDest = '';
    var comment = "";

    if (constraints != null) {
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].fieldName == "Solicitação") {
                sol = constraints[i].initialValue;
                log.warn("--Debbug-- Solicitação = " + sol);
            }
            if (constraints[i].fieldName == "Sequencia") {
                threadSequence = constraints[i].initialValue;
                log.warn("--Debbug-- Sequencia = " + threadSequence);
            }
            if (constraints[i].fieldName == "Atividade") {
                thread = constraints[i].initialValue;
                log.warn("--Debbug-- Thread = " + thread);
            }
            if (constraints[i].fieldName == "Usuário Executor") {
                execUser = constraints[i].initialValue;
                log.warn("--Debbug-- execUser = " + execUser);
            }
            if (constraints[i].fieldName == "Usuário Destino") {
                userDest = constraints[i].initialValue;
                log.warn("--Debbug-- userDest = " + userDest);
            }
            if (constraints[i].fieldName == "Comentário") {
                comment = constraints[i].initialValue;
                log.warn("--Debbug-- comment = " + comment);
            }
        }
    }

    try {
        log.warn('--Arthur dsMoverAtividade.js');
        if (!sol || !thread || !execUser) throw "Preencha todos os parametros!";
        log.warn('--Arthur dsMoverAtividade.js Todas Contraints: Sol=' + sol + ' atual=' + thread + ' threadSequence=' + threadSequence);

        var ECMWorkflowEngine = ServiceManager.getService('WorkflowEngineService');
        log.warn("--Debbug-- ECMWorkflowEngine: " + ECMWorkflowEngine);
        var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
        log.warn("--Debbug-- serviceLocator: " + serviceLocator);
        var service = serviceLocator.getWorkflowEngineServicePort();
        log.warn("--Debbug-- service: " + serviceLocator);
        var serviceObj = ECMWorkflowEngine.instantiate('net.java.dev.jaxb.array.ObjectFactory');
        log.warn("--Debbug-- serviceObj: " + serviceObj);
        var serviceAttArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
        log.warn("--Debbug-- serviceAttArray: " + serviceAttArray);
        var serviceTaskArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');
        log.warn("--Debbug-- serviceTaskArray: " + serviceTaskArray);
        var colleagueIni = serviceObj.createStringArray();
        if(userDest == '') userDest = "System:Auto"
        colleagueIni.getItem().add(userDest);
        var cardData = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');

        var result = service.saveAndSendTaskClassic(
            'arthur.barros@totvs.com.br',
            '3009Artfbgyn@',
            1,
            parseInt(sol),
            thread, 
            colleagueIni, 
            comment, 
            execUser, 
            true, 
            serviceAttArray, 
            cardData, 
            serviceTaskArray, 
            true, 
            threadSequence);

        // log.warn("--Arthur dsMoverAtividade.js result: " + result.getItem().get(0).getValue());

        // dataset.addRow(new Array(
        //     sol,
        //     thread,
        //     threadSequence,
        //     execUser,
        //     result.getItem().get(3).getValue(),
        //     comment,
        //     result.getItem().get(0).getKey(),
        //     result.getItem().get(0).getValue()
        // ));

    } catch (e) {
        dataset.addColumn("Erro");
        dataset.addColumn("Linha");

        dataset.addRow(new Array(e, e.lineNumber));
    }

    return dataset;
}

function onMobileSync(user) {

}