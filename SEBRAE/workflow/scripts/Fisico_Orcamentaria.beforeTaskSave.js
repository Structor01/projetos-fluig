function beforeTaskSave(colleagueId,nextSequenceId,userList){
	var state = getValue("WKNumState");
	var histGerente = hAPI.getCardValue("cpHistGerencia");
	var histOrc = hAPI.getCardValue("cpHistOrc");
	var histUge = hAPI.getCardValue("cpHistUGE");
	
	if (hAPI.getCardValue("cpObsGerencia") != "" && state == 9)
	{
		histGerente += "Em " + hAPI.getCardValue("dtAutorizaGer") + " - Observação Gerente: " + hAPI.getCardValue("cpObsGerencia") + "\n"; 
		hAPI.setCardValue("cpHistGerencia",histGerente);
	}
	if (hAPI.getCardValue("ObsValidadorOrc") != "" && state == 18)
	{
		histOrc += "Em " + hAPI.getCardValue("dtValidaOrc") + " - Observação Gerente: " + hAPI.getCardValue("ObsValidadorOrc") + "\n"; 
		hAPI.setCardValue("cpHistOrc",histOrc);
	}
	if (hAPI.getCardValue("cpParecerUGE") != "" && state == 24)
	{
		histUge += "Em " + hAPI.getCardValue("dtParecerUGE") + " - Observação Gerente: " + hAPI.getCardValue("cpParecerUGE") + "\n"; 
		hAPI.setCardValue("cpHistOrc",histUge);
	}
	

	
	var thread = hAPI.getActualThread(getValue("WKCompany"), getValue("WKNumProces"), state);
	if(state == ANALISAR_SOLICITACAO_FISICO_ORCAMENTARIA && nextSequenceId != ANALISAR_SOLICITACAO_FISICO_ORCAMENTARIA){
		hAPI.setTaskComments(colleagueId, getValue("WKNumProces"), thread, hAPI.getCardValue("cpObsGerencia"));
	}else if(state == VERIFICAR_CENARIO_RECURSOS && nextSequenceId != VERIFICAR_CENARIO_RECURSOS){
		hAPI.setTaskComments(colleagueId, getValue("WKNumProces"), thread, hAPI.getCardValue("ObsValidadorOrc"));
	}else if(state == EMITIR_PARECER_GERENCIA_UGE && nextSequenceId != EMITIR_PARECER_GERENCIA_UGE){
		hAPI.setTaskComments(colleagueId, getValue("WKNumProces"), thread, hAPI.getCardValue("cpParecerUGE"));
	}else if(state == AUTORIZAR_SOLICITACAO_ALTERACAO && nextSequenceId != AUTORIZAR_SOLICITACAO_ALTERACAO){
		hAPI.setTaskComments(colleagueId, getValue("WKNumProces"), thread, hAPI.getCardValue("cpObsSuper"));
	}else if(state == ALTERAR_PROJETO_SGE && nextSequenceId != ALTERAR_PROJETO_SGE){
		hAPI.setTaskComments(colleagueId, getValue("WKNumProces"), thread, hAPI.getCardValue("cpConsideraSolic"));
	}
	
}