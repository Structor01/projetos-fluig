function displayFields(form,customHTML){
	customHTML.append('<script>');
	customHTML.append('var state = "'+ getValue('WKNumState') +'";');
	customHTML.append('</script>');

	form.setValue('dtAbertura', getDateNow());
	var sol = getUsuario();
	form.setValue('solicitante', sol[1]);
	form.setValue('matricula', sol[0]);
	var state = getValue('WKNumState');
	if(state != 0 && state != 4) {
		var indexes = form.getChildrenIndexes("itemPlano");
		for (var i = 0; i < indexes.length; i++) {
			form.setEnabled("causa___" + indexes[i], false);
			form.setEnabled("acao___" + indexes[i], false);
			form.setEnabled("obsSol___" + indexes[i], false);
			form.setEnabled("setor___" + indexes[i], false);
			form.setEnabled("resp___" + indexes[i], false);
			form.setEnabled("statusItem___" + indexes[i], false);
			form.setEnabled("dtInicial___" + indexes[i], false);
			form.setEnabled("prazoConclusao___" + indexes[i], false);
		}
		form.setEnabled("titulo", false);
	}
}

function getChildrenStatus(i) {

}

function getDateNow() {
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
