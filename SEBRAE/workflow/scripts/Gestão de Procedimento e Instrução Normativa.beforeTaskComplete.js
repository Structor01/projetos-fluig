
var superDecisionTask 	= 71; 	// atributos avançados do processo
var diarfDecisionTask	= 72; 	// atributos avançados do processo
var diretDecisionTask	= 73; 	// atributos avançados do processo
var parallelTaskCount	= 3;	// atributos avançados do processo
var parallelTasks 		= [superDecisionTask, diarfDecisionTask, diretDecisionTask];

var thisActivity		= 0;
var processNumber		= 0;
var activeUser			= "";
var companyId			= 0;
var thread 				= 0;

var toActivityJoin	= new java.lang.Integer(77); // EXCLUSIVE-JOIN
//var toActivity 		= new java.lang.Integer(0);
var onceGetService 	= false;
var history			= "";
var obs = "";


function beforeTaskComplete(colleagueId,nextSequenceId,userList){
	
	log.info("FRE ### ... beforeTaskComplete");

	thisActivity 	= new java.lang.Integer(getValue("WKNumState"));
	processNumber  	= new java.lang.Integer(getValue("WKNumProces"));
	activeUser  	= getValue("WKUser");

	companyId  		= new java.lang.Integer(getValue("WKCompany"));

	var paralelThread = 0;

	try{
		paralelThread 	= hAPI.getActualThread(companyId, processNumber, thisActivity); // for all activities status report on comments in process history	
		log.info("FRE ### Retorno paralelThread : " + paralelThread);
		log.info("FRE ### activeUser " + activeUser + "   " + "processNumber " + processNumber);
		log.info("FRE ### atividade..:" + thisActivity);
	}catch(e){
		log.info("FRE ### Exceção em getActualThread()");
	}


//	ROTINA DE CRIAÇÃO DO HISTÓRICO/LOG DO PROCESSO

	if (thisActivity == 0 || thisActivity == 4){

		// get timestamp in milliseconds
		// get endTime for 'solicitação' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliSolicitante", tsINmilli);
		// get startTime for 'aprovação ger unidade' activity
		if(parseInt(hAPI.getCardValue("hd_startDTmilliGerUnidade")) == 0) hAPI.setCardValue("hd_startDTmilliGerUnidade", tsINmilli);

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA SOLICITAÇÃO</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Solicitação iniciada por: </b>" + hAPI.getCardValue("txt_solicitante") + "<b> da Unidade : </b>" + hAPI.getCardValue("txt_unidade") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Data: </b>" + hAPI.getCardValue("txt_dataSolicitacao") + "   " + hAPI.getCardValue("txt_horaSolicitacao") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Natureza: </b>" + hAPI.getCardValue("sl_natureza") + "<b>    Macro Processo: </b>" + hAPI.getCardValue("txt_nomeMacroProcesso") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Referência Anterior: </b>" + hAPI.getCardValue("txt_referenciaAnterior") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Título: </b>" + hAPI.getCardValue("txt_titulo") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Nome do Procedimento/Instrução Normativa: </b>" + hAPI.getCardValue("txt_nomeProcedimentoInstrucao") + "</pre>";

		historicoProcesso		= historicoProcesso + "<pre><b>Práticas de Gestão</b><br><br>";

		// get Practice Grid elements
		var idFilhos = new Array();
			idFilhos = buscaIdFilhos(hAPI,"txt_pratGestao");
			idFilhos = ordena(idFilhos);
		if(idFilhos != null){
			for (var i=0; i<idFilhos.length; i++){
				if(idFilhos[i] != null){
					log.info("FRE ### txt_pratGestao idFilhos[i]: " + idFilhos[i]);
//					historicoProcesso 	= historicoProcesso + "<p>Elemento-" + idFilhos[i] + " da Grid principal" + "</p><br>";
					historicoProcesso 	= historicoProcesso + "<p>" + hAPI.getCardValue("txt_pratGestao___"+idFilhos[i]) + "<br>";
				}
			}
		}
		historicoProcesso 	= historicoProcesso + "</pre>";

		historicoProcesso		= historicoProcesso + "<pre><b>Dados da Solicitação</b><br><br>";
		// get Master Grid elements
		var idFilhos = new Array();
			idFilhos = buscaIdFilhos(hAPI,"txa_descricao"); 
			idFilhos = ordena(idFilhos);
		if(idFilhos != null){
			for (var i=0; i<idFilhos.length; i++){
				if(idFilhos[i] != null){
					log.info("FRE ### txa_descricao idFilhos[i]: " + idFilhos[i]);

					historicoProcesso = historicoProcesso + hAPI.getCardValue("txa_descricao___"+idFilhos[i]) + "<br>";

				}
			}
		}
		historicoProcesso 	= historicoProcesso + "</pre><hr>";

		historicoProcesso		= historicoProcesso + "<pre><b>ALTERAÇÕES REALIZADAS - Solicitação</b><br><br>";
		// get Master Grid elements
		var idFilhos = new Array();
			idFilhos = buscaIdFilhos(hAPI,"hd_txaLogDescricao"); 
			idFilhos = ordena(idFilhos);
		if(idFilhos != null){
			for (var i=0; i<idFilhos.length; i++){
				if(idFilhos[i] != null){
					log.info("FRE ### hd_txaLogDescricao idFilhos[i]: " + idFilhos[i]);

					var descricao 	 = hAPI.getCardValue("txa_descricao___"+idFilhos[i]);
					var logDescricao = hAPI.getCardValue("hd_txaLogDescricao___"+idFilhos[i]);

					log.info("FRE ### descricao: " + descricao);
					log.info("FRE ### logDescricao: " + logDescricao);

//					if(descricao != logDescricao && logDescricao != ""){
					if(logDescricao != ""){
						historicoProcesso = historicoProcesso + hAPI.getCardValue("txa_descricao___"+idFilhos[i]) + "<br>";
					}
				}
			}
		}

		// get Master Grid removed lines
		var removedLines 	  = hAPI.getCardValue("hd_linesRemovedFromMGrid");
		if(removedLines.length > 0) removedLines = removedLines.substring(0, parseInt(removedLines.length) - 5);
		var	removedLinesArray = removedLines.split("@@@@@");
		
		if(removedLinesArray.length >= 1 && removedLinesArray[0] != ""){
			historicoProcesso 	= historicoProcesso + "<br><b>Linhas Removidas: </b><br>";
			var ix = 1;

			for(var i = 0; i < removedLinesArray.length; i++){
				if(removedLinesArray.length > 0){
					historicoProcesso = historicoProcesso + "<b>LINHA-" + ix + "</b><br>";
				}
				historicoProcesso = historicoProcesso + removedLinesArray[i] + "<br>";
				ix += 1;
			}
		}

		historicoProcesso 	= historicoProcesso + "</pre><hr>";
		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 41){
		
		// get timestamp in milliseconds
		// get endTime for 'aprovação ger unidade' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliGerUnidade", tsINmilli);
		// get startTime for 'análise unid processo' activity
		if(parseInt(hAPI.getCardValue("hd_startDTmilliAnaliseUP")) == 0) hAPI.setCardValue("hd_startDTmilliAnaliseUP", tsINmilli);
		
		elapsedTime("hd_startDTmilliGerUnidade", "hd_endDTmilliGerUnidade", "hd_elapsedTimeDHMScsvGUnid");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA APROVAÇÃO DA UNIDADE SOLICITANTE" + "</b><br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por aprovação: </b>" + hAPI.getCardValue("txt_responsavelUN") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoUN") + "   " + hAPI.getCardValue("txt_horaAprovacaoUN") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoUN") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorUN") + "</pre><hr>";

		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 50){

		// get timestamp in milliseconds
		// get endTime for 'análise unid processo' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliAnaliseUP", tsINmilli);
		// get startTime for 'aprovação ger unid processo' activity
		if(parseInt(hAPI.getCardValue("hd_startDTmilliGerUP")) == 0) hAPI.setCardValue("hd_startDTmilliGerUP", tsINmilli);
		
		elapsedTime("hd_startDTmilliAnaliseUP", "hd_endDTmilliAnaliseUP", "hd_elapsedTimeDHMScsvAnaliseUP");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA ANÁLISE DA UNIDADE DE PROCESSO</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por análise: </b>" + hAPI.getCardValue("txt_responsavelAUP") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoAUP") + "   " + hAPI.getCardValue("txt_horaAprovacaoAUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoAUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorAUP") + "</pre><hr>";

		historicoProcesso		= historicoProcesso + "<pre><b>Dados da Solicitação</b><br><br>";
		// get Master Grid elements
		var idFilhos = new Array();
			idFilhos = buscaIdFilhos(hAPI,"txa_descricao"); 
			idFilhos = ordena(idFilhos);
		if(idFilhos != null){
			for (var i=0; i<idFilhos.length; i++){
				if(idFilhos[i] != null){
					log.info("FRE ### txa_descricao idFilhos[i]: " + idFilhos[i]);

					historicoProcesso = historicoProcesso + hAPI.getCardValue("txa_descricao___"+idFilhos[i]) + "<br>";

				}
			}
		}
		historicoProcesso 	= historicoProcesso + "</pre><hr>";
		
		historicoProcesso		= historicoProcesso + "<pre><b>ALTERAÇÕES REALIZADAS - Análise de Processo</b><br><br>";
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

					log.info("FRE ### descricao: " + descricao);
					log.info("FRE ### logDescricao: " + logDescricao);

//					if(descricao != logDescricao && logDescricao != ""){
					if(logDescricao != ""){
						historicoProcesso = historicoProcesso + hAPI.getCardValue("txa_descricao___"+idFilhos[i]) + "<br>";
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
			historicoProcesso 	= historicoProcesso + "<br><b>Linhas Removidas: </b><br>";
			var ix = 1;

			for(var i = 0; i < removedLinesArray.length; i++){
				if(removedLinesArray.length > 0){
					historicoProcesso = historicoProcesso + "<b>LINHA-" + ix + "</b><br>";
				}
				historicoProcesso = historicoProcesso + removedLinesArray[i] + "<br>";
				ix += 1;
			}
		}

		historicoProcesso 	= historicoProcesso + "</pre><hr>";
		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 63){
		
		// get timestamp in milliseconds
		// get endTime for 'aprovação ger unid processo' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliGerUP", tsINmilli);
		
		if(hAPI.getCardValue("sl_resultadoAprovacaoUP") == 'aprovado'){
			// get startTime for 'aprovação super' activity
			if(parseInt(hAPI.getCardValue("hd_startDTmilliSuper")) == 0) hAPI.setCardValue("hd_startDTmilliSuper", tsINmilli);
			// get startTime for 'aprovação diarf' activity
			if(parseInt(hAPI.getCardValue("hd_startDTmilliDiarf")) == 0) hAPI.setCardValue("hd_startDTmilliDiarf", tsINmilli);
			// get startTime for 'aprovação diret' activity
			if(parseInt(hAPI.getCardValue("hd_startDTmilliDiret")) == 0) hAPI.setCardValue("hd_startDTmilliDiret", tsINmilli);
		} 
		
		elapsedTime("hd_startDTmilliGerUP", "hd_endDTmilliGerUP", "hd_elapsedTimeDHMScsvGerUP");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA APROVAÇÃO DA UNIDADE DE PROCESSO</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por aprovação: </b>" + hAPI.getCardValue("txt_responsavelUP") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoUP") + "   " + hAPI.getCardValue("txt_horaAprovacaoUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorUP") + "</pre><hr>";

		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 71){
		
		// get timestamp in milliseconds
		// get endTime for 'aprovação super' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliSuper", tsINmilli);

		elapsedTime("hd_startDTmilliSuper", "hd_endDTmilliSuper", "hd_elapsedTimeDHMScsvSuper");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA APROVAÇÃO DA SUPERINTENDÊNCIA</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por aprovação: </b>" + hAPI.getCardValue("txt_responsavelSUP") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoSUP") + "   " + hAPI.getCardValue("txt_horaAprovacaoSUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoSUP") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorSUP") + "</pre><hr>";

		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 72){
		
		// get timestamp in milliseconds
		// get endTime for 'aprovação diarf' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliDiarf", tsINmilli);

		elapsedTime("hd_startDTmilliDiarf", "hd_endDTmilliDiarf", "hd_elapsedTimeDHMScsvDiarf");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA APROVAÇÃO DA DIARF</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por aprovação: </b>" + hAPI.getCardValue("txt_responsavelDiarf") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoDiarf") + "   " + hAPI.getCardValue("txt_horaAprovacaoDiarf") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoDiarf") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorDiarf") + "</pre><hr>";

		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 73){
		
		// get timestamp in milliseconds
		// get endTime for 'aprovação diret' activity
		var tsINmilli = Number(new Date());
		hAPI.setCardValue("hd_endDTmilliDiret", tsINmilli);
		
		elapsedTime("hd_startDTmilliDiret", "hd_endDTmilliDiret", "hd_elapsedTimeDHMScsvDiret");

		var historicoProcesso = "";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

		historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DA APROVAÇÃO DA DIRET</b>" + "<br><br>";
		historicoProcesso 	= historicoProcesso + "<b>Responsável por aprovação: </b>" + hAPI.getCardValue("txt_responsavelDiret") + "<b>  em ...: </b>" + hAPI.getCardValue("txt_dataAprovacaoDiret") + "   " + hAPI.getCardValue("txt_horaAprovacaoDiret") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + hAPI.getCardValue("sl_resultadoAprovacaoDiret") + "<br>";
		historicoProcesso 	= historicoProcesso + "<b>Observação: </b><br><br>";
		historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsAprovadorDiret") + "</pre><hr><br>";

		hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	}

	if (thisActivity == 41){

		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelUN") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoUN") + "\n\n";
		obs = obs + "Observações..: " + hAPI.getCardValue("txa_obsAprovadorUN")  + "\n\n";

		obs = obs + getValue("WKUserComment");
		//  hAPI.setTaskComments(activeUser, processNumber,paralelThread, obs);
	}

	if (thisActivity == 50){

		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelAUP") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoAUP") + "\n\n";
		obs = obs + "Observações..: " + hAPI.getCardValue("txa_obsAprovadorAUP")  + "\n\n";

		obs = obs + getValue("WKUserComment");
		//  hAPI.setTaskComments(activeUser, processNumber,paralelThread, obs);
	}

	if (thisActivity == 63){

		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelUP") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoUP") + "\n\n";
		obs = obs + "Observações..: " + hAPI.getCardValue("txa_obsAprovadorUP")  + "\n\n";

		obs = obs + getValue("WKUserComment");

	}

	if (thisActivity == 71){

		if(hAPI.getCardValue("sl_resultadoAprovacaoSUP") == 'aprovado'){
			hAPI.setCardValue("hd_user4SignBySuper", activeUser);
		}

		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelSUP") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoSUP") + "\n\n";
		if(hAPI.getCardValue("sl_resultadoAprovacaoSUP") != 'selecione'){
			obs = obs + "Observações..: " + hAPI.getCardValue("txa_obsAprovadorSUP")  + "\n\n";
		}

		obs = obs + getValue("WKUserComment");

	}

	if (thisActivity == 72){
		if(hAPI.getCardValue("sl_resultadoAprovacaoDiarf") == 'aprovado'){
			hAPI.setCardValue("hd_user4SignByDiarf", activeUser);
		}
		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelDiarf") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoDiarf") + "\n\n";
		if(hAPI.getCardValue("sl_resultadoAprovacaoDiarf") != 'selecione'){
			obs = obs + "Observações..: " + hAPI.getCardValue("txa_obsAprovadorDiarf")  + "\n\n";
		}
		obs = obs + getValue("WKUserComment");
	}
/*	
	if(thisActivity == 90){
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

			cabecalhoInstrucao = cabecalhoInstrucao + hAPI.getCardValue("nm_numProcessoSolic");
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
//			var retorno = pdfService.gerarPDF(nomeDoArquivo, tipo_documento,aprovador_superintendente,aprovador_diraf,aprovador_diret,linha,anexos,cabecalhoInstrucao,cabecalhoProcedimento,ehAlteracao,parseInt(numeroDocumentoAlterar),parseInt(tipoAlteracao));	

			hAPI.setCardValue("nome_numero_pdf_gerado",retorno);

			var pdfCreated = retorno.split(";")[0];
			var eMailOK = false;

			// se PDF criado, então envia eMails
			if(parseInt(pdfCreated) > 0){

				// ENVIO DE E-Mail
				// obtendo Alterações e Linhas Removidas
				var toEMailHistory = "";

				toEMailHistory		= toEMailHistory + "<pre><b>ALTERAÇÕES REALIZADAS - Análise de Processo</b><br><br>";
				// get Master Grid elements
				var idFilhos = buscaIdFilhos(hAPI,"hd_txaLogDescricao"); 
				idFilhos.sort();
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

			// Check if everything's okay
			if(eMailOK && parseInt(pdfCreated) > 0){
				moveGo92or95(92); // move to end, everything's okay
			} else {
				// something wrong occured in PDF creation OR notification eMails sent
				moveGo92or95(95); // move to checking what's up
			}

		}catch(e){
			log.info("Erro ao consultar WebService: " + e);
		}
		log.info("PDF gerado E eMails enviados! (FIM DO PROCESSO)...:");

	}
*/
	if (thisActivity == 73){

		if(hAPI.getCardValue("sl_resultadoAprovacaoDiret") == 'aprovado'){
			hAPI.setCardValue("hd_user4SignByDiret", activeUser);
		}

		obs = "";
		obs = obs + "Atuou..: "    + hAPI.getCardValue("txt_responsavelDiret") + "\n\n";
		obs = obs + "STATUS..: "    + hAPI.getCardValue("sl_resultadoAprovacaoDiret") + "\n\n";
		if(hAPI.getCardValue("sl_resultadoAprovacaoDiret") != 'selecione'){
			obs = obs + "Observações..: " + hAPI.getCardValue("sl_resultadoAprovacaoDiret")  + "\n\n";
		}

		obs = obs + getValue("WKUserComment");

	}

	// ÍNICIO CÓDIGO 'reprovado' OR 'retorna'
	if(thisActivity == 71 && 
			(hAPI.getCardValue('sl_resultadoAprovacaoSUP') == "reprovado" || hAPI.getCardValue('sl_resultadoAprovacaoSUP') == "retorna")){
		log.info('FRE ### thisActivity == 71');
		moveGo72orNot(hAPI.getCardValue('sl_resultadoAprovacaoSUP'));
		moveGo73orNot(hAPI.getCardValue('sl_resultadoAprovacaoSUP'));	
	}

	if(thisActivity == 72 && 
			(hAPI.getCardValue('sl_resultadoAprovacaoDiarf') == "reprovado" || hAPI.getCardValue('sl_resultadoAprovacaoDiarf') == "retorna")){
		log.info('FRE ### thisActivity == 72');
		moveGo71orNot(hAPI.getCardValue('sl_resultadoAprovacaoDiarf'));
		moveGo73orNot(hAPI.getCardValue('sl_resultadoAprovacaoDiarf'));	
	}

	if(thisActivity == 73 && 
			(hAPI.getCardValue('sl_resultadoAprovacaoDiret') == "reprovado" || hAPI.getCardValue('sl_resultadoAprovacaoDiret') == "retorna")){
		log.info('FRE ### thisActivity == 73');
		moveGo71orNot(hAPI.getCardValue('sl_resultadoAprovacaoDiret'));
		moveGo72orNot(hAPI.getCardValue('sl_resultadoAprovacaoDiret'));	
	}	
}
/*
function moveGo92or95(status){

	log.info('FRE ### moveGo92or95 == status ...: ' + status);
	thread = 6; // brutal force definning frequent thread for testing purpose

	if(status == '92'){
		toActivity 		= 92;
		toActivityJoin 	= 92;
		history = "As atividades de geração do PDF e envio dos eMails de notificação foram executadas com sucesso."; 
	} else {
		// '95' ...
		toActivity 		= 95;
		toActivityJoin 	= 95;
		history = "Essa atividade é automática, em decorrência de ter ocorrido alguma inconsistência na geração do PDF e/ou no envio dos eMails de notificação das alterações."; 
	}

	var historicoProcesso = "";
	historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

	historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DA SUPERINTENDÊNCIA</b>" + "<br><br>";
	var procManagerUser	= getParametrosGerais("USUARIO_GESTOR"); 
	historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procManagerUser + "<br>";
	historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
	historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
	historicoProcesso 	= historicoProcesso + "</pre><hr>";

	hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);

	moveTaskGoAndBack();

}
*/
function moveGo71orNot(status){
	if(hAPI.getCardValue('sl_resultadoAprovacaoSUP') == "selecione" || hAPI.getCardValue('sl_resultadoAprovacaoSUP') == "aprovado"){
		log.info('FRE ### moveGo71orNot == selecione + status ...: ' + status);
		thread = hAPI.getActualThread(companyId, processNumber, superDecisionTask);

		var beforeSetUpNewStatus = hAPI.getCardValue('sl_resultadoAprovacaoSUP');

		if(status == 'reprovado'){
			hAPI.setCardValue("sl_resultadoAprovacaoSUP", 'reprovado');
			history = "Essa atividade é automática, em decorrência de ter ocorrido uma Reprovação em uma das atividades paralelas do fluxo, todas as paralelas são reprovadas em simultâneo."; 
		} else {
			// 'retorna' ...
			hAPI.setCardValue("sl_resultadoAprovacaoSUP", 'retorna');
			history = "Uma Revisão de Dados foi solicitada em uma das atividades paralelas do fluxo, então, todas as paralelas são encaminhadas em simultâneo para a atividade Análise da Unidade de Processos.";   
		}

		if(beforeSetUpNewStatus == "selecione"){
			// get timestamp in milliseconds
			// get endTime for 'aprovação super' activity
			var tsINmilli = Number(new Date());
			hAPI.setCardValue("hd_endDTmilliSuper", tsINmilli);
			
			elapsedTime("hd_startDTmilliSuper", "hd_endDTmilliSuper", "hd_elapsedTimeDHMScsvSuper");
			
			var historicoProcesso = "";
			historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

			historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DA SUPERINTENDÊNCIA</b>" + "<br><br>";
			var procManagerUser	= getParametrosGerais("USUARIO_GESTOR"); 
			historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procManagerUser + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
			historicoProcesso 	= historicoProcesso + "</pre><hr>";

			hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);
			
			moveTaskGoAndBack();
		} else {
			// se 'aprovado' ... 
		}

	}
}	

function moveGo72orNot(status){
	if(hAPI.getCardValue('sl_resultadoAprovacaoDiarf') == "selecione" || hAPI.getCardValue('sl_resultadoAprovacaoDiarf') == "aprovado"){
		log.info('FRE ### moveGo72orNot == selecione + status ...: ' + status);
		thread = hAPI.getActualThread(companyId, processNumber, diarfDecisionTask);

		var beforeSetUpNewStatus = hAPI.getCardValue('sl_resultadoAprovacaoDiarf');

		if(status == 'reprovado'){
			hAPI.setCardValue("sl_resultadoAprovacaoDiarf", 'reprovado');
			history = "Essa atividade é automática, em decorrência de ter ocorrido uma Reprovação em uma das atividades paralelas do fluxo, todas as paralelas são reprovadas em simultâneo."; 
		} else {
			hAPI.setCardValue("sl_resultadoAprovacaoDiarf", 'retorna');
			history = "Uma Revisão de Dados foi solicitada em uma das atividades paralelas do fluxo, então, todas as paralelas são encaminhadas em simultâneo para Rever Dados.";   
		}

		if(beforeSetUpNewStatus == "selecione"){
			// get timestamp in milliseconds
			// get endTime for 'aprovação diarf' activity
			var tsINmilli = Number(new Date());
			hAPI.setCardValue("hd_endDTmilliDiarf", tsINmilli);
			
			elapsedTime("hd_startDTmilliDiarf", "hd_endDTmilliDiarf", "hd_elapsedTimeDHMScsvDiarf");
			
			var historicoProcesso = "";
			historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

			historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DA DIARF</b>" + "<br><br>";
			var procManagerUser	= getParametrosGerais("USUARIO_GESTOR"); 
			historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procManagerUser + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
			historicoProcesso 	= historicoProcesso + "</pre><hr>";

			hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);
			
			moveTaskGoAndBack();
		} else {
			// se 'aprovado' ... 
		}

	}
}

function moveGo73orNot(status){
	if(hAPI.getCardValue('sl_resultadoAprovacaoDiret') == "selecione" || hAPI.getCardValue('sl_resultadoAprovacaoDiret') == "aprovado"){
		log.info('FRE ### moveGo73orNot == selecione + status ...: ' + status);
		thread = hAPI.getActualThread(companyId, processNumber, diretDecisionTask);

		var beforeSetUpNewStatus = hAPI.getCardValue('sl_resultadoAprovacaoDiret');

		if(status == 'reprovado'){
			hAPI.setCardValue("sl_resultadoAprovacaoDiret", 'reprovado');
			history = "Essa atividade é automática, em decorrência de ter ocorrido uma Reprovação em uma das atividades paralelas do fluxo, todas as paralelas são reprovadas em simultâneo."; 
		} else {
			hAPI.setCardValue("sl_resultadoAprovacaoDiret", 'retorna');
			history = "Uma Revisão de Dados foi solicitada em uma das atividades paralelas do fluxo, então, todas as paralelas são encaminhadas em simultâneo para Rever Dados.";   
		}

		if(beforeSetUpNewStatus == "selecione"){
			// get timestamp in milliseconds
			// get endTime for 'aprovação diret' activity
			var tsINmilli = Number(new Date());
			hAPI.setCardValue("hd_endDTmilliDiret", tsINmilli);
			
			elapsedTime("hd_startDTmilliDiret", "hd_endDTmilliDiret", "hd_elapsedTimeDHMScsvDiret");
			
			var historicoProcesso = "";
			historicoProcesso 	= historicoProcesso + hAPI.getCardValue("txa_obsHistoricoProcesso");

			historicoProcesso 	= historicoProcesso + "<pre><b>DADOS DE MOVIMENTAÇÃO AUTOMÁTICA DA DIRET</b>" + "<br><br>";
			var procManagerUser	= getParametrosGerais("USUARIO_GESTOR"); 
			historicoProcesso 	= historicoProcesso + "<b>Usuário responsável pela movimentação: </b>" + procManagerUser + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>Status da atuação: </b>" + "<br>";
			historicoProcesso 	= historicoProcesso + "<b>" + history + "</b><br><br>";
			historicoProcesso 	= historicoProcesso + "</pre><hr>";

			hAPI.setCardValue("txa_obsHistoricoProcesso", historicoProcesso);
			
			moveTaskGoAndBack();
		} else {
			// se 'aprovado' ... 
		}

	}
}

function moveTaskGoAndBack(){

	instantiateAndGetService();

	try{

		log.info('FRE ### SAVEANDSENDTASK in moveTaskGoAndBack entry point');
		
//		var tempUser 		= getParametrosGerais("USUARIO_GESTOR"); 
//		var procManagerUser = "Pool:Role:" + tempUser;
		
		var papelGestor = getParametrosGerais("USUARIO_GESTOR"); 
		
		var c1 = DatasetFactory.createConstraint("workflowColleagueRolePK.roleId", papelGestor, papelGestor, ConstraintType.MUST);
		var constraints = new Array(c1);
		var papelUsuarios = DatasetFactory.getDataset("workflowColleagueRole", null, constraints, null);
		
//		var procManagerUser	= getParametrosGerais("USUARIO_GESTOR");
		var procManagerUser	= "";		
		
		if(papelUsuarios.values.length > 0) {
			while (procManagerUser == "") {
//				procManagerUser = papelUsuarios.values[0]["workflowColleagueRolePK.colleagueId"];
				
				log.info("FRE ### workflowColleagueRolePK.colleagueId " + papelUsuarios.getValue(0, "workflowColleagueRolePK.colleagueId"));
				
				procManagerUser = papelUsuarios.getValue(0, "workflowColleagueRolePK.colleagueId");

			}
		}
		
		var userName 		= getParametrosGerais("WS_USERNAME");
		var userPass 		= getParametrosGerais("WS_PASSWORD");
		
		var resultado  = workflowService.saveAndSendTask(
				userName, 			// string Username 
				userPass, 	 		// string Password
				companyId, 			// int Companyid = Id da Empresa
				processNumber,  	// int ProcessInstanceId = Numero do processo
				toActivityJoin,    	// int ChoosedState = Atividade destino
				usuario, 			// stringArray ColleagueIds = Usuário que receberá a tarefa
				history,			// string comments: comentários
				procManagerUser,	// string userId: usuário que vai executar a tarefa			 
				true,				// boolean completeTask: indica se deve completar a tarefa (true) ou somente salvar (false) 
				attachments,		// attachments 
				cardData, 			// stringArray cardData: dados do registro de formulário 
				appointmentDto,	// appointment: apontamentos da tarefa 
				true,				// boolean managerMode: indica se usuário esta executando a tarefa como gestor do processo 
				thread);			// int threadSequence: Indica se existe atividade paralela no processo. Se não existir o valor é 0 (zero), caso exista, este valor pode ser de 1 a infinito dependendo da quantidade de atividade paralelas existentes no processo.

		log.info("FRE ### SAVEANDSENDTASK resultado in moveTaskGoAndBack : " + resultado);

	}catch(e){
		log.info("FRE ### ERRO na saveAndSendTask in moveTaskGoAndBack - thisActivity / thread : " + "   " + thisActivity + "   " + thread +  "   " + e);
	}

}

function instantiateAndGetService(){

	log.info('FRE ### SERVICE na instantiateAndGetService entry point');

	try{

		workflowServiceManager = ServiceManager.getService("WorkflowEngineService");
		serviceHelper 		   = workflowServiceManager.getBean();
		serviceLocator 		   = serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ECMWorkflowEngineServiceService");
		workflowService 	   = serviceLocator.getWorkflowEngineServicePort();

		attachments 	= serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessAttachmentDtoArray");
		appointmentDto 	= serviceHelper.instantiate("com.totvs.technology.ecm.workflow.ws.ProcessTaskAppointmentDtoArray");
		cardData  		= serviceHelper.instantiate("net.java.dev.jaxb.array.StringArrayArray");

		usuario  			= serviceHelper.instantiate("net.java.dev.jaxb.array.StringArray");
//		var procManagerUser	= getParametrosGerais("USUARIO_GESTOR"); 
//		usuario.getItem().add(procManagerUser);
		usuario.getItem().add(activeUser);

	}catch(e){		
		log.info('FRE ### ERRO nos Serviços para a saveAndSendTask in instantiateAndGetService :' + "   " + thread +  "   " + e);		
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

function elapsedTime(startDate, endDate, elapsed){
	// Set the unit values in milliseconds.  
	var msecPerMinute = 1000 * 60;  
	var msecPerHour = msecPerMinute * 60;  
	var msecPerDay = msecPerHour * 24;  

	// Set an interval date and get the milliseconds  
	var date  = new Date(parseInt(hAPI.getCardValue(startDate)));  
	var dateMsec = date.getTime(); 
	log.info(" dateMsec : " + dateMsec );
	
	var dateX = new Date(parseInt(hAPI.getCardValue(endDate)));  
	var dateXMsec = dateX.getTime();
	log.info(" dateXMsec : " + dateXMsec );

	// Get the difference in milliseconds.  
	var interval = dateXMsec - dateMsec;  

	// Calculate how many days the interval contains. Subtract that  
	// many days from the interval to determine the remainder.  
	var days = Math.floor(interval / msecPerDay );  
	interval = interval - (days * msecPerDay );  

	// Calculate the hours, minutes, and seconds.  
	var hours = Math.floor(interval / msecPerHour );  
	interval = interval - (hours * msecPerHour );  

	var minutes = Math.floor(interval / msecPerMinute );  
	interval = interval - (minutes * msecPerMinute );  

	var seconds = Math.floor(interval / 1000 );  

	// Display the result.  
	log.info("FRE ###" + days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds."); 
	
	var retElapsed = days + "," + hours + "," + minutes  + "," + seconds;
	hAPI.setCardValue(elapsed, retElapsed);
}