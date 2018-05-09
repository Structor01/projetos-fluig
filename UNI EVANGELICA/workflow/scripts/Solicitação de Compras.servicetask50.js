function servicetask50(attempt, message) {
	var nSol = hAPI.getCardValue("solicitacaoCompra");
	var c1 = DatasetFactory.createConstraint("NUMEROSOLICITACAO", nSol, nSol, ConstraintType.MUST);
	var pedidosdaSol = DatasetFactory.getDataset("dsConsultaPedidosDaSolicitacao", null, new Array(c1), null);
	log.warn("--Debbug-- DATASET SERVICETASK50 = " + pedidosdaSol);
	var idSolicitante = hAPI.getCardValue("idSolicitante");
	// var idSolicitante = "010101";
	log.warn("-- Debbug ID Sol. " + idSolicitante);
	// "System:Auto"
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

	// Adicionar Histórico de Pedidos Gerados no formulário Solicitação de Compras.
	if(pedidosdaSol.rowsCount > 0) {
		for(var i=0; i < pedidosdaSol.rowsCount; i++) {
			var codigoPedidoProtheus = pedidosdaSol.getValue(i, "NUMEROPEDIDODECOMPRA");
			var codigoSolicitacaoProtheus = pedidosdaSol.getValue(i, "NUMEROSOLICITACAO");
			var filialEntrega = hAPI.getCardValue('zoomFilialEntrega');

			try {
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
				campo.setKey('numeroPedidoProtheus');
				campo.setValue(codigoPedidoProtheus);
				cardData.getItem().add(campo);
				var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
				campo.setKey('numeroSolicitacaoProtheus');
				campo.setValue(codigoSolicitacaoProtheus);
				cardData.getItem().add(campo);
				var campo = ECMWorkflowEngine.instantiate('com.totvs.technology.ecm.workflow.ws.KeyValueDto');
				campo.setKey('localEntrega');
				campo.setValue(filialEntrega);
				
				cardData.getItem().add(campo);
				colleagueIni.getItem().add("System:Auto");
				var result = service.startProcessClassic("arthur.barros@totvs.com.br", "3009Artfbgyn@", 1, "PedidoDeCompra", 0, colleagueIni, "Iniciado Automaticamente", idSolicitante, true, serviceAttArray, cardData,serviceTaskArray,false);

				log.warn('--Debbug-- Result: ' + result);
				log.warn('--Debbug-- Result ID: '+ result.getItem().get(4).getValue());
				log.warn('--Debbug-- Result Key: '+ result.getItem().get(4).getKey());

				var c1 = DatasetFactory.createConstraint('CGETIDFLUIG',result.getItem().get(4).getValue(), result.getItem().get(4).getValue(), ConstraintType.MUST);
				var c2 = DatasetFactory.createConstraint('CIDPROTHEUS', codigoPedidoProtheus, codigoPedidoProtheus, ConstraintType.MUST);
				var datasetDsConsultaPedidosDaSolicitacao = DatasetFactory.getDataset('dsInserirCodigoFluigPedidoCompra', null, new Array(c1, c2), null);

				var childData = new java.util.HashMap();
				childData.put("nPedido", pedidosdaSol.getValue(i, 'NUMEROPEDIDODECOMPRA'));
				childData.put("nSolFluig",  result.getItem().get(4).getValue());
				childData.put("descPedido", 'Pedido Gerado no Protheus');
				childData.put("dataPedido", currentTime);
				hAPI.addCardChild('tablePedidoCompra', childData);

			} catch(err) {
				log.warn('-- DEBBUG SOLCOMPRAS TASK 50: '+ err);
				log.warn('-- DEBBUG SOLCOMPRAS TASK 50 Linha: ' + err.lineNumber);
			}
		}
	} else {
		log.warn('-- DEBBUG SOLCOMPRAS TASK 50: Não há pedidos de compras no dataset.');
	}

	return true;
}
