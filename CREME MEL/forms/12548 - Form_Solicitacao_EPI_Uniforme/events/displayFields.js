function displayFields(form, customHTML) {
    numAtividade = parseInt(getValue("WKNumState"));	
    WDKUSer = getValue("WKUser");
    //Inicia campos com valores padrao
	if ( numAtividade == 0 || numAtividade == 1) {			
		var ColabSearchConstraint = new Array();								   
		ColabSearchConstraint.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", WDKUSer, WDKUSer, ConstraintType.MUST));
		var Colabfields = new Array("colleagueName");
		var datasetColab = DatasetFactory.getDataset("colleague", Colabfields, ColabSearchConstraint, null);
		form.setValue("solicitante",datasetColab.getValue(0,"colleagueName"));
    }
 }
 