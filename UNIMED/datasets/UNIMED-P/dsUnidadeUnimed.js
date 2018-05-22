function defineStructure() {
    log.info("--OFFLINE-- defineStructure");

    addColumn("CEMPRESA");
    addColumn("CFILEMP");
    addColumn("CNOMEEMPRESA");
    addColumn("CNOMEFIL");

    log.info("--OFFLINE-- defineStructure addColumn");
    setKey(new Array( "CFILEMP"));
    addIndex(new Array( "CFILEMP"));

    log.info("--OFFLINE-- defineStructure FIM");
}

function onSync(lastSyncDate){
    log.info("--OFFLINE-- onSync ");

    var dataset = DatasetBuilder.newDataset();
    log.info("--OFFLINE-- dataset: "+dataset);

    var newerDataset = createDataset();
    log.info("--OFFLINE-- newerDataset: "+newerDataset);

    var olderDataset = DatasetFactory.getDataset("dsUninadeUnimed", null, null, null);
    log.info("--OFFLINE-- olderDataset: "+olderDataset);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"CEMPRESA"),""),
                ifNull(newerDataset.getValue(i,"CFILEMP"),""),
                ifNull(newerDataset.getValue(i,"CNOMEEMPRESA"),""),
                ifNull(newerDataset.getValue(i,"CNOMEFIL"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"CFILEMP")));
            log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"CCODIGO") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"CEMPRESA"),""),
                        ifNull(olderDataset.getValue(i,"CFILEMP"),""),
                        ifNull(olderDataset.getValue(i,"CNOMEEMPRESA"),""),
                        ifNull(olderDataset.getValue(i,"CNOMEFIL"),"")
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
        "CEMPRESA",
        "CFILEMP",
        "CNOMEEMPRESA",
        "CNOMEFIL"
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
    dataset.addColumn("CEMPRESA");
    dataset.addColumn("CFILEMP");
    dataset.addColumn("CNOMEEMPRESA");
    dataset.addColumn("CNOMEFIL");
      
    //Cria os registros
    /*dataset.addRow(new Array("03", "03 - CENTRO CLÍNICO"));
    dataset.addRow(new Array("04", "04 - LOJA FLAMBOYANT"));
    dataset.addRow(new Array("05", "05 - SERVIÇO DE ATEND. UNIMED II"));
    dataset.addRow(new Array("06", "06 - CENTRAL DE TELEATENDIMENTO"));
    dataset.addRow(new Array("07", "07 - LABORATÓRIO RIO VERDE"));
    dataset.addRow(new Array("08", "08 - QUIMIOTERAPIA"));
    dataset.addRow(new Array("09", "09 - CLÍNICA DE PSICOLOGIA"));
    dataset.addRow(new Array("10", "10 - PROGRAMA DE ATENÇÃO À SAÚDE"));
    dataset.addRow(new Array("11", "11 - LABORATÓRIO MUTIRÃO"));
    dataset.addRow(new Array("12", "12 - UNIDADE JARDIM AMÉRICA"));
    dataset.addRow(new Array("80", "80 - CORRETORA"));
    dataset.addRow(new Array("81", "81 - PROJETO SOCIAL"));
    dataset.addRow(new Array("82", "82 - OUTROS"));*/

    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
	log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7780.WSUNIMED');
	log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();

	// var unidade = service.createCENTROCUSTO();

    var filtro = '';

	if (constraints != null) {
		for (var c = 0; c < constraints.length; c++){
			if (constraints[c].fieldName == "CNOMEFIL"){
				log.warn("--Debbug-- CFILEMP: " + constraints[c].initialValue);
				filtro =  constraints[c].initialValue;
			}
		}
	}

	try {
		var result = service.consultaempresas(true);
		log.warn("--Debbug-- result: " +result);
		//lorg.dir(result);
		//log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
		log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().get(0).getCNOMEEMPRESA());
		//log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
		log.warn("--Debbug-- SIZE: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().size());
		
		for(var i=0;i<result.getAEMPRESAS().getSTRUCTRETEMPRESAS().size();i++){
			var registro = result.getAEMPRESAS().getSTRUCTRETEMPRESAS().get(i);
            if(
                filtro != '' && (
                    registro.getCEMPRESA().indexOf(filtro) > -1 ||
                    registro.getCFILEMP().indexOf(filtro) > -1 ||
                    registro.getCNOMEEMPRESA().indexOf(filtro) > -1 ||
                    registro.getCNOMEFIL().indexOf(filtro) > -1
                )
            )
                dataset.addRow(new Array(registro.getCEMPRESA(), registro.getCFILEMP(), registro.getCNOMEEMPRESA(), registro.getCNOMEFIL()));
            else if(filtro == '') {
                dataset.addRow(new Array(registro.getCEMPRESA(), registro.getCFILEMP(), registro.getCNOMEEMPRESA(), registro.getCNOMEFIL()));
            }
		}
	} catch (erro){
		log.warn("--Debbug-- erro: " +erro);
		log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
	}
     
    return dataset;
}