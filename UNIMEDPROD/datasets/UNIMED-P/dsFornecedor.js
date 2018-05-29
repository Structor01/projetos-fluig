function createDataset(fields, constraints, sortFields) {
	log.warn("--Debbug-- DS Consulta Fornecedor Protheus: " +listaEmpresas);
	var dataset = DatasetBuilder.newDataset();
    
    //Cria as colunas
    dataset.addColumn("CCODIGO");
    dataset.addColumn("CLOJA");
    dataset.addColumn("CNOME");
    dataset.addColumn("CFANTASIA");
    dataset.addColumn("CDDD");
    dataset.addColumn("CTELEFONE");
    dataset.addColumn("CCONTATO");
    dataset.addColumn("CBANCO");
    dataset.addColumn("CAGENCIA");
    dataset.addColumn("CDIGAGENCIA");
    dataset.addColumn("CCONTA");
    dataset.addColumn("CDIGCONTA");
    dataset.addColumn("CSTATUS");
    //Cria os registros
    var rateio = new java.util.HashMap();
    var arrayRateio = new java.util.HashMap();
    
    rateio.put('teste1', '123456');
    rateio.put('teste2', '789456');
    arrayRateio.put('teste98', '123456');
    arrayRateio.put('teste99', '123456');

    rateio.put('array', arrayRateio);
    
    log.warn("--Debbug-- rateio: " +rateio);    
    log.dir(rateio);
    log.warn("--Debbug-- array: " +arrayRateio);
    log.dir(arrayRateio);    
    

    if ( rateio.containsKey( 'array' ) ){
    	var teste = rateio.get('array');    	
    	log.warn("--Debbug-- rateio get: "+rateio.get('array'));
    	log.warn("--Debbug-- teste: "+teste);
//    	log.warn("--Debbug-- teste[0]: "+teste[0]);
    	log.dir(teste);
    	var keyset = teste.keySet();
    	log.warn("--Debbug-- keyset: "+keyset);
    	log.dir(keyset);
    	//log.warn("--Debbug-- keyset: "+keyset[0]);
    	
    	for (var prop in teste.keySet()) {
    		log.warn("--Debbug-- prop: "+prop);

    		}    	
    	
    	teste.keySet().toArray().forEach(function(item, index){
    		log.warn("--Debbug-- item: "+item);
    		log.warn("--Debbug-- teste.get: "+teste.get(item));
    	});
    	
/*    	for (let value of keySet) {
    		var dados = teste.get(value);
    		log.warn("--Debbug-- value: "+value);
    		log.warn("--Debbug-- dados: "+dados);
    	}*/
    	
    }
    
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');
	var forn = serviceCCusto.createFORNECEDOR();
	log.warn("--Debbug-- forn: " +forn);
	forn.setCCODFILIAL('01');
	forn.setCCNPJCPF('');
	forn.setCCODGRUPO('03');
	
	log.warn("--Debbug-- constraints: " + constraints);
	log.warn("--Debbug-- constraints.length: " + constraints.length);
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CCODIGO"){
				log.warn("--Debbug-- CFILEMP: " + constraints[c].initialValue);	
				forn.setCCODFILIAL(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == "CCNPJCPF"){
				log.warn("--Debbug-- CCNPJCPF: " + constraints[c].initialValue);	
				forn.setCCNPJCPF(constraints[c].initialValue);
			}
			
		}
	}
	
	log.warn("--Debbug-- forn.getCCODFILIAL: " +forn.getCCODFILIAL());
	log.warn("--Debbug-- forn.getCCODGRUPO: " +forn.getCCODGRUPO());
	log.warn("--Debbug-- forn.getCCNPJCPF: " +forn.getCCNPJCPF());	
	
	try {
		
		var result = service.consultafornecedores(forn);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		//log.warn("--Debbug-- qt registros retornados: " + result.getAFORNECEDORES().getSTRUCTRETFORNECEDORES().get(0).getCNOME());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getAFORNECEDORES().getSTRUCTRETFORNECEDORES().size());
		var status = '';
		
		for(var i=0;i<result.getAFORNECEDORES().getSTRUCTRETFORNECEDORES().size();i++){
			
			var registro = result.getAFORNECEDORES().getSTRUCTRETFORNECEDORES().get(i);		
			 //Cria os registros
			status = (registro.isLSTATUS()) ? 'Ativo' : 'Bloqueado';
			
		    dataset.addRow(
		    new Array(registro.getCCODIGO(), 
		    		  registro.getCLOJA(),
		    		  registro.getCNOME(),
		    		  registro.getCFANTASIA(),
		    		  registro.getCDDD(),
		    		  registro.getCTELEFONE(),
		    		  registro.getCCONTATO(),
		    		  registro.getCBANCO(),
		    		  registro.getCAGENCIA(),
		    		  registro.getCDIGAGENCIA(),
		    		  registro.getCCONTA(),
		    		  registro.getCDIGCONTA(),
		    		  status)
		    );
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
	
}