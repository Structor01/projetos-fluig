var tipSolicitacaoStore = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: '/BPMSLibs/bpms/services/fichario.jsp',
		method: 'GET'
	}),
	reader: new Ext.data.JsonReader({
		totalProperty: 'total',
		root: 'result',
		id: 'id',
		fields: [
			{name: 'nrFicha', type: 'int'},
			{name: 'nrVersao', type: 'int'},
			{name: 'codTipSolicitacao', type: 'int'},
			{name: 'nomTipSolicitacao', type: 'string'},
			{name: 'restrito', type: 'string'},
			{name: 'codPapel', type: 'string'},
			{name: 'desPapel', type: 'string'}
		]
	}),
	listeners:{
		beforeload:function(obj,options){
			obj.setBaseParam("limit",'9999');
			obj.setBaseParam("nrFichario",TransitionData2Form.advancedParams['FICHARIO_CADASTRO_TIPO_SOLICITACAO']);
		}
	},
	sortInfo:{
		field: 'nomTipSolicitacao', 
		direction: "ASC"
	}
});

var detalhamentoStore = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: '/BPMSLibs/bpms/services/fichario.jsp',
		method: 'GET'
	}),
	reader: new Ext.data.JsonReader({
		totalProperty: 'total',
		root: 'result',
		id: 'id',
		fields: [
			{name: 'nrFicha', type: 'int'},
			{name: 'nrVersao', type: 'int'},
			{name: 'codDetalhamento', type: 'int'},
			{name: 'nomDetalhamento', type: 'string'},
			{name: 'codTipSolicitacao', type: 'int'}
		]
	}),
	listeners:{
		beforeload:function(obj,options){
			obj.setBaseParam("limit",'9999');
			obj.setBaseParam("codCampo",'codTipSolicitacao');
			obj.setBaseParam("nrFichario",TransitionData2Form.advancedParams['FICHARIO_CADASTRO_DETALHAMENTO']);
			
			if(Ext.getCmp('codTipSolicitacao').getValue() && String(Ext.getCmp('codTipSolicitacao').getValue()) != "")
				obj.setBaseParam("codValor",Ext.getCmp('codTipSolicitacao').getValue());
			else
				obj.setBaseParam("codValor",document.forms[0].codTipSolicitacao.value);
		}
	},
	sortInfo:{
		field: 'nomDetalhamento', 
		direction: "ASC"
	}
});


var storeAnexos = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: '/BPMSLibs/bpms/services/fichario.jsp',
		method: 'GET'
	}),
	reader: new Ext.data.JsonReader({
		totalProperty: 'total',
		root: 'result',
		id: 'id',
		fields: [
			{name: 'nrFicha', mapping: 'nrFicha', type: 'int'},
			{name: 'nrVersao', type: 'int'},
			{name: 'hashpai', type: 'string'},
			{name: 'desHistorico', type: 'string'},
			{name: 'desArquivo', type: 'string'},
			{name: 'conAlteracao', type: 'boolean'},
			{name: 'numDocumento', type: 'int'},
			{name: 'verDocumento', type: 'int'}
		]
	}),
	sortInfo:{
		field: 'desHistorico', 
		direction: "ASC"
	},
	listeners:{
		beforeload:function(obj,options){
			obj.setBaseParam("limit",'9999');
			obj.setBaseParam("codCampo",'hashpai');
			obj.setBaseParam("codValor",Ext.getCmp('hashpai').getValue());
			obj.setBaseParam("nrFichario",TransitionData2Form.advancedParams['FICHARIO_FILHO_ANEXOS']);
		}
	}
});

var storeBaseConhecimento = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: '/BPMSLibs/bpms/services/fichario.jsp',
		method: 'GET'
	}),
	reader: new Ext.data.JsonReader({
		totalProperty: 'total',
		root: 'result',
		fields: [
			{name: 'nrFicha', mapping: 'nrFicha', type: 'int'},
			{name: 'descricao', type: 'string'},
			{name: 'tipoSolicitacao', type: 'string'},
			{name: 'detalhamento', type: 'string'},
			{name: 'solucao', type: 'string'}
		]
	}),
	sortInfo:{
		field: 'descricao', 
		direction: "ASC"
	},
	listeners:{
		beforeload:function(obj,options){
			//obj.setBaseParam("limit",'9999');
			//obj.setBaseParam("codCampo",'hashpai');
			//obj.setBaseParam("codValor",Ext.getCmp('hashpai').getValue());
			//obj.setBaseParam("nrFichario",TransitionData2Form.advancedParams['FICHARIO_FILHO_DOCUMENTOS']);
		}
	}/*,
	data: */
});

var dadosExemplo = {
	result:[
		{nrFicha:1, descricao:'O meu computador não está ligando',tipoSolicitacao:'Defeito em Máquina',detalhamento:'Cabo de Energia',solucao:'Ligar Monitor'},
		{nrFicha:2, descricao:'Não estou conseguindo acessar a internet',tipoSolicitacao:'Internet',detalhamento:'Proxy',solucao:'Configurar Proxy'}
	],
	total:2
};

storeBaseConhecimento.loadData(dadosExemplo);