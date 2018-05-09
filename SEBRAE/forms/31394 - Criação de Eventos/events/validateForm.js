function validateForm(form){
	var message = "";
	var numActivity = getValue("WKNumState");
	var numNextActivity = getValue("WKNextState");
	var numProces = getValue("WKNumProces");
	
	
	if (numActivity == 0 || numActivity == 4){
		
		/*Validando inputs*/
		var inputs = [
		               ['dsNome','Nome Evento'],
		               ['dsUf','UF do Evento'],
		               ['dsCidade','Cidade do Evento'],
		               ['dsLocal','Local'],
		               ['dsEndereco','Endereço'],
		               ['dtInicio','Data Inicial do Evento'],
		               ['hrInicio','Hora Inicial do Evento'],
		               //['dsTipoEvento','Tipo do Evento'],
		               //['dsUnidadeEvento','Unidade do Evento'],
		               ['dsResponsavel','Responsável do Evento']
		           ];
		
		for (var key in inputs) {
			message = validateValue(form, inputs[key][0], inputs[key][1], message)
		}
	}	
	
	if(message != "") {
		throw message;
	}
}

/*Validando values inputs*/
function validateValue (form, id, type, message){
	if(form.getValue(id) == "" || form.getValue(id) == null) {
		message = message +  " <br> Informe o campo '"+type+"'. " ;			
	}
	
	return message;
}