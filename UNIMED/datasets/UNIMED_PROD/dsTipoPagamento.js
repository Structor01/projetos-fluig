function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CCODIGO");
    dataset.addColumn("CDESCRICAO");

    //Cria os registros
    
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');
	var fpagto = serviceCCusto.createFORMAPAGAMENTO();
	
	fpagto.setCCODGRUPO('03');
	fpagto.setCCODFILIAL('01');
	fpagto.setCFORMAPAG('');
	
	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CCODIGO"){
				log.warn("--Debbug-- CCODIGO: " + constraints[c].initialValue);	
				fpagto.setCCODFILIAL(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == "CDESCRICAO"){
				log.warn("--Debbug-- CDESCRICAO: " + constraints[c].initialValue);	
				fpagto.setCFORMAPAG(constraints[c].initialValue);
			}
		}
	}
	
	log.warn("--Debbug-- fpagto: " +fpagto);
	log.warn("--Debbug-- fpagto.getCCODFILIAL: " +fpagto.getCCODFILIAL());
	log.warn("--Debbug-- fpagto.getCCODGRUPO: " +fpagto.getCCODGRUPO());
	log.warn("--Debbug-- fpagto.getCFORMAPAG: " +fpagto.getCFORMAPAG());	
	
	try {
		
		var result = service.consultaformapagamento(fpagto);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getAFORMASPAG().getSTRUCTRETFORMASPAG().get(0).getCDESCRICAO());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getAFORMASPAG().getSTRUCTRETFORMASPAG().size());
		
		for(var i=0;i<result.getAFORMASPAG().getSTRUCTRETFORMASPAG().size();i++){
			
			var registro = result.getAFORMASPAG().getSTRUCTRETFORMASPAG().get(i);		
			 //Cria os registros
		    dataset.addRow(new Array(registro.getCCODIGO(), registro.getCDESCRICAO()));
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
	
}