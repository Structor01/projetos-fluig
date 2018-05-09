function beforeTaskSave(colleagueId,nextSequenceId,userList){
	if (nextSequenceId == 5) {
		var attachments = hAPI.listAttachments();
		log.info("total="+attachments.size());
		if(attachments.size() == 0) throw "Por favor, insira o comprovante em anexo!";

		// for ( var i = 0; i < attachments.size(); i++) {
		// 	var docDto = attachments.get(i);
    //
		// 	// 7 = Anexo de workflow
		// 	if (docDto.getDocumentType() == "7") {
    //
		// 		docAPI.copyDocumentToUploadArea(docDto.getDocumentId(), docDto.getVersion());
    //
		// 		// Criar uma pasta para armazenar os anexos como documentos, concedendo à mesma as permissões de segurança e aprovação necessárias
		// 		docDto.setParentDocumentId(20);
		// 		var documentId = docDto.getDocumentId();
		// 		docDto.setDocumentId(documentId);
		// 		var attachArray = new java.util.ArrayList();
		// 		var mainAttach = docAPI.newAttachment();
		// 		mainAttach.setFileName(docDto.getPhisicalFile());
		// 		mainAttach.setPrincipal(true);
		// 		mainAttach.setAttach(false);
		// 		attachArray.add(mainAttach);
    //
		// 		// Adicionando aprovadores
		// 		docDto.setActiveVersion(true);
		// 		docDto.setColleagueId(getValue("WKUser")); // Informar o usuário logado.
		// 		docDto.setPublisherId(getValue("WKUser")); // Informar o publicador.
    //
		// 		var aprovador = docAPI.newApproverDto();
		// 		aprovador.setCompanyId(getValue("WKCompany"));
		// 		aprovador.setColleagueId(getValue("WKUser")); // Informar o aprovador
		// 		aprovador.setDocumentId(documentId);
		// 		aprovador.setVersion(1); // Versão do documento
		// 		aprovador.setLevelId(1); // Nível de aprovação
		// 		aprovador.setApproverType(1); //Tipo de aprovadores (0 = Colaboradores, 1 = Grupo)
		// 		var aprovadoresArray = new java.util.ArrayList();
		// 		aprovadoresArray.add(aprovador);
    //
		// 		try {
		// 			var doc = docAPI.createDocument(docDto, attachArray, null, aprovadoresArray,null);
		// 			log.info("DOCUMENTO CRIADO COM O ID: " + doc.getDocumentId());
		// 		} catch (e) {
		// 			log.error("Problemas na criação do documento:\n" + e);
		// 		}
		// 	}
		// }
	}
}
