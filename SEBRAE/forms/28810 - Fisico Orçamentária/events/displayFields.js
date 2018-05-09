function displayFields(form, customHTML) {
	var state = getValue("WKNumState");
	var processo = getValue("WKNumProces");
	var usuario = getValue("WKUser");
	
	form.setValue('txtCodSolicitacao',processo);
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	log.info("Usuário: " + usuario);
	
///login do usuario ////

	     // Obtendo o usuario via dataset //
	     filter = new java.util.HashMap();
	     filter.put("colleaguePK.colleagueId",usuario);
	     usuario = getDatasetValues('colleague',filter);
	     log.info("UsuárioNovo: " + usuario);
	     form.setValue('loginSolicitante',usuario.get(0).get("login"));
//fimn login ///
	customHTML.append("<script> var FORM_MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + ((form.getFormMode() == "VIEW") ? null : state) + "';</script>");
	customHTML.append("<script> var DEF_VERSION = '" + getValue("WKVersDef") + "';</script>");
}
