function createDataset(fields, constraints, sortFields) {

	log.info("--Debbug-- dsConsultaHistoricoCotacao.js");
	var dataset = DatasetBuilder.newDataset();

	var ws = ServiceManager.getService('WSPROTHEUS');
	var serviceLocator;
	var objFactory;

	try{
		serviceLocator = ws.instantiate('br.edu.unievangelica.compras2._8085.WSINTFLUIG');
		objFactory = ws.instantiate('br.edu.unievangelica.compras2._8085.ObjectFactory');
	}catch(err){
		try{
			serviceLocator = ws.instantiate('_111._16._16._172._8085.WSINTFLUIG');
			objFactory = ws.instantiate('_111._16._16._172._8085.ObjectFactory');
		}catch(erro){}
	}

	var service = serviceLocator.getWSINTFLUIGSOAP();
	var filtro = objFactory.createWSFILTRODEPEDIDOSCOMPRA();
	log.info("--Debbug-- filtro: " +filtro);

	log.info("--Debbug-- constraints: " + constraints);
	log.info("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CIDINISOLPROTHEUS"){
				log.info("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
				filtro.setCIDINISOLPROTHEUS(constraints[c].initialValue);
			}
		}
	}

	log.info("--Debbug-- filtro: " + filtro);

	try {

		var result = service.consultaPEDIDOSDECOMPRA(filtro);
		log.info("--Debbug-- result: " +result);

		var historico = result.getAIDSPEDIDOS().getWSIDSPEDIDOSCOMPRA().get(0).getAHISTORICODACOTACAO().getWSHISTORICODACOTACAO();

		if(historico.size() > 0){

			//Cria as colunas
			dataset.addColumn("CCOND");
			dataset.addColumn("CDESCPRODUTO");
			dataset.addColumn("CFORNECEDOR");
			dataset.addColumn("CITEMCO");
			dataset.addColumn("CITEMSC");
			dataset.addColumn("CPRODUTO");
			dataset.addColumn("NPRAZO");
			dataset.addColumn("NQUANT");
			dataset.addColumn("NTOTAL");
			dataset.addColumn("NVUNIT");

			for(var i=0; i < historico.size() ; i++){

				var registro = historico.get(i);
				//Cria os registros
				dataset.addRow(new Array(
						registro.getCDESCCOND(),
						registro.getCDESCPRODUTO(),
						registro.getCFORNECEDOR(),
						registro.getCITEMCO(),
						registro.getCITEMSC(),
						registro.getCPRODUTO(),
						registro.getNPRAZO(),
						registro.getNQUANT(),
						registro.getNTOTAL(),
						registro.getNVUNIT()
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
		return dataset;
	}

	return dataset;
}
