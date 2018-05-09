function validateForm(form){

	var msg = "";
	var numState = getValue("WKNumState");
	
	if (numState == 0 || numState == 5 || numState == 13 || numState == 68) {
		if (form.getValue("cpProjeto") == "" && form.getValue("txtNovoProjeto" == "")) {
			msg += "\n\u00C9 necess\u00E1rio informar o Projeto.";
		}
		if (form.getValue("cmbTipoAlteracao") == "") {
			msg += "\n\u00C9 necess\u00E1rio informar o tipo de Alteração.";
		}
		if (form.getValue("cmbPrioridade") == "") {
			msg += "\n\u00C9 necess\u00E1rio informar a Prioridade.";
		}
		if (form.getValue("cmbPrioridade") == "Futura" && form.getValue("txtQuando") == "") {
			msg += "\n\u00C9 necess\u00E1rio em qual data Futura o Projeto será modificado.";
		}
//		if (form.getValue("txtCsnOrig") == "0,00" && form.getValue("txtCsoOrig") == "0,00" && form.getValue("txtEbOrig") == "0,00" && form.getValue("txtConvenioOrig") == "0,00" && form.getValue("txtCsnPropOrig") == "0,00" ) { 
//			msg += "\n\u00C9 necess\u00E1rio os Valores Originais no SGE.";
//		}
//		if (form.getValue("txtCsnAjuste") == "0,00" && form.getValue("txtCsoAjuste") == "0,00" && form.getValue("txtEbAjuste") == "0,00" && form.getValue("txtConvenioAjuste") == "0,00" && form.getValue("txtCsnPropAjuste") == "0,00") { 
//			msg += "\n\u00C9 necess\u00E1rio os Valores de Ajuste no SGE.";
//		}
		if(form.getValue("cpJustificativa") == ""){
			msg += "\u00C9 necess\u00E1rio informar a Necessidade de altera\u00E7\u00E3o f\u00EDsico-or\u00E7ament\u00E1ria.";
		}
		if (form.getValue("gerenteSolicitante") == "") {
			msg += "O gestor(a) da unidade n\u00E3o foi encontrado(a).";
		}
	}
	if (numState == 9) {
		if (form.getValue("cmbAutorizaGer") == "") {
			msg += "\n\u00C9 necess\u00E1rio selecionar opção de autorização da Gerência.";
		}
		if (form.getValue("cmbAutorizaGer") == "Devolver"  && form.getValue("cpObsGerencia")=="") {
			msg += "Preenchimento do campo Observação é obrigatório";
		}
	}
	if (numState == 18) {
		if (form.getValue("cmbValidaOrc") == "") {
			msg += "\n\u00C9 necess\u00E1rio Validar Orçamento";
		}
		if (form.getValue("cmbValidaOrc") == "Nao" && form.getValue("ObsValidadorOrc")=="") {
			msg += "Preenchimento do campo Observação é obrigatório";
		}
	}
	if (numState == 24) {
		if (form.getValue("cmbAutorizaUGE") == "") {
			msg += "\n\u00C9 necess\u00E1rio preencher o campo Autorização";
		}
		if (form.getValue("cmbAutorizaUGE") == "Devolver" && form.getValue("cpParecerUGE")=="") {
			msg += "Preenchimento do campo Observação é obrigatório";
		}
	}
	if (numState == 31) {
		if (form.getValue("cmbAutorizaSuper") == "") {
			msg += "\n\u00C9 necess\u00E1rio Autorizar ou Cancelar a Alteração Fisico Orçamentária.";
		}
		if (form.getValue("cmbAutorizaSuper") == "Cancelar" && form.getValue("cpObsSuper")=="") {
			msg += "Preenchimento do campo Observação é obrigatório";
		}
	}
	if (numState == 36) {
		if (form.getValue("txtCsnOrig") == "" || form.getValue("txtCsoOrig") == "" || form.getValue("txtEbOrig") == "" || form.getValue("txtConvenioOrig") == "" ) { 
			msg += "\n\u00C9 necess\u00E1rio os Valores Originais no SGE.";
		}
		if (form.getValue("txtCsnAjuste") == "" || form.getValue("txtCsoAjuste") == "" || form.getValue("txtEbAjuste") == "" || form.getValue("txtConvenioAjuste") == "" ) { 
			msg += "\n\u00C9 necess\u00E1rio os Valores de Ajuste no SGE.";
		}
	}
	if (numState == 38) {
		if (form.getValue("cmbValorAlterado")== "") {
			msg += "\n\u00C9 necess\u00E1rio informar se os valores foram alterados.";
		}
		if (form.getValue("cmbIncorporadoSGE") == "") {
			msg += "\n\u00C9 necess\u00E1rio informar se o Projeto foi cadastrado no SGE.";
		}
		if (form.getValue("cpConsideraSolic") == "") {
			msg += "\n\u00C9 necess\u00E1rio informar justificativa.";
		}
	}
	if (numState == 54) {
		if (form.getValue("txtIncorp") == "") {
			msg += "\n\u00C9 necess\u00E1rio informar informações da incorporação SGE";
		}
	}
	if (numState == 43) {
		if (form.getValue("cmbPrioridade") == "" ) {
			msg += "\n\u00C9 necess\u00E1rio Informar a Prioridade";
		}
	}
	
	if (msg != "") {
		throw (msg);
	}	
}