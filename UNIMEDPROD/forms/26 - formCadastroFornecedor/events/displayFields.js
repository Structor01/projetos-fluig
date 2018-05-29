function displayFields(form, customHTML) {
		
	//Variaveis para preenchimento dos campos do formulário
	var today = new Date();
	log.warn("--Debbug--Vinicius Entrada no display fields");
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
	log.warn("--Debbug--Vinicius Fim campos data");
	log.warn("--Debbug--Vinicius Chama func usuario");
	var usuario = getUsuario();
	log.warn("--Debbug--Vinicius for do retorno");
	// Variaveis para preenchder os dados do usuario 
	for (var i = 0; i < usuario.length; i++) {
		codigoUsuario = usuario[0];	
		nomeUsuario = usuario[1];
		usuarioAdmin = usuario[2];
		emaiUsuario = usuario[3];
		departamentoUsuario = usuario[4]
	}
	
	log.warn("--Debbug--Vinicius retorno");
	// Passando parametros para dentro do html
	var activity = getValue('WKNumState');
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- numProces: " + numProces);	
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
	
	log.warn("--Debbug-- activity: " + activity);
	// Preenchimento dos campos do formulário
	if (activity == 1 || activity == 0) {     
		form.setValue('dataAbertura', currentTime);
		form.setValue('matriculaSolicitante', codigoUsuario);
		form.setValue('nomeSolicitante', nomeUsuario);
	}
	//ConsultaFormularioPai()	
	
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