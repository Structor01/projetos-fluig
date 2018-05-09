function afterTaskSave(colleagueId,nextSequenceId,userList){
	var usuario = obterUsuario(colleagueId);
	var horaCorrente = obterDataHoraCorrente();
    var atv = getValue("WKNumState");
    log.warn("--Debbug-- After Task Save "+atv+" "+nextSequenceId);
	if (atv == 4 && nextSequenceId == 5) {
    	addfilho(usuario, horaCorrente, "Criação de Pedido",  "Pedido Criado automaticamente com sucesso.");
    } else
	if (nextSequenceId == 19) {
    	addfilho(usuario, horaCorrente, "Aprovação, aguardando o produto.",  hAPI.getCardValue('parecerAprov'));
    } else
	if ( nextSequenceId == 5 && atv == 15) {
    	addfilho(usuario, horaCorrente, "Justificativa",  hAPI.getCardValue('parecerJustifica'));
    } else
	if ( nextSequenceId == 5 && atv == 35) {
    	addfilho(usuario, horaCorrente, "Parecer Assessoria",  hAPI.getCardValue('parecerEsp'));
    } else
    if ( atv == 21 &&  nextSequenceId == 19) {
    	addfilho(usuario, horaCorrente, "Produto(s) Retirado(s) Parcialmente", "Produto(s) fora(m) Retirato(s) do Almoxarifado Parcialmente.");
    } else
    if ( nextSequenceId == 15 ) {
    	addfilho(usuario, horaCorrente, "Solicitação de Justificativa", hAPI.getCardValue('parecerAprov'));
    } else
    if ( nextSequenceId == 35 ) {
    	addfilho(usuario, horaCorrente, "Solicitação de Parecer", hAPI.getCardValue('parecerAprov'));
    } else
    if ( nextSequenceId == 21 ) {
    	addfilho(usuario, horaCorrente, "Pedido Disponível", "Os itens do pedido já estão disponíveis no Almoxarifado.");
    } else
    if ( nextSequenceId == 26 ) {
    	addfilho(usuario, horaCorrente, "Produto(s) Retirato(s)", "Produto(s) fora(m) Retirato(s) do Almoxarifado.");
    }
}

function obterUsuario(user) {

	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user,user, ConstraintType.MUST);
	var datasetUser = DatasetFactory.getDataset("colleague", null, [ c1 ], null);
	var usuario = [];
	if (datasetUser.rowsCount > 0) {
		usuario['nome'] =  datasetUser.getValue(0, "colleagueName");
		usuario['login'] =  datasetUser.getValue(0, "login");
	}
	return usuario;

}

function obterDataHoraCorrente() {

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

	return currentTime;

}

function addfilho(usuario, horaCorrente, situacao, observacao) {

    var childData = new java.util.HashMap();
    childData.put("historicoLoginUsuario", usuario['login']);
    childData.put("historicoUsuario", usuario['nome']);
    childData.put("historicoData", horaCorrente);
    childData.put("historicoSituacao", situacao);
    childData.put("historicoObservacao", observacao);
	hAPI.addCardChild('tabelaHistoricoPedidoCompra', childData);
    log.warn("--Debbug-- Add Filho:" + usuario + " " + horaCorrente + " " + situacao + " " + observacao);
}
