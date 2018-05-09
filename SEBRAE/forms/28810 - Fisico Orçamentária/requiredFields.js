function requiredFields(){
	$("<style>").prop("type", "text/css")
	.html("\
		.required::after{\
			content: '*';\
			color: red;\
		}").appendTo("head");
	
	var mandatoryFields = new Fields();
	var fields = [];

	//Atividade inicial
	mandatoryFields.addField("cpProjeto",[0, INICIO, REALIZAR_CORRECAO, ANALISA_SOLICITACAO_GERENTE,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("cmbTipoAlteracao",[0, INICIO, REALIZAR_CORRECAO,CONFIRMAR_DATA_ALTERACAO,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("cmbPrioridade",[0, INICIO, REALIZAR_CORRECAO,CONFIRMAR_DATA_ALTERACAO,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("txtQuando",[0, INICIO, REALIZAR_CORRECAO,CONFIRMAR_DATA_ALTERACAO,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("postArquivoAnexo",[0, INICIO, REALIZAR_CORRECAO,ALTERAR_VALORES,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("cpNovoProjeto",[0, INICIO, REALIZAR_CORRECAO,ALTERAR_VALORES,REALIZAR_CORRECAO2]);
	mandatoryFields.addField("cpJustificativa",[0, INICIO, REALIZAR_CORRECAO,ALTERAR_VALORES,REALIZAR_CORRECAO2]);
	
		
	mandatoryFields.addField("cmbAutorizaGer",[0, ANALISA_SOLICITACAO_GERENTE]);
	mandatoryFields.addField("cpObsGerencia",[0, ANALISA_SOLICITACAO_GERENTE]);
	
	mandatoryFields.addField("cmbValidaOrc",[0, VERIFICAR_ORCAMENTO]);
	mandatoryFields.addField("ObsValidadorOrc",[0, VERIFICAR_ORCAMENTO]);
	
	mandatoryFields.addField("cmbAutorizaUGE",[0, GERENCIA_UGE]);
	mandatoryFields.addField("cpParecerUGE",[0, GERENCIA_UGE]);
	
	mandatoryFields.addField("cmbAutorizaSuper",[0, AUTORIZA_SUPER]);
	mandatoryFields.addField("cpObsSuper",[0, AUTORIZA_SUPER]);
	
	mandatoryFields.addField("cmbIncorporadoSGE",[0, ALTERAR_PROJETO_SGE]);
	mandatoryFields.addField("cmbValorAlterado",[0, ALTERAR_PROJETO_SGE]);
	mandatoryFields.addField("cpConsideraSolic",[0, ALTERAR_PROJETO_SGE]);
	

	fields = mandatoryFields.getFields();
	
	for(var i=0; i<fields.length; i++){
		/*if(fields[i].activities.indexOf(parseInt(CURRENT_STATE,10)) >= 0) */
			setRequired(fields[i].id, true);
	}
}

/**
 * Classe para agrupar os campos e atividades.
 * 
 * @returns void.
 */
function Fields(){
	this.fields = [];

	this.addField = function(id, arrayActivities){
		this.fields.push({"id":id,"activities":arrayActivities});
	}

	this.getFields = function(){
		return this.fields;
	}
}

/**
 * Inclui o * vermelho nos labels a partir do nome do campo.
 * 
 * @param name: name do campo. Utiliza o name para ser compativel com os campos do tipo radio.
 * @returns void.
 */
function setRequired(name, isAdding){
	var $element = $('input[name="'+name+'"], textarea[name="'+name+'"], select[name="'+name+'"], checkbox[name="'+name+'"]');
	var $label;

	if($element.attr('type') == "radio") $label = $($element.parent()[0]).parent().prev();
	else $label = ($element.prev().length == 0) ? $element.parent().prev() : $element.prev();

	if(isAdding)
		$label.addClass('required');
	else
		$label.removeClass('required');
}