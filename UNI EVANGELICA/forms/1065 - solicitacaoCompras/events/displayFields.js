function displayFields(form, customHTML) {

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

	var usuarioSol = form.getValue('idSolicitante');
	var aprovSol = getHierarquia(usuarioSol);

	var nomeUsuario, codigoUsuario, emaiUsuario, usuarioAdmin, departamentoUsuario;
	var usuario = getUsuario();


	for (var i = 0; i < usuario.length; i++) {
		codigoUsuario = usuario[0];
		nomeUsuario = usuario[1];
		usuarioAdmin = usuario[2];
		emaiUsuario = usuario[3];
		departamentoUsuario = usuario[4]
		codUserProtheus = usuario[6]
	}

	var user = getValue("WKUser");
	var aprov = getHierarquia(user);

	var activity = getValue('WKNumState');
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- numProces: " + numProces);
	customHTML.append("<script>");
	customHTML.append("\n   var WKNumState     =  " + activity      + ";");
	customHTML.append("\n   var WKNumProces    =  " + numProces      + ";");
	customHTML.append("\n   var dataAbertura   = '" + currentTime   + "';");
	customHTML.append("\n   var nomeUsuario    = '" + nomeUsuario   + "';");
	customHTML.append("\n   var codigoUsuario  = '" + codigoUsuario + "';");
	customHTML.append("\n   var usuarioAdmin   = '" + usuarioAdmin  + "';");
	customHTML.append("\n   var emaiUsuario   =  '" + emaiUsuario  + "';");
	customHTML.append("\n   var numeroProcesso = '" + numProces + "';");
	customHTML.append("\n   var cadastroAprov = '" + aprov + "';");

	customHTML.append("\n   Inicio();");
	customHTML.append("\n </script>");
	var retornoPapel = getPapel();
	form.setValue('compraDireta', retornoPapel);

	log.warn("--Debbug-- activity: " + activity);
	// Preenchimento dos campos do formulário
	if(activity == 81) {
		form.setEnabled('zoomGrupoProduto', true);
		form.setEnabled('zoomFilial', true);
		form.setEnabled('zoomFilialEntrega', true);
		var indexes = form.getChildrenIndexes("tbSolCompras");
		for(var i=0; i<indexes.length; i++) {
			form.setEnabled('zoomProduto___' + indexes[i], true);
			form.setEnabled('qtde___' + indexes[i], true);
			form.setEnabled('obsProduto___' + indexes[i], true);
		}
	} else {
		form.setEnabled('zoomGrupoProduto', false);
		form.setEnabled('zoomFilial', false);
		form.setEnabled('zoomFilialEntrega', false);
		var indexes = form.getChildrenIndexes("tbSolCompras");
		for(var i=0; i<indexes.length; i++) {
			form.setEnabled('zoomProduto___' + indexes[i], false);
			form.setEnabled('qtde___' + indexes[i], false);
			form.setEnabled('obsProduto___' + indexes[i], false);
		}
	}

	if (activity == 1 || activity == 0 || activity == 4 || activity == 81) {
		// var retornoAprov = getAprov();
		// form.setValue('idAprovDepto', retornoAprov);
		form.setValue('dataAbertura', currentTime);
		form.setValue('matriculaSolicitante', codigoUsuario);
		form.setValue('idSolicitante', codigoUsuario);
		form.setValue('nomeSolicitante', nomeUsuario);
		form.setValue('idUserProtheus', codUserProtheus);
		if(aprov != 'N' && activity == 0) {
			form.setValue('centroCusto', aprov[3]);
			form.setValue('centroCusto_id', aprov[0]);
			form.setValue('gestorImediato', aprov[2]);
			form.setValue('gestorImediato_id', aprov[1]);
		}

		form.setEnabled('zoomGrupoProduto', true);
		form.setEnabled('zoomFilial', true);
		form.setEnabled('zoomFilialEntrega', true);
		var indexes = form.getChildrenIndexes("tbSolCompras");
		for(var i=0; i<indexes.length; i++) {
			form.setEnabled('zoomProduto___' + indexes[i], true);
			form.setEnabled('qtde___' + indexes[i], true);
			form.setEnabled('obsProduto___' + indexes[i], true);
		}
	} else if (activity == 5) {
		form.setValue('dtAprov', currentTime);
		form.setValue('responsavel', nomeUsuario);
		form.setValue('responsavel_id', nomeUsuario);
		form.setValue('aprovado', '');
		form.setValue('parecer', '');
		if(aprov != 'N') {
			form.setValue('gestorImediato_id', aprov[1]);
			form.setValue('gestorImediatoResp', aprov[2]);
			form.setValue('gestorImediato', aprovSol[2]);
			form.setValue('centroCusto', aprovSol[3]);
		}
	}
}

function getHierarquia(user) {
	var c1 = DatasetFactory.createConstraint("codigoSolicitante", user,user, ConstraintType.MUST);
	var datasetUser = DatasetFactory.getDataset("dsHierarquiaAprovacao", null, [ c1 ], null);
	var colleague = [];

	if (datasetUser.rowsCount > 0) {
		if(datasetUser.rowsCount == 1){
			colleague = [
				datasetUser.getValue(0, "codigoCentroDeCusto"),
				datasetUser.getValue(0, "codigoGestor"),
				datasetUser.getValue(0, "gestor"),
				datasetUser.getValue(0, "centroDeCusto")
			]
		} else {
			for(var i=0; i < datasetUser.rowsCount; i++) {
				var arr = new Array();
				arr = [
					datasetUser.getValue(i, "codigoCentroDeCusto"),
					datasetUser.getValue(i, "codigoGestor"),
					datasetUser.getValue(i, "gestor"),
					datasetUser.getValue(i, "centroDeCusto")
				];

				colleague.push(arr);
			}
		}

		return colleague;
	} else {
		return 'N';
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

// log.warn("--Debbug-- email: " + datasetUser.getValue(0, "mail"));
// var c1 = DatasetFactory.createConstraint("USUEMAIL", datasetUser.getValue(0, "mail"), datasetUser.getValue(0, "mail"), ConstraintType.MUST);
// var dsSolicitante = DatasetFactory.getDataset("dsConsultaSolicitante", null, [ c1 ], null);
// log.warn("--Debbug-- rowsCount: " + dsSolicitante.rowsCount);
// if (dsSolicitante.rowsCount > 0) {
// 	log.warn("--Debbug-- USER: " + dsSolicitante.getValue(0, "AIUSER"));
// 	colleague.push(dsSolicitante.getValue(0, "AIUSER"));
// } else {
// 	colleague.push("");
// }

return colleague;
}

//funcao para pegar os papeis do usuario
function getPapel() {
	var user = getValue("WKUser");
	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', user, user, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', 'diretor', 'diretor', ConstraintType.MUST);
	var dsRole = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(c1, c2), null);

	if (dsRole.rowsCount > 0) {
		return 'S';
	} else {
		return 'N';
	}
}

// function getAprov() {
// 	var user = getValue("WKUser");
// 	var c1 = DatasetFactory.createConstraint('idColaborador', user, user, ConstraintType.MUST);
// 	var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
// 	var colunasAlcadaCoordenacao = new Array('idCoordenador');
// 	var dsAlcadaCoordenacao = DatasetFactory.getDataset('dsAlcadaCoordenacao', colunasAlcadaCoordenacao, new Array(c1, c2), null);
// 	if (dsAlcadaCoordenacao.rowsCount > 0) {
// 		return dsAlcadaCoordenacao.getValue(0, "idCoordenador");
// 	} else {
// 		return 'N';
// 	}
// }
