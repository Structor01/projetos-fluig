TransitionData2Form.enableFields = function(){
	
	// Se o fichário está sendo visualizado
	if( getWDMetodo() == 'VIEW'){
		Ext.getCmp('principal').add(tabChamado);
		Ext.getCmp('principal').add(tabAtendimento);
		Ext.getCmp('principal').add(tabAvaliacao);
		Ext.getCmp('principal').setActiveTab(0);
		Ext.getCmp('principal').doLayout();
		
		copyDataFields();
		
		TransitionData2Form.doDisable(TransitionData2Form.bpms,true);
		loadData();
		return false;
	}
	
	var iAtividade = parseInt(getWKNumState());
	
	if(iAtividade == 0 || iAtividade == 1){
		Ext.getCmp('principal').add(tabChamado);
		Ext.getCmp('principal').setActiveTab(0);
		Ext.getCmp('principal').doLayout();
		
		
		if(Ext.getCmp('hashpai').getValue().trim() == "")
			Ext.getCmp('hashpai').setValue(TransitionData2Form.returnHash());
		
		Ext.getCmp('datSolicitacao').setValue(getCurrentDate());
		Ext.getCmp('matSolicitante').setValue(getWKUser());
		Ext.getCmp('nomSolicitante').setValue(getWKUserName());
		Ext.getCmp('staSolicitacao').setValue("Aberto");
		Ext.getCmp('numTelefone').setValue(getWKUserExtensionNr());
		
		TransitionData2Form.insertMandatory('unidade','O campo [Unidade] é obrigatório!');
		TransitionData2Form.insertMandatory('telefone','O campo [Fone de Contato] é obrigatório!');
		TransitionData2Form.insertMandatory('prioridade','O campo [Prioridade] é obrigatório!');
		
		Ext.getCmp('desChamado').focus();
		
		Ext.Ajax.request({
			url: '/SEBRAEGOHelpDesk/services/getUserUnidade.jsp',
			success: function(response){
				var obj = Ext.decode(response.responseText);
				
				if(obj.result.length > 0){
					if(obj.result[0].CODSECAO.trim() != ""){
						Ext.getCmp('codUnidade').setValue(obj.result[0].CODSECAO);
						Ext.getCmp('desUnidade').setValue(obj.result[0].DESCRICAO);
					}
				}
			},
			params: {
				usuario: getWKUserLogin()
			}
		});
	}
	
	if(iAtividade == 2){
		Ext.getCmp('principal').add(tabChamado);
		Ext.getCmp('principal').add(tabAtendimento);
		Ext.getCmp('principal').setActiveTab(1);
		Ext.getCmp('principal').doLayout();
		
		Ext.getCmp('datFimAteNivel1').setValue(getCurrentDate());
		Ext.getCmp('matResAteNivel1').setValue(getWKUser());
		Ext.getCmp('nomResAteNivel1').setValue(getWKUserName());
		
		if(document.forms[0].msgError.value.trim() == ""){
			Ext.getCmp('desAcaAteNivel1').setValue('');
			Ext.getCmp('desAnaAteNivel1').setValue('');
		}
		
		TransitionData2Form.insertMandatory('acaAteNivel1','O campo [Ação] é obrigatório!');
		
		if(Ext.getCmp('desAcaAteNivel1').getValue() && Ext.getCmp('desAcaAteNivel1').getValue() != ''){
			var combo = Ext.getCmp('desAcaAteNivel1');
			var index = combo.getStore().find('codigo',combo.getValue());
			var record = combo.getStore().getAt(index);
			
			obrigarClassificacao(combo,record,index);
		}
		
		TransitionData2Form.doDisable('fsIdentificacao',true);
		TransitionData2Form.doDisable('fsDefinicao',true);
		TransitionData2Form.doDisable('lisAnexos',true);
		Ext.getCmp('fsAvaliacao').setVisible(false);
		
		TransitionData2Form.doDisable('fsAtendimentoNivel2',true);
		TransitionData2Form.doDisable('fsAtendimentoNivel3',true);
	}
	
	if(iAtividade == 3){
		Ext.getCmp('principal').add(tabChamado);
		Ext.getCmp('principal').add(tabAtendimento);
		Ext.getCmp('principal').setActiveTab(1);
		Ext.getCmp('principal').doLayout();
		
		Ext.getCmp('datFimAteNivel2').setValue(getCurrentDate());
		Ext.getCmp('matResAteNivel2').setValue(getWKUser());
		Ext.getCmp('nomResAteNivel2').setValue(getWKUserName());
		
		if(document.forms[0].msgError.value.trim() == ""){
			Ext.getCmp('desAcaAteNivel2').setValue('');
			Ext.getCmp('desAnaAteNivel2').setValue('');
		}
		
		TransitionData2Form.insertMandatory('acaAteNivel2','O campo [Ação] é obrigatório!');
		
		if(Ext.getCmp('desAcaAteNivel2').getValue() && Ext.getCmp('desAcaAteNivel2').getValue() != ''){
			var combo = Ext.getCmp('desAcaAteNivel2');
			var index = combo.getStore().find('codigo',combo.getValue());
			var record = combo.getStore().getAt(index);
			
			obrigarClassificacao(combo,record,index);
		}
		
		TransitionData2Form.doDisable('fsIdentificacao',true);
		TransitionData2Form.doDisable('fsDefinicao',true);
		TransitionData2Form.doDisable('lisAnexos',true);
		Ext.getCmp('fsAvaliacao').setVisible(false);
		
		TransitionData2Form.doDisable('fsAtendimentoNivel1',true);
		TransitionData2Form.doDisable('fsAtendimentoNivel3',true);
	}
	
	if(iAtividade == 4){
		Ext.getCmp('principal').add(tabChamado);
		Ext.getCmp('principal').add(tabAtendimento);
		Ext.getCmp('principal').setActiveTab(1);
		Ext.getCmp('principal').doLayout();
		
		Ext.getCmp('datFimAteNivel3').setValue(getCurrentDate());
		Ext.getCmp('matResAteNivel3').setValue(getWKUser());
		Ext.getCmp('nomResAteNivel3').setValue(getWKUserName());
		
		if(document.forms[0].msgError.value.trim() == ""){
			Ext.getCmp('desAcaAteNivel3').setValue('');
			Ext.getCmp('desAnaAteNivel3').setValue('');
		}
		
		TransitionData2Form.insertMandatory('acaAteNivel3','O campo [Ação] é obrigatório!');
		
		if(Ext.getCmp('desAcaAteNivel3').getValue() && Ext.getCmp('desAcaAteNivel3').getValue() != ''){
			var combo = Ext.getCmp('desAcaAteNivel3');
			var index = combo.getStore().find('codigo',combo.getValue());
			var record = combo.getStore().getAt(index);
			
			obrigarClassificacao(combo,record,index);
		}
		
		TransitionData2Form.doDisable('fsIdentificacao',true);
		TransitionData2Form.doDisable('fsDefinicao',true);
		TransitionData2Form.doDisable('lisAnexos',true);
		Ext.getCmp('fsAvaliacao').setVisible(false);
		
		TransitionData2Form.doDisable('fsAtendimentoNivel1',true);
		TransitionData2Form.doDisable('fsAtendimentoNivel2',true);
	}
	
	if(iAtividade == 5){
		
		copyDataFields();
		
		Ext.getCmp('principal').add(tabAvaliacao);
		Ext.getCmp('principal').setActiveTab(0);
		Ext.getCmp('principal').doLayout();
		
		Ext.getCmp('codAvaliacao').setValue(null);
		Ext.getCmp('desComentario').setValue('');
		
		TransitionData2Form.insertMandatory('codAvaliacao','Selecione uma opção para o campo [Avaliação]!');
		
		//tabChamado.body.scroll("down",780,true);
	}
	
	
	if(iAtividade == 2 || iAtividade == 3 || iAtividade == 4){
		// Atualiza status. Não foi feito pelos eventos do processo, pois os eventos não ocorrem quando é retirado do pool (assumir tarefa)
		Ext.Ajax.request({
			url: '/SEBRAEGOHelpDesk/services/setStatus.jsp',
			success: function(){
				Ext.getCmp('staSolicitacao').setValue('Atendendo');
			},
			params: {
				colleagueId: getWKUser(),
				status: 'Atendendo',
				cardId: TransitionData2Form.QueryString('WDNrDocto'),
				version: TransitionData2Form.QueryString('WDNrVersao')
			}
		});
	}
	
	loadData();
};

TransitionData2Form.validateData = function(){
	var msgErro = '';
	
	var iAtividade = parseInt(getWKNumState());
	
	if(iAtividade == 2){
		
		document.forms[0].ultAtendimento.value = "1";
		
		if(Ext.getCmp('desAnaAteNivel1').getValue().trim() == "")
			msgErro += '\n -O campo [Justificativa da Ação] é obrigatório!';
		
		if(Ext.getCmp('desAcaAteNivel1').getValue() && (Ext.getCmp('desAcaAteNivel1').getValue() == 1 || Ext.getCmp('desAcaAteNivel1').getValue() == 7)){
			
			if(!Ext.getCmp('codTipSolicitacao').getValue() || String(Ext.getCmp('codTipSolicitacao').getValue()) == "")
				TransitionData2Form.insertMandatory('codTipSolicitacao','Selecione uma opção para o campo [Tipo de Solicitação]!');
			
			
			if(!Ext.getCmp('codDetalhe').getValue() || String(Ext.getCmp('codDetalhe').getValue()) == "")
				TransitionData2Form.insertMandatory('codDetalhe','Selecione pelo menos uma opção para o campo [Detalhe]!');
			
		}
		
	}
	
	if(iAtividade == 3){
		document.forms[0].ultAtendimento.value = "2";
		
		if(Ext.getCmp('desAnaAteNivel2').getValue().trim() == "")
			msgErro += '\n -O campo [Justificativa da Ação] é obrigatório!';
		
		if(Ext.getCmp('desAcaAteNivel2').getValue() && (Ext.getCmp('desAcaAteNivel2').getValue() == 1 || Ext.getCmp('desAcaAteNivel2').getValue() == 7)){
			
			if(!Ext.getCmp('codTipSolicitacao').getValue() || String(Ext.getCmp('codTipSolicitacao').getValue()) == "")
				TransitionData2Form.insertMandatory('codTipSolicitacao','Selecione uma opção para o campo [Tipo de Solicitação]!');
			
			
			if(!Ext.getCmp('codDetalhe').getValue() || String(Ext.getCmp('codDetalhe').getValue()) == "")
				TransitionData2Form.insertMandatory('codDetalhe','Selecione pelo menos uma opção para o campo [Detalhe]!');
			
		}
	}
	
	if(iAtividade == 4){
		document.forms[0].ultAtendimento.value = "3";
		
		if(Ext.getCmp('desAnaAteNivel3').getValue().trim() == "")
			msgErro += '\n -O campo [Justificativa da Ação] é obrigatório!';
		
		if(Ext.getCmp('desAcaAteNivel3').getValue() && (Ext.getCmp('desAcaAteNivel3').getValue() == 1 || Ext.getCmp('desAcaAteNivel3').getValue() == 7)){
			
			if(!Ext.getCmp('codTipSolicitacao').getValue() || String(Ext.getCmp('codTipSolicitacao').getValue()) == "")
				TransitionData2Form.insertMandatory('codTipSolicitacao','Selecione uma opção para o campo [Tipo de Solicitação]!');
			
			
			if(!Ext.getCmp('codDetalhe').getValue() || String(Ext.getCmp('codDetalhe').getValue()) == "")
				TransitionData2Form.insertMandatory('codDetalhe','Selecione pelo menos uma opção para o campo [Detalhe]!');
			
		}
	}
	
	
	// Obtém as mensagens de validação inseridas no carregamento do form
	msgErro += TransitionData2Form.returnValidationsForm();
	
	if(iAtividade == 0 || iAtividade == 1){
		if(Ext.getCmp('desChamado').getValue().trim() == "")
			msgErro += '\n -O campo [Descrição] é obrigatório!';
	}
	
	
	/*
	if(iAtividade == 2 || iAtividade == 3 || iAtividade == 4){
		if(!Ext.getCmp('codTipSolicitacao').getValue() || Ext.getCmp('codTipSolicitacao').getValue() == '')
			msgErro += '\n -O campo [Tipo da Solicitação] é obrigatório!';
		
		if(!Ext.getCmp('codDetalhe').getValue() || Ext.getCmp('codDetalhe').getValue() == '')
			msgErro += '\n -O campo [Detalhamento] é obrigatório!';
		
	}
	*/
	TransitionData2Form.sendData(msgErro);
};

var loadData = function(){
	tipSolicitacaoStore.load();
	storeAnexos.load();
	
	if(document.forms[0].codTipSolicitacao.value != "")
		detalhamentoStore.load();
	
	// Se campo de Dono foi preenchido, entao deve mostrar este campo em tela
	if(document.forms[0].matNomeado.value != "")
		adicionaColaboradorSolicitante(Ext.getCmp('btnAdiDono'));
	
	
	if(Ext.getCmp('codPrioridade').getValue() && String(Ext.getCmp('codPrioridade').getValue()) != ""){
		var codPrioridade = Ext.getCmp('codPrioridade').getValue();
		
		if(codPrioridade == 1) Ext.getCmp('txtPrioridade').setText("Muito Baixa");
		else if(codPrioridade == 2) Ext.getCmp('txtPrioridade').setText("Baixa");
		else if(codPrioridade == 3) Ext.getCmp('txtPrioridade').setText("Média");
		else if(codPrioridade == 4) Ext.getCmp('txtPrioridade').setText("Alta");
		else if(codPrioridade == 5) Ext.getCmp('txtPrioridade').setText("Muito Alta");
	}
};

var retornaValorBaseConhecimento = function(record,nivel){
	
	Ext.getCmp('desAnaAteNivel' + nivel).setValue(record.get('desAnaAteNivel'));
	
};

var abreConsultaBaseConhecimento = function(nivel){
	
	try{
		ZoomBaseConhecimento.iniciaInterface(retornaValorBaseConhecimento,nivel);
	
	}catch(e){
		var demandScripts = [
			[
				'/SEBRAEGOHelpDesk/zooms/ZoomBaseConhecimento.js',
				function(param){
					ZoomBaseConhecimento.iniciaInterface(param,nivel);
				},
				retornaValorBaseConhecimento
			]
		];

		Ext.ux.OnDemandLoadByAjax.load(demandScripts);
	}
	
};

var alteraTextoHorasUteis = function(combo,record,index){
	switch(record.get("codigo")){
		case 1:
			Ext.getCmp('txtHorasUteis').setText("Tempo previsto para resposta: 40 horas úteis.");
		break;
		case 2:
			Ext.getCmp('txtHorasUteis').setText("Tempo previsto para resposta: 32 horas úteis.");
		break;
		case 3:
			Ext.getCmp('txtHorasUteis').setText("Tempo previsto para resposta: 24 horas úteis.");
		break;
		case 4:
			Ext.getCmp('txtHorasUteis').setText("Tempo previsto para resposta: 16 horas úteis.");
		break;
		case 5:
			Ext.getCmp('txtHorasUteis').setText("Tempo previsto para resposta: 8 horas úteis.");
		break;
	}
};

var abreJanelaTabelaPrioridades = function(obj,e){
	winTabelaPrioridades.show();
};

var abreJanelaMatrizGut = function(obj,e){
	winMatrizGut.show();
};

var carregaDetalhamento = function(combo,record,index){
	Ext.getCmp('codDetalhe').setValue('');
	detalhamentoStore.load();
};

var adicionaColaboradorSolicitante = function(obj,e){
	if(obj.icon == '/BPMSLibs/images/user_add.png'){
		Ext.getCmp('donoChamado').setVisible(true);
		obj.setIcon('/BPMSLibs/images/user_delete.png');
		obj.setTooltip('Remover Dono do Chamado');
	}
	else{
		Ext.getCmp('donoChamado').setVisible(false);
		obj.setIcon('/BPMSLibs/images/user_add.png');
		obj.setTooltip('Adicionar Dono do Chamado');
		
		Ext.getCmp('matNomeado').setValue('');
		Ext.getCmp('nomNomeado').setValue('');
	}
};

var retornarValorColaboradorAdicional = function(registros){
	if(registros.length > 0){
		Ext.getCmp('matNomeado').setValue(registros[0].get("cd_matricula"));
		Ext.getCmp('nomNomeado').setValue(registros[0].get("nm_colaborador"));
	}
};

var abreZoomColaboradorAdicional = function(){
	
	try{
		ZoomColaborador.iniciaInterface(retornarValorColaboradorAdicional);
	}catch(e){
		var demandScripts = [
			[
				'/BPMSLibs/zoom/ZoomColaborador.js',
				function(param){
					ZoomColaborador.iniciaInterface(param);
				},
				retornarValorColaboradorAdicional
			]
		];

		Ext.ux.OnDemandLoadByAjax.load(demandScripts);
	}
	
};

var limpaCamposColaboradorAdicional = function(){
	Ext.getCmp('matNomeado').setValue("");
	Ext.getCmp('nomNomeado').setValue("");
};

var retornarValorUnidade = function(registros){
	if(registros.length > 0){
		Ext.getCmp('codUnidade').setValue(registros[0].get("CODDEPARTAMENTO"));
		Ext.getCmp('desUnidade').setValue(registros[0].get("NOME"));
	}
};

var abreZoomUnidade = function(){
	
	try{
		ZoomUnidade.iniciaInterface(retornarValorUnidade);
	}catch(e){
		var demandScripts = [
			[
				'/SEBRAEGOHelpDesk/zooms/zoomUnidade.js',
				function(param){
					ZoomUnidade.iniciaInterface(param);
				},
				retornarValorUnidade
			]
		];

		Ext.ux.OnDemandLoadByAjax.load(demandScripts);
	}
	
};

var limpaCamposUnidade = function(){
	Ext.getCmp('codUnidade').setValue("");
	Ext.getCmp('desUnidade').setValue("");
	
	TransitionData2Form.insertMandatory('unidade','O campo [Unidade] é obrigatório!');
};

var incluirAnexo = function(){
	
	if (String(Ext.getCmp('desHistorico').getValue()).trim() == '') {
		alert('Campo [Histórico] é obrigatório! ');
		Ext.getCmp('desHistorico').focus();
		return false;
	}
	
	if (String(Ext.getCmp('desArquivo').getValue()).trim() == '') {
		alert('Campo [Arquivo] é obrigatório! ');
		return false;
	}
	
	var existe = false;
	storeAnexos.each(function(record){
		if(String(record.get("desArquivo")).trim() == String(Ext.getCmp('desArquivo').getValue()).trim())
			existe = true;
	});
	if(existe == true){
		alert('O Arquivo selecionado já foi utilizado, informe outro!');
		return false;
	}
	
	Ext.Ajax.request({
		url: '/BPMSLibs/bpms/services/createCard.jsp',
		success: function(){
			storeAnexos.load();
	
			Ext.getCmp('desHistorico').setValue('');
			Ext.getCmp('desArquivo').setValue('');
			Ext.getCmp('desHistorico').focus();
		},
		params: {
			companyId: 1,
			nrFichario:TransitionData2Form.advancedParams['FICHARIO_FILHO_ANEXOS'],
			colleagueId: getWKUser(),
			fields: "hashpai,desHistorico,desArquivo,conAlteracao,numDocumento,verDocumento",
			hashpai:Ext.getCmp('hashpai').getValue(),
			desHistorico:Ext.getCmp('desHistorico').getValue(),
			desArquivo:Ext.getCmp('desArquivo').getValue(),
			conAlteracao:true,
			numDocumento:'',
			verDocumento:''
		}
	});
};

var excluirAnexo = function(){
	var records = Ext.getCmp('lisAnexos').getSelectionModel().getSelections();
	
	for(var i=0;i<records.length;i++){
		excluirFicha(records[i].get('nrFicha'),function(){
			storeAnexos.load();
		});
	}
};

var excluirFicha = function(nrFicha,handler){
	
	Ext.Ajax.request({
		url: '/BPMSLibs/bpms/services/deleteCard.jsp',
		success: function(){
			if(handler != null && typeof(handler) == 'function'){
				handler();
				TransitionData2Form.loadStop();
			}
		},
		params: {
			companyId: 1,
			colleagueId: getWKUser(),
			nrFicha: nrFicha
		}
	});
	
};

var obrigarClassificacao = function(combo,record,index){
	
	switch(record.get('codigo')){
		case 1:
			TransitionData2Form.insertMandatory('codGravidade','Selecione uma opção para o campo [Gravidade]!');
			TransitionData2Form.insertMandatory('codUrgencia','Selecione uma opção para o campo [Urgência]!');
			TransitionData2Form.insertMandatory('codTendencia','Selecione uma opção para o campo [Tendência]!');
		
			TransitionData2Form.insertMandatory('codTipSolicitacao','Selecione uma opção para o campo [Tipo de Solicitação]!');
			TransitionData2Form.insertMandatory('codDetalhe','Selecione pelo menos uma opção para o campo [Detalhe]!');
		break;
		case 2:
			TransitionData2Form.insertMandatory('codGravidade','Selecione uma opção para o campo [Gravidade]!');
			TransitionData2Form.insertMandatory('codUrgencia','Selecione uma opção para o campo [Urgência]!');
			TransitionData2Form.insertMandatory('codTendencia','Selecione uma opção para o campo [Tendência]!');
		
			TransitionData2Form.removeMandatory('codTipSolicitacao');
			TransitionData2Form.removeMandatory('codDetalhe');
		break;
		case 7:
			TransitionData2Form.insertMandatory('codTipSolicitacao','Selecione uma opção para o campo [Tipo de Solicitação]!');
			TransitionData2Form.insertMandatory('codDetalhe','Selecione pelo menos uma opção para o campo [Detalhe]!');
		break;
		default:
			TransitionData2Form.removeMandatory('codGravidade');
			TransitionData2Form.removeMandatory('codUrgencia');
			TransitionData2Form.removeMandatory('codTendencia');
		
			TransitionData2Form.removeMandatory('codTipSolicitacao');
			TransitionData2Form.removeMandatory('codDetalhe');
		break;
	}
	
};

var obrigaAvaliacao = function(obj,selectedRadio){
	if(selectedRadio.inputValue == '1'){
		TransitionData2Form.insertMandatory('codCorAtencao','Selecione uma opção para o campo [Cordialidade e Atenção]!');
		TransitionData2Form.insertMandatory('codAgiAtendimento','Selecione uma opção para o campo [Agilidade no Atendimento]!');
		TransitionData2Form.insertMandatory('codSolApresentada','Selecione uma opção para o campo [Solução Apresentada]!');
		
		TransitionData2Form.removeMandatory('desComentario');
	}
	else{
		TransitionData2Form.insertMandatory('desComentario','Informe o porque do chamado Não Resolvido!');
		
		TransitionData2Form.removeMandatory('codCorAtencao');
		TransitionData2Form.removeMandatory('codAgiAtendimento');
		TransitionData2Form.removeMandatory('codSolApresentada');
	}
};

var clickAnexo = function(grid, rowIndex, colIndex) {

	var record = grid.getStore().getAt(rowIndex);
	
	if(record.get("numDocumento") != "" && record.get("conAlteracao") != "true")
		window.open("/webdesk/documentviewer?companyId=" + getCurrentCompany() + 
			"&WDNrDocto=" + record.get("numDocumento") + 
			"&WDNrVersao=" + record.get("verDocumento"));
	else
		alert("Este documento será publicado somente após a conclusão da tarefa!");
	
};

var returnClassIcon = function(value,metadata,record,rowIndex,colIndex,store) {

	var iAtividade = parseInt(getWKNumState());
	
	if(iAtividade == 0 || iAtividade == 1)
		this.items[0].tooltip = "Arquivo Enviado: " + record.get("desArquivo") + ".";
	else
		this.items[0].tooltip = "Clique para visualizar o documento.";
	
	var extensao = record.get("desArquivo").split(".")[record.get("desArquivo").split(".").length-1].toLowerCase();
	switch(extensao){
		case "doc":
		case "docx":
		case "odt":
			return 'x-grid-fileWord';
		break;
		case "xls":
		case "xlsx":
		case "ods":
			return 'x-grid-fileExcel';
		break;
		case "ppt":
		case "pptx":
		case "odp":
			return 'x-grid-filePowerPoint';
		break;
		case "pdf":
			return 'x-grid-filePdf';
		break;
		case "jpg":
		case "jpeg":
		case "gif":
		case "png":
		case "tif":
		case "bmp":
			return 'x-grid-fileImage';
		break;
		case "rar":
		case "7z":
		case "zip":
			return 'x-grid-fileZip';
		break;
		case "txt":
			return 'x-grid-fileText';
		break;
		default:
			return 'x-grid-fileOther';
		break;
	}
};

var copyDataFields = function(){
	Ext.getCmp('desChamadoResumo').setValue(Ext.getCmp('desChamado').getValue());
	Ext.getCmp('matResAteNivelResumo').setValue(Ext.getCmp('matResAteNivel'+document.forms[0].ultAtendimento.value).getValue());
	Ext.getCmp('nomResAteNivelResumo').setValue(Ext.getCmp('nomResAteNivel'+document.forms[0].ultAtendimento.value).getValue());
	Ext.getCmp('desAnaAteNivelResumo').setValue(Ext.getCmp('desAnaAteNivel'+document.forms[0].ultAtendimento.value).getValue());
};