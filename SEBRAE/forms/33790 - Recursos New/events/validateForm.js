function validateForm(form){

	var msg = "";
	var firstField = null;
	var correctPosition = null;
	var numState = getValue("WKNumState");
	
	
	if (numState == 0 || numState == 4) {
		if (form.getValue("dsSolicitanteCarregado") == "" || form.getValue("dsSolicitanteCarregado") == null) {
			msg += "\n\u00C9 necess\u00E1rio informar o Solicitante Informado.";
			correctPosition = correctPosition == null ? 22 : correctPosition;
			firstField = firstField == null ? "dsSolicitanteCarregado" : firstField;
		}
		if (form.getValue("dsRecurso") == "" || form.getValue("dsRecurso") == null) {
			msg += "\n\u00C9 necess\u00E1rio informar o Recurso.";
			correctPosition = correctPosition == null ? 22 : correctPosition;
			firstField = firstField == null ? "dsRecurso" : firstField			
		}else{
			if (form.getValue("dtInicio") == "" || form.getValue("dtInicio") == null) {
				msg += "\n\u00C9 necess\u00E1rio informar o Data de Inicio.";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "dtInicio" : firstField			
			}
			if (form.getValue("dtFim") == "" || form.getValue("dtFim") == null) {
				msg += "\n\u00C9 necess\u00E1rio informar o Data de Fim.";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "dtFim" : firstField			
			}
			if (form.getValue("hrInicio") == "" || form.getValue("hrInicio") == null) {
				msg += "\n\u00C9 necess\u00E1rio informar a Hora de Inicio.";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "hrInicio" : firstField			
			}
			if (form.getValue("hrFim") == "" || form.getValue("hrFim") == null) {
				msg += "\n\u00C9 necess\u00E1rio informar a Hora de Fim.";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "hrFim" : firstField			
			}
			if (form.getValue("dsQuantidadeSolicitacao") == "" || form.getValue("dsQuantidadeSolicitacao") == null) {
				msg += "\n\u00C9 necess\u00E1rio informar a Quantidade Solicitada.";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "dsQuantidadeSolicitacao" : firstField			
			}
			if (form.getValue("dsQuantidadeSolicitacao") <= 0 || (form.getValue("dsQuantidadeDisponivel") < form.getValue("dsQuantidadeSolicitacao"))) {
				msg += "\n\u00C9 necess\u00E1rio rever a Quantidade Solicitada!";
				correctPosition = correctPosition == null ? 22 : correctPosition;
				firstField = firstField == null ? "dsQuantidadeSolicitacao" : firstField			
			}
		}
		
	}
	
	if (numState == 5 ) {
		if (form.getValue("slAprova") == "Reprovado" && form.getValue("dsObsAprova") == ""){
			msg += "É necessário informar o motivo da reprovação!";
		}
		
		if (form.getValue("slAprova") == "Refazer" && form.getValue("dsObsAprova") == ""){
			msg += "É necessário informar o motivo de refazer solicitação!";
		}
	}
		
	if (msg != "") {
		throw (msg);
	}
	
//	throw ("Estamos em manutenção!");
}
function hasCheckboxChecked(fields) {
	for (var i = 0; i < fields.length; i++) {
		if ($("#" + fields[i]).prop("checked"))
			return true;
	}
	return false;
}

function autoScroll(field, correctPosition) {
	$('html, body').animate({
		scrollTop : $("#" + field).offset().top - correctPosition
	}, 1000);
}