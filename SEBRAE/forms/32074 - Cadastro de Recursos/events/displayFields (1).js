function displayFields(form, customHTML) {
	log.info('=================== getFormMode() '+form.getFormMode());
	if (form.getFormMode() == "MOD" || form.getFormMode() == "ADD"){
		var date = new Date();
		log.info("======= date: "+ date);
		var day = ((date.getDate() < 10) ? "0" : "")+ date.getDate();
		log.info("======= day: "+ day);
		var month = ((date.getMonth() < 9) ? "0" : "")+ (date.getMonth()+1);
		log.info("======= month: "+ month);
		var year = date.getFullYear();
		log.info("======= year: "+ year);
		
		var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
		var constraints = new Array(c1);
		var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		if (form.getValue('dsQuantidade') == ""){
			form.setValue('dsQuantidade', 1);
		}
		
		form.setValue('dsResponsavel', colaborador.getValue(0, "colleagueName"));
		form.setValue("dataSolicitacao", day+"/"+month+"/"+year);
	}
}
