function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CNATUREZA");
    dataset.addColumn("CDESCRICAO");
    dataset.addColumn("CCONTACONTABIL");
      
    //Cria os registros
    
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');
	var ntrza = serviceCCusto.createNATUREZA();
	log.warn("--Debbug-- ntrza: " +ntrza);
	
	ntrza.setCCODGRUPO('03');
	ntrza.setCCODFILIAL('01');
	ntrza.setCNATUREZA('');
	
	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CCODIGO"){
				log.warn("--Debbug-- CCODIGO: " + constraints[c].initialValue);	
				ntrza.setCCODFILIAL(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == "CNATUREZA"){
				log.warn("--Debbug-- CNATUREZA: " + constraints[c].initialValue);	
				ntrza.setCNATUREZA(constraints[c].initialValue);
			}
		}
	}	
	
	log.warn("--Debbug-- ntrza.getCCODFILIAL: " +ntrza.getCCODFILIAL());
	log.warn("--Debbug-- ntrza.getCCODGRUPO: " +ntrza.getCCODGRUPO());
	log.warn("--Debbug-- ntrza.getCNATUREZA: " +ntrza.getCNATUREZA());	
	
	try {
		
		var result = service.consultanatureza(ntrza);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getANATUREZA().getSTRUCTRETNATUREZA().get(0).getCDESCRICAO());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getANATUREZA().getSTRUCTRETNATUREZA().size());
		var status = '';
		
		for(var i=0;i<result.getANATUREZA().getSTRUCTRETNATUREZA().size();i++){
			
			var registro = result.getANATUREZA().getSTRUCTRETNATUREZA().get(i);		
			 //Cria os registros
			
		    dataset.addRow(
		    new Array(registro.getCNATUREZA(), 
		    		  registro.getCDESCRICAO(),
		    		  registro.getCCONTACONTABIL())
		    );
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
	
}