function afterTaskSave(colleagueId,nextSequenceId,userList){

	var sequenceId = getValue("WKCurrentState");
	var numProces = getValue("WKNumProces");
	log.warn("--Debbug-- Solicitacao Compras - after task save");
	log.warn("--Debbug-- var NextsequenceId: " + nextSequenceId)
	log.warn("--Debbug-- var sequenceId: " + sequenceId)
	log.warn("--Debbug-- var colleagueId: " + colleagueId);

	if ( nextSequenceId == 38 ) {
		var nome = hAPI.getCardValue("responsavel");
		var parecer = hAPI.getCardValue("parecer");
		var status = hAPI.getCardValue("aprovado")+' pelo Gestor Imediato';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 16) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Em Cotação';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 20) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Cotação Cadastrada';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 50) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Cotação em Análise';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 14) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Fim - Em Cotação';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 18) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Fim - Retorno Fornecedor';
		addfilho(nome, parecer, status);
	} else
	if (nextSequenceId == 48) {
		var nome = hAPI.getCardValue("nomeSolicitante");
		var parecer = 'Movimentação Protheus';
		var status = 'Fim - Cotação em Análise';
		addfilho(nome, parecer, status);
	}
}
//funcao para pegar o nome do usuario
function getUsuario(user) {

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,user, ConstraintType.MUST);
	var datasetUser = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	var colleague = '';
	if (datasetUser.rowsCount > 0) {
		colleague =  datasetUser.getValue(0, "colleagueName");
	}
	return colleague;
}

function addfilho(nome, problema, status) {

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

	var childData = new java.util.HashMap();

	childData.put("histUsuario", nome);
	childData.put("histData", currentTime);
	childData.put("histInt", problema);
	childData.put("histStatus", status);

	hAPI.addCardChild('tableHistorico', childData);
}
