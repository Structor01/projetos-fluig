function defineStructure() {
    log.info("--OFFLINE-- defineStructure");

    addColumn("CCODIGO");
    addColumn("CDESCRICAO");

    log.info("--OFFLINE-- defineStructure addColumn");
    setKey(new Array( "CCODIGO"));
    addIndex(new Array( "CCODIGO"));

    log.info("--OFFLINE-- defineStructure FIM");
}

function onSync(lastSyncDate){
    log.info("--OFFLINE-- onSync ");

    var dataset = DatasetBuilder.newDataset();
    log.info("--OFFLINE-- dataset: "+dataset);

    var newerDataset = createDataset();
    log.info("--OFFLINE-- newerDataset: "+newerDataset);

    var olderDataset = DatasetFactory.getDataset("dsFormaPagto", null, null, null);
    log.info("--OFFLINE-- olderDataset: "+olderDataset);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"CCODIGO"),""),
                ifNull(newerDataset.getValue(i,"CDESCRICAO"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"CCODIGO")));
            log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"CCODIGO") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"CCODIGO"),""),
                        ifNull(olderDataset.getValue(i,"CDESCRICAO"),"")
                    ));
                }
            }
        }
    }

    log.info("--OFFLINE-- return dataset: "+dataset);
    log.info("--OFFLINE-- onSync FIM");
    return dataset;
}

function onMobileSync(user) {
    log.warn("--MOBILE-- dsCidade.js - onMobileSync");

    var sortingFields = new Array();

    var fields = new Array(
        "CCODIGO",
        "CDESCRICAO"
    );

    var constraints = new Array();

    var result = {
        'fields' : fields,
        'constraints' : constraints,
        'sortingFields' : sortingFields
    };

    log.warn("--MOBILE-- dsCidade.js - fim onMobileSync");
    return result;
}

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