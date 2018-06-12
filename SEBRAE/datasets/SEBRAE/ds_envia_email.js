function createDataset(fields, constraints, sortFields) {	 
	var dataset = DatasetBuilder.newDataset();
	dataset.addColumn("EnviouEmail");		
    
	//Buscamos o grupo e usuário do dataset de parametros gerais.
	var dataset_param = DatasetFactory.getDataset("ds_parametros_gerais_processoProcedimentoInstrucaoNormativa", null, null, null);
    log.info("######################################");
    log.info("######################################");
    log.info("FRE ### Buscando parametros gerais");
    var grupoNotificacao = "";
    var usuarioAutentica = "";
    for(var i = 0; i < dataset_param.values.length; i++) {        
    	grupoNotificacao = dataset_param.getValue(i, "GRUPO_NOTIFICACAO");
    	usuarioAutentica = dataset_param.getValue(i, "WS_USERID");
    }
    log.info("FRE ### Encontrou....!");
    log.info("FRE ### grupo....:" + grupoNotificacao);
    log.info("FRE ### usuario..:" + usuarioAutentica);
    log.info("######################################");		

    //Enviando email para um determinado grupo
    //avisando que houve publicação de documento.
    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", grupoNotificacao, grupoNotificacao, ConstraintType.MUST);   
    var constraints   = new Array(c1);        
    //Define os campos para ordenação
    var sortingFields = new Array("colleagueGroupPK.colleagueId");     
    //Busca o dataset
    var destinatarios = new java.util.ArrayList();    
    var datasetC = DatasetFactory.getDataset("colleagueGroup", null, constraints, sortingFields);
    log.info("######################################");
    log.info("######################################");
    log.info("FRE ### Usuários que receberam emails das alterações das PO");
    var existeRegistro = false;
    for(var i = 0; i < datasetC.values.length; i++) {        
        log.info(datasetC.getValue(i, "colleagueGroupPK.colleagueId"));
        destinatarios.add(datasetC.getValue(i, "colleagueGroupPK.colleagueId"));
        existeRegistro = true;
    }
    log.info("######################################");
    log.info("######################################");
    
    log.info("FRE ### antes do notifier ");
    if (existeRegistro){
    	var parametros = new java.util.HashMap();        
        parametros.put("DADOSSOLICITACAO", fields[0]); 
        parametros.put("NRSOLICITACAO", fields[1]);
    	var tituloEMail = "Publicação de Procedimento/Instrução Normativa - Solicitação " + fields[1];
        parametros.put("subject", tituloEMail);
    	notifier.notify(usuarioAutentica, "SEBRAE_template_notificacao_alteracoes", parametros, destinatarios, "text/html");
    }    
    dataset.addRow(new Array("sim"));	
	return dataset;            
}