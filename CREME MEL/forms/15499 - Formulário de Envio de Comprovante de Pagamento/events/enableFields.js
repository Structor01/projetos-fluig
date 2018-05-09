function enableFields(form){
	var activity = getValue('WKNumState');

	var nowDate = getNowDate();

	if(activity == 0) {
		var user = getUsuario();
		form.setValue('ecp_solicitante', user[1]);
		form.setValue('ecp_matricula', user[6]);
		form.setValue('ecp_dtAbertura', nowDate);
		form.setValue('atividade', activity);
	}

	if(activity != 5) {
		form.setEnabled('ecp_aprovacao', false);
	} else {
		//form.setEnabled('ecp_codigoCliente', false);
		form.setEnabled('ecp_pedidoVenda', false);
		form.setEnabled('ecp_filial', false);
		form.setValue('atividade', 'fim');
	}


}

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
		             datasetUser.getValue(0, "especializationArea"),
		             datasetUser.getValue(0, "login")
		             ]
	}
	return colleague;
}

function getNowDate() {
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
