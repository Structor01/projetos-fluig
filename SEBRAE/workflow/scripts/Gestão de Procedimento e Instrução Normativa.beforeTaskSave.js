
var thisActivity	= 0;
var processNumber	= 0;
var activeUser		= "";
var companyId		= 0;

var history	= "";

function beforeTaskSave(colleagueId,nextSequenceId,userList){

	log.info("FRE ### ... beforeTaskSave");

	thisActivity 	= new java.lang.Integer(getValue("WKNumState"));
	processNumber  	= new java.lang.Integer(getValue("WKNumProces"));
	activeUser  	= getValue("WKUser");

//	companyId  		= new java.lang.Integer(getValue("WKCompany"));

	if(thisActivity == 95){

		log.info("FRE ### INICIANDO PROCESSO DE GERAÇÂO DE PDF ###");

		var tipo_documento = hAPI.getCardValue("sl_natureza");
		var aprovador_superintendente = hAPI.getCardValue("hd_user4SignBySuper");
		var aprovador_diraf = hAPI.getCardValue("hd_user4SignByDiarf");
		var aprovador_diret = hAPI.getCardValue("hd_user4SignByDiret");
		var nomeDoArquivo = hAPI.getCardValue("txt_nomeProcedimentoInstrucao");
		var anexos = hAPI.getCardValue("hd_nrArquivosAnexos");
		
		// CABEÇALHO DA INSTRUÇÃO NORMATIVA
		var cabecalhoInstrucao = "";
		if(tipo_documento == "instrucao"){
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("txt_unidade") + ",";
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("txt_nomeMacroProcesso") + ",";
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("sl_natureza") + ",";
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("txt_referenciaAnterior") + ",";
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("hd_newVersionRevision") + ",";

			if(hAPI.getCardValue("hd_originalDateCreationSolic") != "" || hAPI.getCardValue("hd_originalDateCreationSolic") == undefined){
				cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("hd_originalDateCreationSolic") + ",";
			} else {
				cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("txt_dataSolicitacao") + ",";
			}

			if(hAPI.getCardValue("hd_originalDateCreationSolic") != "" || hAPI.getCardValue("hd_originalDateCreationSolic") == undefined){
				cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("hd_todayDate4PDFdatarevisao") + ",";
			} else {
				cabecalhoInstrucao = cabecalhoInstrucao + "  -  " + ",";
			}

//			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("nm_numProcessoSolic");
			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("txt_sequencia");
		}
		
		// CABEÇALHO DO PROCEDIMENTO
		var cabecalhoProcedimento = "";
		if(tipo_documento == "procedimento"){
			cabecalhoProcedimento = cabecalhoProcedimento + hAPI.getCardValue("txt_nomeProcedimentoInstrucao") + ",";
			cabecalhoProcedimento = cabecalhoProcedimento + hAPI.getCardValue("hd_newVersionRevision") + ",";

			if(hAPI.getCardValue("hd_originalDateCreationSolic") != "" || hAPI.getCardValue("hd_originalDateCreationSolic") == undefined){
				cabecalhoProcedimento = cabecalhoProcedimento + hAPI.getCardValue("hd_originalDateCreationSolic") + ",";
			} else {
				cabecalhoProcedimento = cabecalhoProcedimento + hAPI.getCardValue("txt_dataSolicitacao") + ",";
			}

			if(hAPI.getCardValue("hd_originalDateCreationSolic") != "" || hAPI.getCardValue("hd_originalDateCreationSolic") == undefined){
				cabecalhoProcedimento = cabecalhoProcedimento + hAPI.getCardValue("hd_todayDate4PDFdatarevisao");
			} else {
				cabecalhoProcedimento = cabecalhoProcedimento + "  -  " + ",";
			}
		}
		var ehAlteracao = "novo";
		if(hAPI.getCardValue("hd_isProcInstrucChanges") == "true"){
			ehAlteracao   = "alteracao";

		}
		var numeroDocumentoAlterar = 0;
		if(hAPI.getCardValue("hd_docIdRefAnt") != ""){
			numeroDocumentoAlterar = hAPI.getCardValue("hd_docIdRefAnt"); //ou ZERO hd_docIdRefAnt
		}

		// Identifica tipo de Alteração
		if(hAPI.getCardValue("hd_isProcInstrucChanges") == "true"){
			var tipoAlteracao = hAPI.getCardValue("hd_versionType");
		} else {
			var tipoAlteracao = 0; 
		}

		//GERACAO DE PDF
		var retorno = "";
//		var filhos = "";    

		try{
			var pdfServiceProvider = ServiceManager.getServiceInstance("WSSebraePDF");
			var pdfServiceLocator  = pdfServiceProvider.instantiate("br.com.sebraego.ws.WSPDFServiceService");
			var pdfService         = pdfServiceLocator.getWSPDFServicePort();     

			var filhoGRID = new Array();
			filhoGRID     = buscaIdFilhos(hAPI,"txa_descricao");
			filhoGRID     = ordena(filhoGRID); 
			var linha = "";
			for(var i=0;i<filhoGRID.length;i++){    
				var aux = hAPI.getCardValue("txa_descricao___" + filhoGRID[i]);

				var auxArray = aux.split("\n");   

				for (var j=0;j<auxArray.length;j++){     
					if (auxArray[j].trim() != ""){
						linha = linha + auxArray[j] + "<QUEBRA_LINHA>";
					}else{
						linha = linha + "<QUEBRA_LINHA>";
					}
				}
			}
			//retorno = linha;
			log.info("FRE ### form.getValue('hd_docIdRefAnt'): " + hAPI.getCardValue("hd_docIdRefAnt"));
			log.info("FRE ### numeroDocumentoAlterar: " + numeroDocumentoAlterar);
			var retorno = pdfService.gerarPDF(nomeDoArquivo, tipo_documento,aprovador_superintendente,aprovador_diraf,aprovador_diret,linha,anexos,cabecalhoInstrucao,cabecalhoProcedimento,ehAlteracao,parseInt(numeroDocumentoAlterar),parseInt(tipoAlteracao));	

			hAPI.setCardValue("nome_numero_pdf_gerado",retorno);

			var pdfCreated = retorno.split(";")[0];
			var eMailOK = false;

			// se PDF criado, então envia eMails
			if(parseInt(pdfCreated) > 0){

				log.info("FRE ### INICIANDO PROCESSO DE ENVIO DE eMail ###");

				// ENVIO DE E-Mail
				// obtendo Alterações e Linhas Removidas
				var toEMailHistory = "";

				toEMailHistory		= toEMailHistory + "<pre><b>ALTERAÇÕES REALIZADAS - Análise de Processo</b><br><br>";
				// get Master Grid elements
				var idFilhos = new Array();
				idFilhos = buscaIdFilhos(hAPI,"hd_txaLogDescricao"); 
				idFilhos = ordena(idFilhos);
				if(idFilhos != null){
					for (var i=0; i<idFilhos.length; i++){
						if(idFilhos[i] != null){
							log.info("FRE ### hd_txaLogDescricao idFilhos[i]: " + idFilhos[i]);

							var descricao 	  = hAPI.getCardValue("txa_descricao___"+idFilhos[i]);
							var logDescricao = hAPI.getCardValue("hd_txaLogDescricao___"+idFilhos[i]);

							log.info("FRE ### descricao EM toEMailHistory: " + descricao);
							log.info("FRE ### logDescricao EM toEMailHistory: " + logDescricao);

//							if(descricao != logDescricao && logDescricao != ""){
							if(logDescricao != ""){
								toEMailHistory = toEMailHistory + hAPI.getCardValue("txa_descricao___"+idFilhos[i]) + "<br>";
							}
						}
					}
				}

				// get Master Grid removed lines
				var removedLines 	  = hAPI.getCardValue("hd_linesRemovedFromMGrid");
				// remove caracteres de controle no final do String
				if(removedLines.length > 0) removedLines = removedLines.substring(0, parseInt(removedLines.length) - 5);
				var	removedLinesArray = removedLines.split("@@@@@");

				if(removedLinesArray.length >= 1 && removedLinesArray[0] != ""){
					toEMailHistory 	= toEMailHistory + "<br><b>Linhas Removidas: </b><br>";
					var ix = 1;

					for(var i = 0; i < removedLinesArray.length; i++){
						if(removedLinesArray.length > 0){
							toEMailHistory = toEMailHistory + "<b>LINHA-" + ix + "</b><br>";
						}
						toEMailHistory = toEMailHistory + removedLinesArray[i] + "<br>";
						ix += 1;
					}
				}

				toEMailHistory 	= toEMailHistory + "</pre><hr>";

				var fields = new Array(); 
				fields.push(toEMailHistory); // Alterações	
				fields.push(processNumber); // número da solicitação
				var eMailEnviado = DatasetFactory.getDataset("ds_envia_email", fields, null, null);
				
				if(eMailEnviado.values.length > 0) eMailOK = true;
			}

			log.info("FRE ### Check if everything's okay - geração PDF e envio eMails ");

			var userList = new java.util.ArrayList(); 
//			var userName = getParametrosGerais("WS_USERNAME");
			var codGrupo = "Pool:Group:" + getParametrosGerais("GRUPO_SUPORTE_PDF");
			userList.add(codGrupo); 

			log.info("CODIGO GRUPO " + codGrupo);

			// Check if everything's okay
			if(eMailOK && parseInt(pdfCreated) > 0){

				log.info("FRE ### eMailOK & pdfCreatedOK ");

				history = "As atividades de geração do PDF e envio dos eMails de notificação foram executadas com sucesso.";

				var historicoProcesso = "";
				historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

				historicoProcesso 	= historicoProcesso + "<pre><b>APÓS TRATAMENTO DE ERRO: DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DURANTE GERAÇÃO PDF e ENVIO DE eMails</b>" + "<br><br>";
				var procSuporte		= activeUser;
				historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procSuporte + "<br>";
				historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
				historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
				historicoProcesso 	= historicoProcesso + "</pre><hr>";

				hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

//				hAPI.setAutomaticDecision(new java.lang.Integer(92), userList, history); 

			} else {
				// something wrong occured in PDF creation OR notification eMails sent

				log.info("FRE ### eMail-não-OK OU pdfCreated-não-OK ");

				history = "Essa atividade é automática, em decorrência de ter ocorrido alguma inconsistência na geração do PDF e/ou no envio dos eMails de notificação das alterações.";			

				var historicoProcesso = "";
				historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

				historicoProcesso 	= historicoProcesso + "<pre><b>APÓS TRATAMENTO DE ERRO: DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DURANTE GERAÇÃO PDF e ENVIO DE eMails</b>" + "<br><br>";
				var procSuporte		= activeUser; 
				historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procSuporte + "<br>";
				historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
				historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
				historicoProcesso 	= historicoProcesso + "</pre><hr>";

				hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

				if(!eMailOK){
					throw "Ocorreu algum problema no Envio de eMails de notificação.";
				} else {
					if(!parseInt(pdfCreated) > 0){
						throw "Ocorreu algum problema na Geração do PDF.";
					}
				}
			
//				hAPI.setAutomaticDecision(new java.lang.Integer(95), userList, history);

			}		

		}catch(e){
			log.info("FRE ### Erro ao consultar WebService: " + e);
			
			throw "Ocorreu algum problema na Geração do PDF.";
		}
		log.info("PDF gerado E eMails enviados! (FIM DO PROCESSO)...:");

	}

}

function buscaIdFilhos(hAPI, campo){
	log.info("FREE ### BUSCA FILHOS......:");  
	var formData = new java.util.HashMap();  
	//formData = hAPI.getCardData(hAPI.getCardValue("txt_numSolicitacao"));  
	formData = hAPI.getCardData(getValue("WKNumProces"));  
	//Filtrando e criando um Hash map Apenas com Filhos  
	var it = formData.keySet().iterator();  
	//Hash Map para armazenamento de Filhos...  
	var hpChildren = new java.util.HashMap();   
	while (it.hasNext()) {    
		var key = it.next();   
		if (key.indexOf("___") >= 0) {    
			//Incliu no hash map de filhos    
			hpChildren.put(key, formData.get(key));   
		}  
	}   
	it = hpChildren.keySet().iterator();  
	var childrenList = new java.util.ArrayList();  
	var found;    
	var strComponent = campo+"___";  
	while (it.hasNext()) {   
		var key = it.next();   
		found = false;    
		if (key.indexOf(strComponent) >= 0) {    
			for (var i=0; i< childrenList.size(); i++) {     
				if (childrenList.get(i).equals(key)) {      
					found = true;     
				}    
			}    
			if (!found) {     
				childrenList.add(key);    
			}   
		}  
	}  
	var strIdSon = "";  
	var idFilhos = new Array();  
	for (var i = 0; i < childrenList.size(); i++) {     
		//Codigo do Filho corrente   
		strIdSon = childrenList.get(i).toString().substring(childrenList.get(i).toString().indexOf("___")+3, childrenList.get(i).toString().length());   
		log.info("ID_DO_FILHO..:" + strIdSon);   
		idFilhos.push(strIdSon);  
	}     
	return idFilhos;
}

function ordena(arrayElementos) { 
	for (i=0;i<arrayElementos.length;i++){
		arrayElementos[i] = parseInt(arrayElementos[i].replace("___","")); 
		log.info("Elemento parser...:" + arrayElementos[i]);
	}
	arrayElementos.sort(function(a, b){return a-b});
//	arrayElementos.sort();
	return arrayElementos;
}

function getParametrosGerais(nome_parametro){
	var fields = new Array(); 
	fields.push(nome_parametro);	
	var dtsParametrosGerais = DatasetFactory.getDataset("ds_parametros_gerais_processoProcedimentoInstrucaoNormativa", fields, null, null);
	return dtsParametrosGerais.getValue(0,nome_parametro);
}
