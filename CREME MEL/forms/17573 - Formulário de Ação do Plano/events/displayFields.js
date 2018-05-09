function displayFields(form,customHTML){

	customHTML.append('<script>');
	customHTML.append('var state = "'+ getValue('WKNumState') +'";');
	customHTML.append('</script>');


	var userId = form.getValue('matricula');
	var c = getUsuario(userId);
	form.setValue('resp', c[1]);
	form.setValue('dtAbertura', getDateNow());

	var state = getValue('WKNumState');
	if(state != 6) {
		form.setEnabled('observacao', false);
	}
}

function getUsuario(user) {

	// var user = getValue("WKUser");
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
