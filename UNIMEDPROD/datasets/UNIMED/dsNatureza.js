function defineStructure() {
    log.info("--OFFLINE-- defineStructure");
    addColumn("CNATUREZA");
    addColumn("CDESCRICAO");
    addColumn("CCONTACONTABIL");

    log.info("--OFFLINE-- defineStructure addColumn");
    setKey(new Array( "CDESCRICAO"));
    addIndex(new Array( "CDESCRICAO"));

    log.info("--OFFLINE-- defineStructure FIM");
}

function onSync(lastSyncDate){
    log.info("--OFFLINE-- onSync ");

    var dataset = DatasetBuilder.newDataset();
    log.info("--OFFLINE-- dataset: "+dataset);

    var newerDataset = createDataset();
    log.info("--OFFLINE-- newerDataset: "+newerDataset);

    var olderDataset = DatasetFactory.getDataset("dsNatureza", null, null, null);
    log.info("--OFFLINE-- olderDataset: "+olderDataset);

    var ifNull = function(value, ifNullValue){
        return value == null || value == "" ? ifNullValue : value;
    }

    if(newerDataset != null){
        var updated = new Array();
        for(var i = 0; i < newerDataset.rowsCount; i++){
            dataset.addOrUpdateRow(new Array(
                ifNull(newerDataset.getValue(i,"CNATUREZA"),""),
                ifNull(newerDataset.getValue(i,"CDESCRICAO"),""),
                ifNull(newerDataset.getValue(i,"CCONTACONTABIL"),"")
            ));
            updated.push(new Array(newerDataset.getValue(i,"CDESCRICAO")));
            log.info("--OFFLINE-- i: "+ (i + 1) + "/" + newerDataset.rowsCount + " updated: " + updated);
        }

        if(olderDataset != null){
            for(var i = 0; i < olderDataset.rowsCount; i++){
                if(updated.indexOf(olderDataset.getValue(i,"CNATUREZA") == -1)){
                    dataset.deleteRow(new Array(
                        ifNull(olderDataset.getValue(i,"CNATUREZA"),""),
                        ifNull(olderDataset.getValue(i,"CDESCRICAO"),""),
                        ifNull(olderDataset.getValue(i,"CCONTACONTABIL"),"")
                    ));
                }
            }
        }
    }

    log.info("--OFFLINE-- return dataset: "+dataset);
    log.info("--OFFLINE-- onSync FIM");
    return dataset;
}

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
    var serviceLocator = listaEmpresas.instantiate('_139._0._20._172._7784.WSUNIMED');
    log.warn("--Debbug-- serviceLocator: " +serviceLocator);
    var service = serviceLocator.getWSUNIMEDSOAP();
    var serviceCCusto= listaEmpresas.instantiate('_139._0._20._172._7784.ObjectFactory');
    var ntrza = serviceCCusto.createNATUREZA();
    log.warn("--Debbug-- ntrza: " +ntrza);

    ntrza.setCCODGRUPO('03');
    ntrza.setCCODFILIAL('01');
    ntrza.setCNATUREZA('');

    log.warn("--Debbug-- constraints: " + constraints);

    var filtro = '';

    if (constraints != null) {
        for (var c = 0; c < constraints.length; c++){
            // if (constraints[c].fieldName == "CCODIGO"){
            //     log.warn("--Debbug-- CCODIGO: " + constraints[c].initialValue);
            //     filtro = constraints[c].initialValue;
            // }
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
        // log.warn("--Debbug-- qt registros retornados: " + result.getANATUREZA().getSTRUCTRETNATUREZA().get(0).getCDESCRICAO());
        //log.warn("--Debbug-- length: " + result.getAEMPRESAS().getSTRUCTRETEMPRESAS().length);
        log.warn("--Debbug-- SIZE: " + result.getANATUREZA().getSTRUCTRETNATUREZA().size());
        var status = '';

        for(var i=0;i<result.getANATUREZA().getSTRUCTRETNATUREZA().size();i++){
            var registro = result.getANATUREZA().getSTRUCTRETNATUREZA().get(i);
            log.warn(registro.getCNATUREZA() + registro.getCDESCRICAO() + registro.getCCONTACONTABIL());
            dataset.addRow(new Array(registro.getCNATUREZA(), registro.getCDESCRICAO(),registro.getCCONTACONTABIL()));
        }

    } catch (erro){
        log.warn("--Debbug-- erro: " +erro);
        log.warn("--Debbug-- erro --linha: " +erro.lineNumber);
    }

    return dataset;

}