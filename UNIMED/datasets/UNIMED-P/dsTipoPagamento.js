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

    var olderDataset = DatasetFactory.getDataset("dsTipoPagamento", null, null, null);
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
    
/*    var c1 = DatasetFactory.createConstraint("CFILEMP", '01;03', '01;03', ConstraintType.MUST);
    var contraint = new Array(c1);
    
    constraints = contraint;*/
    
    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
	var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7780.ObjectFactory');
	var tpPagto = serviceCCusto.createTIPOPAGAMENTO();
	log.warn("--Debbug-- constraints: " + constraints);

	tpPagto.setCCODGRUPO('03');
	tpPagto.setCCODFILIAL('01');
	tpPagto.setCTIPOPAG('');
	
	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CCODIGO"){
				log.warn("--Debbug-- CCODIGO: " + constraints[c].initialValue);	
				tpPagto.setCCODFILIAL(constraints[c].initialValue);
			}
			if (constraints[c].fieldName == "CDESCRICAO"){
				log.warn("--Debbug-- CDESCRICAO: " + constraints[c].initialValue);	
				tpPagto.setCTIPOPAG(constraints[c].initialValue);
			}
		}
	}
	
	log.warn("--Debbug-- tpPagto: " +tpPagto);
	log.warn("--Debbug-- tpPagto.getCCODFILIAL: " +tpPagto.getCCODFILIAL());	
	log.warn("--Debbug-- tpPagto.getCCODGRUPO: " +tpPagto.getCCODGRUPO());
	log.warn("--Debbug-- tpPagto.getCTIPOPAG: " +tpPagto.getCTIPOPAG());	
	
	try {
		
		var result = service.consultatipopagamento(tpPagto);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getATIPOSPAG().getSTRUCTRETTIPOSPAG().get(0).getCDESCRICAO());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getATIPOSPAG().getSTRUCTRETTIPOSPAG().size());
		var status = '';
		
		for(var i=0;i<result.getATIPOSPAG().getSTRUCTRETTIPOSPAG().size();i++){
			
			var registro = result.getATIPOSPAG().getSTRUCTRETTIPOSPAG().get(i);		
			 //Cria os registros
			
		    dataset.addRow(
		    new Array(registro.getCCODIGO(), 
		    		  registro.getCDESCRICAO())
		    );
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
	
}