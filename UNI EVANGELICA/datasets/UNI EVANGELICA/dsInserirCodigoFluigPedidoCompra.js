function createDataset(fields, constraints, sortFields) {

	log.warn("--Debbug-- dsReprovarItemPedidoCompra.js");

	var dataset = DatasetBuilder.newDataset();

	//Cria as colunas
	dataset.addColumn("RETORNO");
	dataset.addColumn("MENSAGEM");

	try {

		var ws = ServiceManager.getService('WSPROTHEUS');
		log.warn("--Debbug-- GRUPO DE PRODUTO: " + ws);
		//dataset.addRow(new Array('ws'));
		var serviceLocator = ws.instantiate('br.edu.unievangelica.compras2._8085.WSINTFLUIG');
		log.warn("--Debbug-- serviceLocator: " +serviceLocator);
		//dataset.addRow(new Array('serviceLocator'));
		var service = serviceLocator.getWSINTFLUIGSOAP();
		//dataset.addRow(new Array('service'));
		var objFactory = ws.instantiate('br.edu.unievangelica.compras2._8085.ObjectFactory');
		//dataset.addRow(new Array('objFactory'));
		var filtro = objFactory.createWSALTERARPEDIDOCOMPRA();
		//dataset.addRow(new Array('filtro'));

		log.warn("--Debbug-- filtro: " +filtro);
		log.warn("--Debbug-- constraints: " + constraints);
		log.warn("--Debbug-- constraints.length: " + constraints.length);

		if (constraints != null) {
			//dataset.addRow(new Array('constraints'));
			for (var c = 0; c < constraints.length; c++){
				if (constraints[c].fieldName == "CEMPRESA"){
					log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
					filtro.setCEMPRESA(constraints[c].initialValue);
				}
				if (constraints[c].fieldName == "CIDPROTHEUS"){
					filtro.setCIDPROTHEUS(constraints[c].initialValue);
					log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				}
				if (constraints[c].fieldName == "CGETIDFLUIG"){
					filtro.setCGETIDFLUIG(constraints[c].initialValue);
					log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				}
			}
		}

		log.warn("--Debbug-- filtro: " +filtro);

		var result = service.alterarPEDIDOCOMPRA(filtro);
		log.warn("--Debbug-- result: " +result);

		dataset.addRow(new Array(result.isLRET(), result.getCERROS()));

	} catch (erro){
		log.info("--Debbug-- erro: " +erro);
		log.info("--Debbug-- erro --linha: " +erro.lineNumber);
		dataset.addColumn("ERRO");
		dataset.addColumn("LINHA");
		dataset.addRow(new Array(
				"false",
				"",
				erro.toString(),
				erro.lineNumber.toString()
		));
	}

	return dataset;
}
