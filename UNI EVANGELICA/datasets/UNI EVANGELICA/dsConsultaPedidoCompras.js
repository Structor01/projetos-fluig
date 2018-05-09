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
			if (constraints[c].fieldName == "CIDINICIALPEDIDO"){
				log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				filtro.setCIDINICIALPEDIDO(constraints[c].initialValue);
			}
		}
	}

	try {

		var result = service.consultaPEDIDOSDECOMPRA(filtro);
		log.warn("--Debbug-- result: " +result);

		var pedidoCompra = result.getAIDSPEDIDOS().getWSIDSPEDIDOSCOMPRA().get(0).getAITENSPEDIDO().getWSITENSPEDIDOCOMPRA();

		if(pedidoCompra.size() > 0) {

			//Cria as colunas
			dataset.addColumn("CIDINISOLPROTHEUS");
			dataset.addColumn("CSTATUS");
			dataset.addColumn("CCODCCUSTO");
			dataset.addColumn("CDESCCCUSTO");
			dataset.addColumn("CDESCPRODUTO");
			dataset.addColumn("CITEM");
			dataset.addColumn("CPRODUTO");
			dataset.addColumn("CUM");
			dataset.addColumn("NDESCONTO1");
			dataset.addColumn("NDESCONTO2");
			dataset.addColumn("NDESCONTO3");
			dataset.addColumn("NDESCONTOTOTAL");
			dataset.addColumn("NPRECO");
			dataset.addColumn("NQTDENTREGUE");
			dataset.addColumn("NQUANTIDADE");
			dataset.addColumn("NTOTAL");
			dataset.addColumn("FRETE");
			dataset.addColumn("CENTRADA1");
			dataset.addColumn("CENTRADA2");
			dataset.addColumn("CENTRADA3");
			dataset.addColumn("CUM1");
			dataset.addColumn("CUM2");
			dataset.addColumn("CUM3");
			dataset.addColumn("NQUANT1");
			dataset.addColumn("NQUANT2");
			dataset.addColumn("NQUANT3");
			dataset.addColumn("NVUNIT1");
			dataset.addColumn("NVUNIT2");
			dataset.addColumn("NVUNIT3");
			dataset.addColumn("MOTIVO");

			for(var i=0; i < pedidoCompra.size() ; i++){

				var registro = pedidoCompra.get(i);
				//Cria os registros
				dataset.addRow(new Array(
						'hg',
						registro.getCSTATUS(),
						registro.getCCODCCUSTO(),
						registro.getCDESCCCUSTO(),
						registro.getCDESCPRODUTO(),
						registro.getCITEM(),
						registro.getCPRODUTO(),
						registro.getCUM(),
						registro.getNDESCONTO1(),
						registro.getNDESCONTO2(),
						registro.getNDESCONTO3(),
						registro.getNVLDESC(),
						registro.getNPRECO(),
						registro.getNQTDENTREGUE(),
						registro.getNQUANTIDADE(),
						registro.getNTOTAL(),
						registro.getNVLFRETE(),
						registro.getCENTRADA1(),
						registro.getCENTRADA2(),
						registro.getCENTRADA3(),
						registro.getCUM1(),
						registro.getCUM2(),
						registro.getCUM3(),
						registro.getNQUANT1(),
						registro.getNQUANT2(),
						registro.getNQUANT3(),
						registro.getNVUNIT1(),
						registro.getNVUNIT2(),
						registro.getNVUNIT3(),
						registro.getCMOTIVO()
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
