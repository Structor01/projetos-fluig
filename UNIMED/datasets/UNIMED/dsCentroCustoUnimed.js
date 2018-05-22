function defineStructure() {
    log.info("--OFFLINE-- defineStructure");

    addColumn("CCODIGO");
    addColumn("CDESCRICAO");
    addColumn("CIDFLUIGRESP");
    addColumn("CRESPONSAVEL");
    addColumn("CSTATUS");
    addColumn("CTIPO");

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

    var olderDataset = DatasetFactory.getDataset("dsCentroCustoUnimed", null, null, null);
    log.info("--OFFLINE-- olderDataset: "+olderDataset);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"CCODIGO"),""),
                ifNull(newerDataset.getValue(i,"CDESCRICAO"),""),
                ifNull(newerDataset.getValue(i,"CIDFLUIGRESP"),""),
                ifNull(newerDataset.getValue(i,"CRESPONSAVEL"),""),
                ifNull(newerDataset.getValue(i,"CSTATUS"),""),
                ifNull(newerDataset.getValue(i,"CTIPO"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"CCODIGO")));
            log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"CCODIGO") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"CCODIGO"),""),
                        ifNull(olderDataset.getValue(i,"CDESCRICAO"),""),
                        ifNull(olderDataset.getValue(i,"CIDFLUIGRESP"),""),
                        ifNull(olderDataset.getValue(i,"CRESPONSAVEL"),""),
                        ifNull(olderDataset.getValue(i,"CSTATUS"),""),
                        ifNull(olderDataset.getValue(i,"CTIPO"),"")
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
        "CDESCRICAO",
        "CIDFLUIGRESP",
        "CRESPONSAVEL",
        "CSTATUS",
        "CTIPO"
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
    dataset.addColumn("CIDFLUIGRESP");
    dataset.addColumn("CRESPONSAVEL");
    dataset.addColumn("CSTATUS");
    dataset.addColumn("CTIPO");

    var listaEmpresas = ServiceManager.getService('WS_UNIMED_PROTHEUS');
    log.warn("--Debbug-- listaCliente: " +listaEmpresas);
//    var serviceHelper = listaEmpresas.getBean();
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7784.WSUNIMED');
    log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
    var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7784.ObjectFactory');
    var ccusto = serviceCCusto.createCENTROCUSTO();
    log.warn("--Debbug-- ccusto: " +ccusto);

    log.warn("--Debbug-- constraints: " + constraints);
    // log.warn("--Debbug-- constraints.length: " + constraints.length);
    ccusto.setCCODGRUPO('03');
    ccusto.setCCODFILIAL('01');
    ccusto.setCCUSTO('');

    if (constraints != null) {
        for (var c = 0; c < constraints.length; c++){
            if (constraints[c].fieldName == "CFILEMP"){
                log.warn("--Debbug-- CFILEMP: " + constraints[c].initialValue);
                ccusto.setCCODFILIAL(constraints[c].initialValue);
            }
            if (constraints[c].fieldName == "CDESCRICAO"){
                log.warn("--Debbug-- "+constraints[c].fieldName+": " + constraints[c].initialValue);
                ccusto.setCCUSTO(constraints[c].initialValue);
            }
        }
    }

    log.warn("--Debbug-- ccusto.getCCODFILIAL: " +ccusto.getCCODFILIAL());

    log.warn("--Debbug-- ccusto.getCCODGRUPO: " +ccusto.getCCODGRUPO());

    log.warn("--Debbug-- ccusto.getCCUSTO: " +ccusto.getCCUSTO());

    try {

        var result = service.consultaccusto(ccusto);
        log.warn("--Debbug-- result: " +result);
        //lorg.dir(result);
        //log.warn("--Debbug-- qt registros retornados: " + result.getAEMPRESAS());
        log.warn("--Debbug-- qt registros retornados: " + result.getACENTROSCUSTO().getSTRUCTRETCCUSTO().get(0).getCDESCRICAO());
        //log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
        log.warn("--Debbug-- SIZE: " + result.getACENTROSCUSTO().getSTRUCTRETCCUSTO().size());

        for(var i=0;i<result.getACENTROSCUSTO().getSTRUCTRETCCUSTO().size();i++){

            var registro = result.getACENTROSCUSTO().getSTRUCTRETCCUSTO().get(i);
            //Cria os registros
            log.warn("--Debbug-- ccusto.getCCUSTO: " +registro.getCIDFLUIGRESP());
            var idFluig = registro.getCIDFLUIGRESP();
            log.warn("--Debbug-- idFluig: " +idFluig.trim());
            //if ( idFluig.trim() != '' ) {
            dataset.addRow(
                new Array(
                    registro.getCCCUSTO(),
                    registro.getCDESCRICAO(),
                    registro.getCIDFLUIGRESP(),
                    registro.getCRESPONSAVEL(),
                    registro.getCSTATUS(),
                    registro.getCTIPO()
                ));
            //}
        }
    } catch (erro){
        log.warn("--Debbug-- erro: " +erro);
        log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
    }

    return dataset;
}