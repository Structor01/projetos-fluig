function enableFields(form) {
	var state = getValue("WKNumState");
	var fields = new Array();
	var fieldsDis = new Array();
	if (state != '13'){
		disableAllFields(form);
	}else{
		fieldsDis = ["cmbAutorizaGer","cpObsGerencia","cmbValidaOrc","ObsValidadorOrc"];
	}

	if (state == '0' || state == '5'  || state == '68') {
		fields = [ "cpProjeto", "txtNovoProjeto", "cmbTipoAlteracao", "cmbPrioridade", "txtQuando", "postArquivoAnexo", "cpJustificativa",
				"txtCsnOrig", "txtCsoOrig", "txtEbOrig", "txtConvenioOrig", "txtCsnAjuste", "txtCsoAjuste", "txtEbAjuste",
				"txtConvenioAjuste", "cpNovoProjeto", "txtTotalOrig", "txtTotalAjuste", "txtTotalFinal", "txtConvenioFinal", "txtEbFinal",
				"txtCsoFinal", "txtCsnFinal", "cpHistGerencia", "cpHistOrc", "cpHistUGE", "txtCsnPropOrig", "txtCsnPropAjuste",
				"txtCsnPropFinal", "cmbInstrumento", "txtUnidadeSolicitante", "secaoUsuario", "gerenteSolicitante", "txtMetasDe",
				"txtMetasNovo", "txtMetasAj", "cmbProduto"];				
	}	
		
	if (state == '9') {
		fields = [ "cmbAutorizaGer", "cpObsGerencia", "cpHistGerencia", "cpHistOrc", "cpHistUGE" ];
	}
	if (state == '18') {
		fields = [ "cmbValidaOrc", "ObsValidadorOrc", "cpHistGerencia", "cpHistOrc", "cpHistUGE" ];
	}
	if (state == '24') {
		fields = [ "cmbAutorizaUGE", "cpParecerUGE", "cpHistGerencia", "cpHistOrc", "cpHistUGE" ];
	}
	if (state == '31') {
		fields = [ "cmbAutorizaSuper", "cpObsSuper" ];
	}
	if (state == '36') {
		fields = [ "txtCsnOrig", "txtCsoOrig", "txtEbOrig", "txtConvenioOrig", "txtCsnAjuste", "txtCsoAjuste", "txtEbAjuste",
				"txtConvenioAjuste" ];
	}
	if (state == '38') {
		fields = [ "cmbIncorporadoSGE", "cmbValorAlterado", "cpConsideraSolic", "txtCsnPropAjuste1", "txtCsnPropFinal1", "txtCsnAjuste1",
				"txtCsnFinal1", "txtCsoAjuste1", "txtCsoFinal1", "txtEbAjuste1", "txtEbFinal1", "txtConvenioAjuste1", "txtConvenioFinal1",
				"txtTotalFinal1", "txtTotalAjuste1", "txtTotalOrig1", "txtConvenioOrig1", "txtEbOrig1", "txtCsoOrig1", "txtCsnProp1",
				"txtCsnOrig1","dtAlteraSGE" ];
	}
	if (state == '54') {
		fields = [ "txtIncorp", "cpConsideraSGE" ];
	}
	if (state == '43') {
		fields = [ "txtQuando", "cmbPrioridade", "cmbTipoAlteracao", "cpJustificativa", "diasGuardarProcesso" ];
	}
	
	if(fields.length > 0)
		enableFieldsFromList(form, fields);
	
	if(fieldsDis.length > 0)
		disableFieldsFromList(form, fieldsDis);
}
function disableAllFields(form) {
	var fields = form.getCardData();
	var iterare = fields.keySet().iterator();

	while (iterare.hasNext()) {
		var key = iterare.next();
		form.setEnabled(key, false, false);
	}
}

function enableFieldsFromList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}
function disableFieldsFromList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], false);
	}
}