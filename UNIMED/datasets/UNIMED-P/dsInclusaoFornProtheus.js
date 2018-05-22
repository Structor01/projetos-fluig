function createDataset(fields, constraints, sortFields) {

	log.warn("--Debbug-- DATASET INCLUSAO DE FORNECEDOR");
	
	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CCODIGO");
    dataset.addColumn("CERRO");
    dataset.addColumn("CNOME");
    dataset.addColumn("LSTATUS");
      
    //Cria os registros
    
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');

	var forn = serviceCCusto.createLISTAINCFORNECEDORES();
	var arrayForn = serviceCCusto.createARRAYOFSTRUCTINCFORNECEDORES();
	var structForn = serviceCCusto.createSTRUCTINCFORNECEDORES();

	log.warn("--Debbug-- forn: " +forn);
	log.warn("--Debbug-- forn: " +structForn);
	
	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){

			if (constraints[c].fieldName == 'A2CGC'){
				log.warn("--Debbug-- A2CGC: " + constraints[c].initialValue);
				structForn.setCCGC(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2COD'){	
				log.warn("--Debbug-- A2COD: " + constraints[c].initialValue);
				forn.setCCODGRUPO(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == 'A2LOJA'){		
				log.warn("--Debbug-- A2LOJA: " + constraints[c].initialValue);
				forn.setCCODFILIAL(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2TIPO'){
				log.warn("--Debbug-- A2TIPO: " + constraints[c].initialValue);
				structForn.setCTIPO(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == 'A2NOME'){		
				log.warn("--Debbug-- A2NOME: " + constraints[c].initialValue);
				structForn.setCNOME(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2NREDUZ'){	
				log.warn("--Debbug-- A2NREDUZ: " + constraints[c].initialValue);
				structForn.setCNOMEFANTASIA(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2END'){
				log.warn("--Debbug-- A2END: " + constraints[c].initialValue);
				structForn.setCENDERECO(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2BAIRRO'){
				log.warn("--Debbug-- A2BAIRRO: " + constraints[c].initialValue);
				structForn.setCBAIRRO(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2CODMUN'){
				log.warn("--Debbug-- A2CODMUN: " + constraints[c].initialValue);
				structForn.setCCODMUNICIPIO(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2EST'){	
				log.warn("--Debbug-- A2EST: " + constraints[c].initialValue);
				structForn.setCESTADO(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2DDD'){
				log.warn("--Debbug-- A2DDD: " + constraints[c].initialValue);
				structForn.setCDDD(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2TELEFONE'){
				log.warn("--Debbug-- A2TELEFONE: " + constraints[c].initialValue);
				structForn.setCTELEFONE(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2CEP'){
				log.warn("--Debbug-- A2CEP: " + constraints[c].initialValue);
				structForn.setCCEP(constraints[c].initialValue)
			}
			if (constraints[c].fieldName == 'A2CONTATO'){
				log.warn("--Debbug-- A2CONTATO: " + constraints[c].initialValue);
				structForn.setCCONTATO(constraints[c].initialValue)
			}
		}
	}

	forn.setCCODFILIAL('01');
	forn.setCCODGRUPO('03');
	structForn.setCOPERACAO('I');
	
	/*structForn.setCBAIRRO('JARDIM ATLANTICO')
	structForn.setCCEP('74343030')
	structForn.setCCGC('22148761030')
	structForn.setCCODMUNICIPIO('08707')
	structForn.setCCONTATO('TESTE')
	structForn.setCDDD('062')
	structForn.setCENDERECO('RUA DO BADEJO')
	structForn.setCESTADO('GO')
	structForn.setCNOME('TESTE')
	structForn.setCNOMEFANTASIA('TESTE')
	structForn.setCOPERACAO('I')
	structForn.setCTELEFONE('99999999')
	structForn.setCTIPO('F')*/
	
	arrayForn.getSTRUCTINCFORNECEDORES().add(structForn);
	
	forn.setAINCFORNECEDORES(arrayForn);			
	
	try {
		
		var result = service.cadastrafornecedor(forn);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getAINCFORNECEDORES().getSTRUCTINCRETFORNECEDORES().get(0).getCNOME());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getAINCFORNECEDORES().getSTRUCTINCRETFORNECEDORES().size());
		var status = '';
		
		for(var i=0;i<result.getAINCFORNECEDORES().getSTRUCTINCRETFORNECEDORES().size();i++){
			
			var registro = result.getAINCFORNECEDORES().getSTRUCTINCRETFORNECEDORES().get(i);		
			 //Cria os registros
			status = (registro.isLSTATUS()) ? 'Ativo' : 'Bloqueado';
			
		    dataset.addRow(
		    new Array(registro.getCCODIGO(),
		    		registro.getCERRO(),
		    		registro.getCNOME(),
		    		status)
		    );
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
	
}