/*function createDataset(fields, constraints, sortFields) {

	log.warn("--Debbug-- DATASET CONSULTA RETENCAO");
	
	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CCODIGO");
    dataset.addColumn("CDESCRICAO");
      
    dataset.addRow( new Array('01', 'Retencao 1'));
    dataset.addRow( new Array('02', 'Retencao 2'));
    dataset.addRow( new Array('03', 'Retencao 3'));
    dataset.addRow( new Array('04', 'Retencao 4'));
    dataset.addRow( new Array('05', 'Retencao 5'));
    dataset.addRow( new Array('06', 'Retencao 6'));
    dataset.addRow( new Array('07', 'Retencao 7'));
    
    return dataset;
	
}*/
function createDataset(fields, constraints, sortFields) {

	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CCODIGO");
    dataset.addColumn("CDESCRICAO");
   
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7784.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7784.ObjectFactory');
	var ccusto = serviceCCusto.createCODRETENCAO();
	log.warn("--Debbug-- ccusto: " +ccusto);
	
	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	ccusto.setCCODGRUPO('03');
	ccusto.setCCODFILIAL('01');
	ccusto.setCCODRETENCAO('');
	
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CDESCRICAO"){
				log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);	
				ccusto.setCCODRETENCAO(constraints[c].initialValue);
			}			
		}
	}	
	
	log.warn("--Debbug-- ccusto.getCCODFILIAL: " +ccusto.getCCODFILIAL());
	
	log.warn("--Debbug-- ccusto.getCCODGRUPO: " +ccusto.getCCODGRUPO());
	
	log.warn("--Debbug-- ccusto.getCCODRETENCAO: " +ccusto.getCCODRETENCAO());
	
	try {
		
		var result = service.consultacodretencao(ccusto);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getACODRETENCAO().getSTRUCTRETCODRET().get(0).getCDESCRICAO());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getACODRETENCAO().getSTRUCTRETCODRET().size());
		
		for(var i=0;i<result.getACODRETENCAO().getSTRUCTRETCODRET().size();i++){
			
			var registro = result.getACODRETENCAO().getSTRUCTRETCODRET().get(i);		
			 //Cria os registros
				dataset.addRow(new Array(registro.getCCODIGO(), registro.getCDESCRICAO()));
			//}		     
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
	
    return dataset;	
}