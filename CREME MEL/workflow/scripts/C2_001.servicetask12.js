function servicetask12(attempt, message) {
	var numProces = getValue("WKNumProces");
	var cardId = getValue("WKCardId");
	var idSolicitante = hAPI.getCardValue('matricula');

	var c1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("metadata#id", cardId, cardId, ConstraintType.MUST);

	var constraintsPai = new Array(c1, c2);
	var datasetPai = DatasetFactory.getDataset("dsPlanoAcao", null, constraintsPai, null);

	if (datasetPai.rowsCount > 0) {
		var documentId = datasetPai.getValue(0, "metadata#id");
		var documentVersion = datasetPai.getValue(0, "metadata#version");

		var c1 = DatasetFactory.createConstraint("tablename", 'itemPlano', 'itemPlano', ConstraintType.MUST);
		var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
		var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

		var constraintsFilho = new Array(c1, c2, c3);
		var datasetFilho = DatasetFactory.getDataset("dsPlanoAcao", null, constraintsFilho, null);
		if (datasetFilho.rowsCount > 0) {
			var nSol = "nsol";
			for(var i=0; i < datasetFilho.rowsCount; i++){
				try{
					var ECMWorkflowEngine = ServiceManager.getService('ECMWorkflowEngineService');
					log.warn("--Debbug-- ECMWorkflowEngine: " +ECMWorkflowEngine);
					var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
					log.warn("--Debbug-- serviceLocator: " +serviceLocator);
					var service = serviceLocator.getWorkflowEngineServicePort();
					log.warn("--Debbug-- service: " +serviceLocator);
					var serviceObj= ECMWorkflowEngine.instantiate('net.java.dev.jaxb.array.ObjectFactory');
					log.warn("--Debbug-- serviceObj: " +serviceObj);
					var serviceAttArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
					var serviceTaskArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');
					var colleagueIni = serviceObj.createStringArray();
					var cardData = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDtoArray');
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('matricula');
					campo.setValue(datasetFilho.getValue(i, 'resp_id'));
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('nSol');
					campo.setValue(numProces);
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('causa');
					campo.setValue(datasetFilho.getValue(i, 'causa'));
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('acao');
					campo.setValue(datasetFilho.getValue(i, 'acao'));
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('setor');
					campo.setValue(datasetFilho.getValue(i, 'setor'));
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('titulo');
					campo.setValue(datasetPai.getValue(0, 'titulo'));
					cardData.getItem().add(campo);
					var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
					campo.setKey('obsSol');
					campo.setValue(datasetFilho.getValue(i, 'obsSol'));
					cardData.getItem().add(campo);
					colleagueIni.getItem().add(datasetFilho.getValue(i, 'resp_id'));
					var result = service.startProcessClassic("arthurbarros", "Totvs@123", 1, "C2_0002", 0, colleagueIni, "Iniciado Automaticamente", idSolicitante, true, serviceAttArray, cardData,serviceTaskArray, true);
					log.warn('--Debbug-- Result: ' + result);
					log.warn('--Debbug-- Result ID: '+ result.getItem().get(4).getValue());
					log.warn('--Debbug-- Result Key: '+ result.getItem().get(4).getKey());
					nSol += "," + result.getItem().get(4).getValue();
					hAPI.setCardValue('nSol', nSol);
				} catch(e) {
					throw "Erro na linha: " + e.lineNumber + " " + e;
					log.warn('--Debbug-- Erro: ' + e);
				}
			}
		} else {
			throw "Solicitação não existe!";
		}
	}

	return true;
}
