function createDataset(fields, constraints, sortFields) {

	log.info("--Debbug-- dsPedidoCompraCabecalho.js");

	var dataset = DatasetBuilder.newDataset();
	var ws = ServiceManager.getService('WSPROTHEUS');
	var serviceLocator;
	var objFactory;

	try {
		log.warn('Tentativa 1');
		serviceLocator = ws.instantiate('br.edu.unievangelica.compras2._8085.WSINTFLUIG');
		objFactory= ws.instantiate('br.edu.unievangelica.compras2._8085.ObjectFactory');
	} catch(err){
		try{
			log.warn('Tentativa 1 Erro!');
			log.warn('Tentativa 2');
			serviceLocator = ws.instantiate('_111._16._16._172._8085.WSINTFLUIG');
			objFactory= ws.instantiate('_111._16._16._172._8085.ObjectFactory');
		}catch(err2) {
			log.warn('Tentativa 2 Erro!');
		}
	}

	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
	var service = serviceLocator.getWSINTFLUIGSOAP();

	var filtro = objFactory.createWSFILTRODEPEDIDOSCOMPRA();
	log.warn("--Debbug-- filtro: " +filtro);

	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CIDINISOLPROTHEUS"){
				log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				filtro.setCIDINISOLPROTHEUS(constraints[c].initialValue);
			}
		}
	}

	try {

		var result = service.consultaPEDIDOSDECOMPRA(filtro);
		log.warn("--Debbug-- result: " +result);

		var cabecalho = result.getAIDSPEDIDOS().getWSIDSPEDIDOSCOMPRA();

		if (cabecalho.size()){

			//Cria as colunas
			dataset.addColumn("CIDINISOLPROTHEUS");
			dataset.addColumn("CCODCONDICAO");
			dataset.addColumn("CCODFORNECEDOR");
			dataset.addColumn("CCONTATO");
			dataset.addColumn("CDESCCONDICAO");
			dataset.addColumn("CEMISSAO");
			dataset.addColumn("CFILENTREGA");
			dataset.addColumn("CFILSOLICITAN");
			dataset.addColumn("CIDPEDIDO");
			dataset.addColumn("CIDSOLFLUIG");
			dataset.addColumn("CIDSOLICITACAO");
			dataset.addColumn("CNOMEFORNECEDOR");
			dataset.addColumn("CIDCOTACAO");
			dataset.addColumn("CJUSTIFICATIVA");
			dataset.addColumn("CLINK");


			for(var i=0; i < cabecalho.size() ; i++){

				var registro = cabecalho.get(i);
				//Cria os registros
				dataset.addRow(new Array(
						'hg',
						registro.getCCODCONDICAO(),
						registro.getCCODFORNECEDOR(),
						registro.getCCONTATO(),
						registro.getCDESCCONDICAO(),
						registro.getCEMISSAO(),
						registro.getCFILENTREGA(),
						registro.getCFILSOLICITAN(),
						registro.getCIDPEDIDO(),
						registro.getCIDSOLFLUIG(),
						registro.getCIDSOLICITACAO(),
						registro.getCNOMEFORNECEDOR(),
						registro.getCIDCOTACAO(),
						registro.getCJUSTIFICATIVA(),
						registro.getCLINKIMGS()
				));
			}
		}

	} catch (erro){
		log.info("--Debbug-- erro: " +erro);
		log.info("--Debbug-- erro --linha: " +erro.lineNumber);
		dataset.addColumn("ERRO");
		dataset.addColumn("LINHA");
		dataset.addRow(new Array(
				erro.toString(),
				erro.lineNumber.toString()
		));
	}
	return dataset;
}
