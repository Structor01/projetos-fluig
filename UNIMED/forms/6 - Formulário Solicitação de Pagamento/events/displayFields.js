function displayFields(form, customHTML) {
		
	//Variaveis para preenchimento dos campos do formulário
	var today = new Date();
	var year = today.getFullYear();
	var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
	var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();		
	var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
	var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
	var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
	var currentHour = hour + ":" + minute + ":" + second;
	var currentDate = day + '/' + month + '/' + year;
	var currentTime = currentDate + "  " + currentHour;
	var nomeUsuario, codigoUsuario, emaiUsuario, usuarioAdmin, departamentoUsuario;
	var usuario = getUsuario();
	
	// Variaveis para preenchder os dados do usuario 
	for (var i = 0; i < usuario.length; i++) {
		codigoUsuario = usuario[0];	
		nomeUsuario = usuario[1];
		usuarioAdmin = usuario[2];
		emaiUsuario = usuario[3];
		departamentoUsuario = usuario[4]
	}
	
	// Passando parametros para dentro do html
	var activity = getValue('WKNumState');
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- numProces: " + numProces);	
	log.warn("--Debbug-- activity: " + activity);
	customHTML.append("<script>");
	customHTML.append("\n   var WKNumState     =  " + activity      + ";");	
    customHTML.append("\n   var dataAbertura   = '" + currentTime   + "';");
    customHTML.append("\n   var nomeUsuario    = '" + nomeUsuario   + "';");
    customHTML.append("\n   var codigoUsuario  = '" + codigoUsuario + "';");
    customHTML.append("\n   var usuarioAdmin   = '" + usuarioAdmin  + "';");
    customHTML.append("\n   var emaiUsuario   =  '" + emaiUsuario  + "';");
    customHTML.append("\n   var numeroProcesso = '" + numProces + "';");	
	customHTML.append("\n   Inicio();");
	customHTML.append("\n </script>");
	
	// Preenchimento dos campos do formulário
	if (activity == 1 || activity == 0) {     
		form.setValue('dataAbertura', currentTime);
		form.setValue('matriculaSolicitante', codigoUsuario);
		form.setValue('nomeSolicitante', nomeUsuario); 
		form.setValue('numeroProcesso', numProces);
		log.warn("--Debbug-- codigoUsuario: " + codigoUsuario);
		form.setValue('idSolicitante', codigoUsuario);
	} else {
		if	(activity == 09 || activity == 15)  {
			form.setValue('respGerencia', nomeUsuario);
			form.setValue('dtAprovGerencia', currentTime);
		} else {
	//*Aprovar Diretoria
		if	(activity == 16 || activity == 18)  {
			form.setValue('respDiretoria', nomeUsuario);
			form.setValue('dtAprovDiretoria', currentTime);
		} else {
	//*Aprovar Diretoria Financeira
		if	(activity == 17 || activity == 23)  {
			form.setValue('respDirFin', nomeUsuario);
			form.setValue('dtAprovDirFin', currentTime);
		} else {
	//*Análise Tributária - NF		
		log.warn("--Debbug-- activity2: " + activity);
		if	(activity == 11 || activity == 28)  {
			log.warn("--Debbug-- setValue ");
			form.setValue('respCont', nomeUsuario);
			form.setValue('dtAprovCont', currentTime);
		} else {
	//*Conferir Valores / Lançamento Contas a Pagar	
		if	(activity == 13 || activity == 32)  {
			form.setValue('respFin', nomeUsuario);
			form.setValue('dtAprovFin', currentTime);
		}}}}}
	}
}

// funcao para pegar o nome do usuario
function getUsuario() {

	var user = getValue("WKUser");	
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,user, ConstraintType.MUST);
	
	var datasetUser = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	var colleague = new Array();
	if (datasetUser.rowsCount > 0) {
		
		colleague = [datasetUser.getValue(0, "colleaguePK.colleagueId"),
		             datasetUser.getValue(0, "colleagueName"),
		             datasetUser.getValue(0, "adminUser"),
		             datasetUser.getValue(0, "mail"),
		             datasetUser.getValue(0, "currentProject"),
		             datasetUser.getValue(0, "especializationArea")
		             ]
	}
	
	return colleague;
}
