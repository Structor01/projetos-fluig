function servicetask50(attempt, message) {
	var numProces = getValue("WKNumProces");
	var cardId = getValue("WKCardId");

  var cst1 = DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST);
	var cst2 = DatasetFactory.createConstraint("metadata#id", cardId, cardId, ConstraintType.MUST);

    var constraints = new Array(cst1, cst2);
    var datasetPrincipal = DatasetFactory.getDataset("dsFormSolicitacaoCompras", null, constraints, null);
    log.warn("--Debbug-- datasetPrincipal");
    log.warn("--Debbug-- numProces: "+numProces);
    log.warn("--Debbug-- cardId: "+cardId);
    log.warn("--Debbug-- datasetPrincipal.rowsCount: " +datasetPrincipal.rowsCount);

    if (datasetPrincipal.rowsCount > 0) {

   		var documentId = datasetPrincipal.getValue(0, "metadata#id");
   	    var documentVersion = datasetPrincipal.getValue(0, "metadata#version");
   	    var c1 = DatasetFactory.createConstraint("tablename", 'tablePedidoCompra', 'tablePedidoCompra', ConstraintType.MUST);
   	    var c2 = DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST);
   	    var c3 = DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST);

    	var constraintsFilho = new Array(c1, c2, c3);
    	var datasetFilho = DatasetFactory.getDataset("dsFormSolicitacaoCompras", null, constraintsFilho, null);

    	log.warn("--Debbug-- datasetFilho.rowsCount : " +datasetFilho.rowsCount);

    	if (datasetFilho.rowsCount > 0 ) {
    	   	var today = new Date();
    	   	var year = today.getFullYear();
    	   	var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    	   	var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    	   	var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    	   	var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    	   	var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    	   	var currentHour = hour + ":" + minute + ":" + second;
    	   	var currentDate = day + '/' + month + '/' + year;
    	   	var currentTime = currentDate + "  " + currentHour;

    	   	var comentario = 'Enviado via Solicitação Pedido de Compra: '+numProces;
    	    var idSolicitante = datasetPrincipal.getValue(0, "idSolicitante");

    	    var ECMWorkflowEngine = ServiceManager.getService('ECMWorkflowEngineService');
    	    log.warn("--Debbug-- ECMWorkflowEngine: " +ECMWorkflowEngine);
    	    var serviceLocator = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService');
    	    log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    	    var service = serviceLocator.getWorkflowEngineServicePort();
    	    var serviceObj= ECMWorkflowEngine.instantiate('net.java.dev.jaxb.array.ObjectFactory');
    	    var serviceAttArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray');
    	    var serviceTaskArray = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray');
    	    var colleague = serviceObj.createStringArray();

    	    	for (var j = 0; j < datasetFilho.rowsCount; j++) {
        	    	var cardData = serviceObj.createStringArrayArray();

        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('numeroSolicitacaoProtheus');
        	    	campos.getItem().add(datasetPrincipal.getValue(0, "solicitacaoCompra"));
        	    	cardData.getItem().add(campos);

        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('numeroPedidoProtheus');
        	    	campos.getItem().add(datasetFilho.getValue(j, "pedidoCompra"));
        	    	cardData.getItem().add(campos);

        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('dataAbertura');
        	    	campos.getItem().add(currentTime);
        	    	cardData.getItem().add(campos);

        	    	log.warn("--Debbug-- matriculaSolicitante: "+datasetPrincipal.getValue(0, "matriculaSolicitante"));
        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('matriculaSolicitante');
        	    	campos.getItem().add(datasetPrincipal.getValue(0, "matriculaSolicitante"));
        	    	cardData.getItem().add(campos);

        	    	log.warn("--Debbug-- nomeSolicitante: "+datasetPrincipal.getValue(0, "nomeSolicitante"));
        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('nomeSolicitante');
        	    	campos.getItem().add(datasetPrincipal.getValue(0, "nomeSolicitante"));
        	    	cardData.getItem().add(campos);

        	    	log.warn("--Debbug-- idSolicitante: "+idSolicitante);
        	    	var campos = serviceObj.createStringArray();
        	    	campos.getItem().add('idSolicitante');
        	    	campos.getItem().add(idSolicitante);
        	    	cardData.getItem().add(campos);

        	    	try {
        	    		var result = service.startProcess('vinicius.anogueira@gmail.com', 'Tipo1234@', 1, 'PedidoDeCompra', 5, colleague, comentario, idSolicitante, true, serviceAttArray, cardData, serviceTaskArray, false);

        	    		if (result.getItem().size() > 0) {
        	    			if (result.getItem().get(0).getItem().get(0) == 'ERROR') {
        	    				throw 'Erro na geração da Solicitação de Pedido de Compra ' + datasetFilho.getValue(j, "pedidoCompra")+': '+erro.message+'. Favor verificar.';
        	    			} else {
        	    			for (var a = 0; a < result.getItem().size(); a++) {
        	    	    		if (result.getItem().get(a).getItem().get(0) == 'iProcess') {
                	    	    	var childData = new java.util.HashMap();
                    	    	    childData.put("histUsuario", datasetPrincipal.getValue(0, "nomeSolicitante"));
                    	    	    childData.put("histData", currentTime);
                    	    	    childData.put("histStatus", 'Solicitação de Pedido de Compra criada.');
                    	    	    childData.put("histInt", 'Solicitação /'+result.getItem().get(a).getItem().get(1)+'.');
                    	    		hAPI.addCardChild('tableHistorico', childData);
            	    	    	}
            	    	    }
        	    			}
        	    		}
        	    	} catch (erro) {
        	    		log.warn("--Debbug-- erro: " +erro);
        	    		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
        	    		throw 'Erro na geração da Solicitação de Pedido de Compra: '+erro.message+'. Favor verificar.';
        	    	}

        	    }

    	    } else {
    	    	throw 'Solicitação de Compra sem Pedido de Compra gerado. Favor verificar.';
    	    }
    } else {
    	throw 'Não encontrado o formulário Id: ' + cardId + ' da Solicitação de Compras - ' + numProces +'.';
    }

	return true;
}
