function enableFields(form){ 
	var state = getValue("WKNumState");
	var fields = new Array();
	
	
	
	if (state != 4 && state != 0){
		disableAllFields(form);
		
		if (state == 5){
		fields = ["slAprova", "dsObsAprova"];
	
			if(fields.length > 0){ 
				enableFieldsFromList(form, fields);
			}
		}
	}
	
	if (state == 4 || state == 0){
		form.setEnabled("slAprova", false, false);
		form.setEnabled("dsObsAprova", false, false);
	}
	
	
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