function beforeStateEntry(sequenceId){
	if(sequenceId == ANALISAR_SOLICITACAO_FISICO_ORCAMENTARIA){
		var attachments = hAPI.listAttachments();
		if(attachments.size() == 0)
			throw "\u00C9 necess\u00E1rio anexar o Arquivo de Evid\u00EAncia da Necessidade.";
	}
}