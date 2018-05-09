// Interface Principal
Ext.form.Field.prototype.msgTarget = 'side';

var winMatrizGut = new Ext.Window({
	title: 'Matriz Gut - Como Usar',
	layout:'fit',
	width:700,
	height:290,
	closeAction:'hide',
	plain: true,
	modal:true,
	items:[{
		xtype:'box',
		html:
			"<table class='tabelaPrioridade'>" +
			"	<tr class='corsim'>" +
			"		<td><b>Gravidade</b></td>" +
			"	</tr>" +
			"	<tr>" +
			"		<td style='padding-bottom:15px;'>Qual o impacto do problema sobre coisas, pessoas, resultados, processos ou organizações e efeitos que surgirão a longo prazo, caso o problema não seja resolvido.</td>" +
			"	</tr>" +
			"	<tr class='corsim'>" +
			"		<td><b>Urgência</b></td>" +
			"	</tr>" +
			"	<tr>" +
			"		<td style='padding-bottom:15px;'>Qual o tempo que você precisa resolver este problema e o tempo que você tem para resolvê-lo?</td>" +
			"	</tr>" +
			"	<tr class='corsim'>" +
			"		<td><b>Tendência</b></td>" +
			"	</tr>" +
			"	<tr>" +
			"		<td style='padding-bottom:15px;'>Qual o potencial de crescimento do problema, avaliação da tendência de crescimento, redução ou desaparecimento do problema com o passar do tempo. (piora do problema)</td>" +
			"	</tr>" +
			"</table>"
	}],
	buttons:[{
		text:'Fechar',
		listeners:{
			click:function(){
				winMatrizGut.hide();
			}
		}
	}]
});

var winTabelaPrioridades = new Ext.Window({
	title: 'Tabela de Prioridades - Quando Usar',
	layout:'fit',
	width:700,
	height:350,
	closeAction:'hide',
	plain: true,
	modal:true,
	items:[{
		xtype:'box',
		html:
			"<table class='tabelaPrioridade'>" +
			"	<tr>" +
			"		<th>Prioridade</th>" +
			"		<th>Quando Usar</th>" +
			"		<th>Tempo de Resposta</th>" +
			"	</tr>" +
			"	<tr>" +
			"		<td>Muito Alta</td>" +
			"		<td>Função/Serviço não pode ser usado/realizado e causa um impacto crítico nas operações dos usuários finais na execução da tarefa. Não há nenhum paliativo disponível ou está ocorrendo corrupção de dados.</td>" +
			"		<td>8 Horas Úteis</td>" +
			"	</tr>" +
			"	<tr class='corsim'>" +
			"		<td>Alta</td>" +
			"		<td>Função/Serviço pode ser usado/realizado com restrições severas.  Pode ser necessário uma intervenção manual ou procedimento paliativo.</td>" +
			"		<td>16 Horas Úteis</td>" +
			"	</tr>" +
			"	<tr>" +
			"		<td>Média</td>" +
			"		<td>Função/Serviço pode ser usado/realizado com restrições menores. Não é crítica para a realização de tarefas.</td>" +
			"		<td>24 Horas Úteis</td>" +
			"	</tr>" +
			"	<tr class='corsim'>" +
			"		<td>Baixa</td>" +
			"		<td>Pouco impacto na execução da tarefa, erros de ortografia, navegação de telas ou outros problemas de visualização.</td>" +
			"		<td>32 Horas Úteis</td>" +
			"	</tr>" +
			"	<tr>" +
			"		<td>Muito Baixa</td>" +
			"		<td>Nenhum impacto na realização das tarefas, porém a solicitação pode melhorar a eficiência do trabalho realizado.</td>" +
			"		<td>40 Horas Úteis</td>" +
			"	</tr>" +
			"</table>"
	}],
	buttons:[{
		text:'Fechar',
		listeners:{
			click:function(){
				winTabelaPrioridades.hide();
			}
		}
	}]
});
	
var tabChamado = new Ext.Panel({
	layout:'form',
	title:'Chamado',
	id:'tabChamado',
	bodyStyle:'padding:10px',
	autoScroll:true,
	defaults:{
		collapsible:true,
		collapsed:false,
		animCollapse:false,
		frame:false,
		bodyStyle:'padding:5px',
		labelAlign:'right',
		labelWidth:130,
		style:'margin-bottom:10px'
	},
	items:[{
		xtype:'fieldset',
		layout:'form',
		id:'fsSolicitacao',
		title: 'Solicitação',
		items:[{
			xtype:'fieldset',
			layout:'form',
			id:'fsIdentificacao',
			title: 'Identificação',
			frame:false,
			bodyStyle:'padding:5px',
			labelAlign:'right',
			labelWidth:115,
			items:[{
				xtype:'hidden',
				id:'hashpai'
			},{
				xtype:'compositefield',
				fieldLabel:'Núm. Solicitação',
				items:[{
					xtype:'textfield',
					id:'numSolicitacao',
					width:100,
					readOnly:true,
					cls:'x-form-readonly',
					fieldLabel:'Solicitante'
				},{
					xtype:'label',
					text:'Status:',
					style:'text-align:right;',
					width:241
				},{
					xtype:'textfield',
					id:'staSolicitacao',
					width:150,
					readOnly:true,
					cls:'x-form-readonly'
				}]
			},{
				xtype:'datefield',
				fieldLabel:'Data da Solicitação',
				id:'datSolicitacao',
				readOnly:true,
				cls:'x-form-readonly',
				width:100
			},{
				xtype:'compositefield',
				fieldLabel:'Solicitante',
				id:'solicitante',
				items:[{
					xtype:'textfield',
					id:'matSolicitante',
					width:100,
					readOnly:true,
					cls:'x-form-readonly',
					fieldLabel:'Solicitante'
				},{
					xtype:'textfield',
					id:'nomSolicitante',
					width:396,
					readOnly:true,
					cls:'x-form-readonly'
				},{
					xtype:'button',
					id:'btnAdiDono',
					icon:'/BPMSLibs/images/user_add.png',
					tooltip:'Adicionar Dono do Chamado',
					listeners:{
						click:adicionaColaboradorSolicitante
					}
				}]
			},{
				xtype:'compositefield',
				fieldLabel:'Dono do Chamado',
				id:'donoChamado',
				hidden:true,
				items:[{
					xtype:'textfield',
					id:'matNomeado',
					width:100,
					readOnly:true,
					cls:'x-form-readonly',
					fieldLabel:'Solicitante'
				},{
					xtype:'textfield',
					id:'nomNomeado',
					width:396,
					readOnly:true,
					cls:'x-form-readonly'
				},{
					xtype:'button',
					icon:'/BPMSLibs/images/zoom.png',
					tooltip:'Zoom de Colaborador',
					listeners:{
						click:abreZoomColaboradorAdicional
					}
				},{
					xtype:'button',
					icon:'/BPMSLibs/images/clear.png',
					tooltip:'Limpar Campos',
					listeners:{
						click:limpaCamposColaboradorAdicional
					}
				}]
			},{
				xtype:'compositefield',
				fieldLabel:'Unidade',
				id:'unidade',
				width:555,
				items:[{
					xtype:'textfield',
					id:'codUnidade',
					width:100,
					//readOnly:true,
					cls:'x-form-readonly',
					fieldLabel:'Unidade'
				},{
					xtype:'textfield',
					id:'desUnidade',
					width:396,
					readOnly:true,
					cls:'x-form-readonly'
				},{
					xtype:'button',
					icon:'/BPMSLibs/images/zoom.png',
					tooltip:'Zoom de Unidade',
					listeners:{
						click:abreZoomUnidade
					}
				},{
					xtype:'button',
					icon:'/BPMSLibs/images/clear.png',
					tooltip:'Limpar Campos',
					listeners:{
						click:limpaCamposUnidade
					}
				}]
			},{
				xtype:'compositefield',
				fieldLabel:'Fone de Contato',
				width:440,
				id:'telefone',
				items:[{
					xtype:'textfield',
					fieldLabel:'Telefone',
					id:'numTelefone',
					width:100
				},{
					xtype:'checkbox',
					id:'graRamSolicitante',
					boxLabel:'Utilizar este telefone por padrão nas próximas solicitações.'
				}]
			}]
		},{
			xtype:'fieldset',
			layout:'form',
			id:'fsDefinicao',
			title: 'Definição do Chamado',
			style:'margin-top:15px;',
			frame:false,
			bodyStyle:'padding:5px',
			labelAlign:'right',
			labelWidth:115,
			items:[{
				xtype:'compositefield',
				fieldLabel:'Prioridade',
				id:'prioridade',
				width:380,
				items:[{
					xtype:'combo',
					fieldLabel:'Prioridade',
					id: 'codPrioridade',
					typeAhead: true,
					triggerAction: 'all',
					lazyRender:true,
					mode: 'local',
					value:3,
					valueField: 'codigo',
					displayField: 'descricao',
					emptyText: 'Selecione...',
					selectOnFocus:true,
					forceSelection: true,
					width:100,
					store: new Ext.data.ArrayStore({
						fields: ['codigo','descricao'],
						data: [
							[1, 'Muito Baixa'],
							[2, 'Baixa'],
							[3, 'Média'],
							[4, 'Alta'],
							[5, 'Muito Alta']
						]
					}),
					listeners:{
						select:alteraTextoHorasUteis
					}
				},{
					xtype:'button',
					icon:'/BPMSLibs/images/help.png',
					tooltip:'Qual prioridade devo utilizar?',
					doDisable: false,
					listeners:{
						click:abreJanelaTabelaPrioridades
					}
				},{
					xtype:'label',
					id:'txtHorasUteis',
					text:'Tempo previsto para resposta: 24 horas úteis.'
				}]
			},{
				xtype:'htmleditor',
				fieldLabel:'Descrição',
				id:'desChamado',
				width:505,
				heigth:100
			}]
		},{
			id:'lisAnexos',
			xtype:'grid',
			title:'Anexos (Opcional)',
			bodyStyle:'padding:0px',
			style:'margin-bottom:10px;',
			store:storeAnexos,
			loadMask:{msg:'Carregando...'},
			viewConfig:{forceFit:true},
			columnLines:true,
			width:'100%',
			height:150,
			frame:false,
			cm:new Ext.grid.ColumnModel([{
				header:'Identificação',
				dataIndex:'desHistorico',
				sortable:true,
				width:300
			},{
				xtype: 'actioncolumn',
				width: 50,
				items: [{
					getClass: returnClassIcon,
					handler: clickAnexo
				}]
			}]),
			sm:new Ext.grid.RowSelectionModel({
				singleSelect:false
			}),
			tbar:[{
				xtype:'textfield',
				id:'desHistorico',
				width:350,
				emptyText:'Identificação...'
			},{
				xtype:'box',
				width:5
			},{
				xtype:'textfield',
				id:'desArquivo',
				emptyText:'Arquivo...',
				readOnly:true,
				cls:'x-form-readonly',
				width: 200
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/folder_explore.png',
				tooltip:'Selecionar Arquivo',
				listeners:{
					click:function(){
						TransitionData2Form.uploadFile('desArquivo');
					}
				}
			},{
				xtype:'box',
				width:5
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/accept.png',
				tooltip:'Adicionar',
				listeners:{
					click:incluirAnexo
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/delete.gif',
				tooltip:'Excluir Selecionado(s)',
				listeners:{
					click:excluirAnexo
				}
			}]
		}]
	}]
});


var tabAvaliacao = new Ext.Panel({
	layout:'form',
	title:'Avaliação do Atendimento',
	id:'tabAvaliacao',
	bodyStyle:'padding:10px',
	autoScroll:true,
	defaults:{
		collapsible:true,
		collapsed:false,
		animCollapse:false,
		frame:false,
		bodyStyle:'padding:5px',
		labelAlign:'right',
		labelWidth:130,
		style:'margin-bottom:10px'
	},
	items:[{
		xtype:'fieldset',
		layout:'form',
		id:'fsResumo',
		title: 'Resumo do Chamado',
		items:[{
			xtype:'htmleditor',
			fieldLabel:'Descrição do Chamado',
			id:'desChamadoResumo',
			readOnly:true,
			width:505,
			heigth:100
		},{
			xtype:'compositefield',
			fieldLabel:'Atendente',
			id:'resAteNivelResumo',
			items:[{
				xtype:'textfield',
				id:'matResAteNivelResumo',
				width:100,
				readOnly:true,
				cls:'x-form-readonly',
				fieldLabel:'Solicitante'
			},{
				xtype:'textfield',
				id:'nomResAteNivelResumo',
				width:400,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'htmleditor',
			fieldLabel:'Solução',
			id:'desAnaAteNivelResumo',
			readOnly:true,
			width:505,
			height:100
		}]
	},{
		xtype:'fieldset',
		layout:'form',
		id:'fsAvaliacao',
		title: 'Avaliar Atendimento',
		items:[{
			xtype: 'radiogroup',
			width:350,
			fieldLabel:'Avaliação',
			id:'codAvaliacao',
			items: [
				{boxLabel: '<b style="color:green;">Resolvido</b>', name: 'codAvaliacao-op', inputValue: "1"},
				{boxLabel: '<b style="color:red;">Não Resolvido</b>', name: 'codAvaliacao-op', inputValue: "2"},
				{boxLabel: '<b style="color:orange;">Não Avaliado</b>', name: 'codAvaliacao-op', inputValue: "3", disabled:true}
			],
			listeners:{
				change:obrigaAvaliacao
			}
		},{
			xtype:'fieldset',
			layout:'form',
			id:'fsResolvido',
			title: 'Resolvido',
			style:'margin-top:15px;',
			frame:false,
			bodyStyle:'padding-top:5px;padding-bottom:5px;',
			labelAlign:'right',
			labelWidth:154,
			items:[{
				xtype: 'radiogroup',
				width:300,
				fieldLabel:'Cordialidade e Atenção',
				id:'codCorAtencao',
				items: [
					{boxLabel: 'Ótimo', name: 'codCorAtencao-op', inputValue: "1"},
					{boxLabel: 'Bom', name: 'codCorAtencao-op', inputValue: "2"},
					{boxLabel: 'Regular', name: 'codCorAtencao-op', inputValue: "3"},
					{boxLabel: 'Ruim', name: 'codCorAtencao-op', inputValue: "4"}
				]
			},{
				xtype: 'radiogroup',
				width:300,
				fieldLabel:'Agilidade no Atendimento',
				id:'codAgiAtendimento',
				items: [
					{boxLabel: 'Ótimo', name: 'codAgiAtendimento-op', inputValue: "1"},
					{boxLabel: 'Bom', name: 'codAgiAtendimento-op', inputValue: "2"},
					{boxLabel: 'Regular', name: 'codAgiAtendimento-op', inputValue: "3"},
					{boxLabel: 'Ruim', name: 'codAgiAtendimento-op', inputValue: "4"}
				]
			},{
				xtype: 'radiogroup',
				width:300,
				fieldLabel:'Solução Apresentada',
				id:'codSolApresentada',
				items: [
					{boxLabel: 'Ótimo', name: 'codSolApresentada-op', inputValue: "1"},
					{boxLabel: 'Bom', name: 'codSolApresentada-op', inputValue: "2"},
					{boxLabel: 'Regular', name: 'codSolApresentada-op', inputValue: "3"},
					{boxLabel: 'Ruim', name: 'codSolApresentada-op', inputValue: "4"}
				]
			}]
		},{
			xtype: 'textarea',
			width:560,
			height:100,
			fieldLabel:'Comentário / Elogio / Sugestão / Crítica',
			id:'desComentario'
		}]
	}]
});

var tabAtendimento = new Ext.Panel({
	layout:'form',
	title:'Atendimento',
	id:'tabAtendimento',
	bodyStyle:'padding:10px',
	autoScroll:true,
	defaults:{
		collapsible:true,
		collapsed:false,
		animCollapse:false,
		frame:false,
		bodyStyle:'padding:5px',
		labelAlign:'right',
		labelWidth:130,
		style:'margin-bottom:10px'
	},
	items:[{
		layout:'table',
		border:false,
		collapsible:false,
		frame:false,
		bodyStyle:'padding:0px',
		style:'margin-bottom:0px',
		layoutConfig:{
			columns:2
		},
		items:[{
			xtype:'fieldset',
			width:440,
			height:140,
			rowspan:2,
			layout:'form',
			id:'fsClassificacao',
			title: 'Classificação do Chamado',
			collapsible:true,
			collapsed:false,
			frame:false,
			bodyStyle:'padding:5px;',
			labelAlign:'right',
			labelWidth:130,
			items:[{
				xtype: 'radiogroup',
				width:240,
				fieldLabel:'Gravidade',
				id:'codGravidade',
				items: [
					{boxLabel: '5', name: 'codGravidade-op', inputValue: "5"},
					{boxLabel: '4', name: 'codGravidade-op', inputValue: "4"},
					{boxLabel: '3', name: 'codGravidade-op', inputValue: "3"},
					{boxLabel: '2', name: 'codGravidade-op', inputValue: "2"},
					{boxLabel: '1', name: 'codGravidade-op', inputValue: "1"},
					{
						xtype:'button',
						icon:'/BPMSLibs/images/help.png',
						width:20,
						height:20,
						tooltip:'Como devo classificar?',
						doDisable: false,
						listeners:{
							click:abreJanelaMatrizGut
						}
					}
				]
			},{
				xtype: 'radiogroup',
				width:200,
				fieldLabel:'Urgência',
				id:'codUrgencia',
				items: [
					{boxLabel: '5', name: 'codUrgencia-op', inputValue: "5"},
					{boxLabel: '4', name: 'codUrgencia-op', inputValue: "4"},
					{boxLabel: '3', name: 'codUrgencia-op', inputValue: "3"},
					{boxLabel: '2', name: 'codUrgencia-op', inputValue: "2"},
					{boxLabel: '1', name: 'codUrgencia-op', inputValue: "1"}
				]
			},{
				xtype: 'radiogroup',
				width:200,
				fieldLabel:'Tendência',
				id:'codTendencia',
				items: [
					{boxLabel: '5', name: 'codTendencia-op', inputValue: "5"},
					{boxLabel: '4', name: 'codTendencia-op', inputValue: "4"},
					{boxLabel: '3', name: 'codTendencia-op', inputValue: "3"},
					{boxLabel: '2', name: 'codTendencia-op', inputValue: "2"},
					{boxLabel: '1', name: 'codTendencia-op', inputValue: "1"}
				]
			}]
		},{
			xtype:'fieldset',
			id:'fsGravaBaseConhecimento',
			title: 'Base de Conhecimento',
			collapsible:true,
			collapsed:false,
			anchor: '100%',
			height:72,
			layout:'table',
			layoutConfig:{columns:1},
			frame:false,
			bodyStyle:'padding:0px;',
			style:'margin-left:10px;',
			items:[{
				xtype:'label',
				style:'font-family:tahoma, arial, calibri;font-size:12px;',
				text:'Gravar dados do chamado na Base de Conhecimento?'
			},{
				xtype: 'radiogroup',
				width:150,
				style:'margin-top:0px;',
				labelSeparator:'?',
				id:'graBasConhecimento',
				items: [
					{boxLabel: 'Sim', name: 'graBasConhecimento-op', inputValue: "1"},
					{boxLabel: 'Não', name: 'graBasConhecimento-op', inputValue: "2", checked:true}
				]
			}]
		},{
			xtype:'fieldset',
			id:'fsCopiaPrioriade',
			title: 'Prioridade do Chamado',
			collapsible:true,
			collapsed:false,
			anchor: '100%',
			height:58,
			layout:'table',
			layoutConfig:{columns:1},
			frame:false,
			bodyStyle:'padding:0px;',
			style:'margin-left:10px;',
			items:[{
				xtype:'label',
				id:'txtPrioridade',
				style:'font-family:tahoma, arial, calibri;font-size:14px;font-weight:bold;',
				text:''
			}]
		}]
	},{
		xtype:'fieldset',
		layout:'form',
		id:'fsDetalhes',
		title: 'Detalhar Chamado',
		frame:false,
		bodyStyle:'padding:5px',
		labelAlign:'right',
		labelWidth:130,
		items:[{
			xtype:'combo',
			fieldLabel:'Tipo da Solicitação',
			id: 'codTipSolicitacao',
			typeAhead: true,
			triggerAction: 'all',
			lazyRender:true,
			mode: 'local',
			valueField: 'codTipSolicitacao',
			displayField: 'nomTipSolicitacao',
			emptyText: 'Selecione...',
			selectOnFocus:true,
			forceSelection: true,
			width:505,
			style:'margin-bottom:5px;',
			store: tipSolicitacaoStore,
			listeners:{
				select:carregaDetalhamento
			}
		},{
			xtype:'lovcombo',
			fieldLabel:'Detalhamento',
			id: 'codDetalhe',
			typeAhead: true,
			triggerAction: 'all',
			lazyRender:true,
			mode: 'local',
			valueField: 'codDetalhamento',
			displayField: 'nomDetalhamento',
			emptyText: 'Selecione...',
			selectOnFocus:true,
			forceSelection: true,
			width:505,
			store: detalhamentoStore
		}]
	},{
		xtype:'fieldset',
		layout:'form',
		id:'fsAtendimentoNivel1',
		title: 'Atendimento Nível 1',
		items:[{
			xtype:'compositefield',
			fieldLabel:'Data de Início',
			items:[{
				xtype:'datefield',
				id:'datIniAteNivel1',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			},{
				xtype:'label',
				text:'Data de Conclusão:',
				style:'text-align:right;',
				width:295
			},{
				xtype:'datefield',
				id:'datFimAteNivel1',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Atendente',
			id:'resAteNivel1',
			items:[{
				xtype:'textfield',
				id:'matResAteNivel1',
				width:100,
				readOnly:true,
				cls:'x-form-readonly',
				fieldLabel:'Solicitante'
			},{
				xtype:'textfield',
				id:'nomResAteNivel1',
				width:400,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Ação',
			id:'acaAteNivel1',
			width:505,
			items:[{
				xtype:'combo',
				id: 'desAcaAteNivel1',
				fieldLabel:'Ação',
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:true,
				mode: 'local',
				valueField: 'codigo',
				displayField: 'descricao',
				emptyText: 'Selecione...',
				selectOnFocus:true,
				forceSelection: true,
				width:200,
				store: new Ext.data.ArrayStore({
					fields: ['codigo','descricao'],
					data: [
						[1, 'Concluir Atendimento'],
						[2, 'Repriorizar Chamado'],
						[3, 'Transferir para o Nível 2'],
						[4, 'Transferir para o Nível 3'],
						[5, 'Aguardando'],
						[6, 'Cancelar'],
						[7, 'Informar Previsão do Atendimento']
					]
				}),
				listeners:{
					select:obrigarClassificacao
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/book_open.png',
				tooltip:'Consultar Base de Conhecimento',
				text:'Consultar Base de Conhecimento',
				style:'margin-left:107px;',
				listeners:{
					click:function(){
						abreConsultaBaseConhecimento(1);
					}
				}
			}]
		},{
			xtype:'htmleditor',
			fieldLabel:'Justificativa da Ação',
			id:'desAnaAteNivel1',
			width:505,
			height:100
		},{
			xtype:'compositefield',
			id:'aneNivel1',
			fieldLabel:'Anexar Procedimento',
			items:[{
				xtype:'textfield',
				id:'desArqAneProNivel1',
				fieldLabel:'Arquivo',
				readOnly:true,
				cls:'x-form-readonly',
				width: 505
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/folder_explore.png',
				tooltip:'Selecionar Arquivo',
				listeners:{
					click:function(){
						TransitionData2Form.uploadFile('desArqAneProNivel1',null,function(){
							document.forms[0].conAltAneProNivel1.value = "true";
						});
						
					}
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/page_word.png',
				tooltip:'Visualizar Documento',
				doDisable: false,
				listeners:{
					click:function(){
						if(document.forms[0].numDocAneProNivel1.value != "" && document.forms[0].conAltAneProNivel1.value != "true")
							window.open("/webdesk/documentviewer?companyId=" + getCurrentCompany() + 
								"&WDNrDocto=" + document.forms[0].numDocAneProNivel1.value + 
								"&WDNrVersao=" + document.forms[0].verDocAneProNivel1.value);
						else if(Ext.getCmp('desArqAneProNivel1').getValue() == "")
							alert("Não há documento a ser visualizado!");
						else
							alert("Este documento será publicado somente após a conclusão da tarefa!");
					}
				}
			}]
		}]
	},{
		xtype:'fieldset',
		layout:'form',
		id:'fsAtendimentoNivel2',
		title: 'Atendimento Nível 2',
		items:[{
			xtype:'compositefield',
			fieldLabel:'Data de Início',
			items:[{
				xtype:'datefield',
				id:'datIniAteNivel2',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			},{
				xtype:'label',
				text:'Data de Conclusão:',
				style:'text-align:right;',
				width:295
			},{
				xtype:'datefield',
				id:'datFimAteNivel2',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Atendente',
			id:'resAteNivel2',
			items:[{
				xtype:'textfield',
				id:'matResAteNivel2',
				width:100,
				readOnly:true,
				cls:'x-form-readonly',
				fieldLabel:'Solicitante'
			},{
				xtype:'textfield',
				id:'nomResAteNivel2',
				width:400,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Ação',
			id:'acaAteNivel2',
			width:505,
			items:[{
				xtype:'combo',
				id: 'desAcaAteNivel2',
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:true,
				mode: 'local',
				valueField: 'codigo',
				displayField: 'descricao',
				emptyText: 'Selecione...',
				selectOnFocus:true,
				forceSelection: true,
				width:200,
				store: new Ext.data.ArrayStore({
					fields: ['codigo','descricao'],
					data: [
						[1, 'Concluir Atendimento'],
						[2, 'Repriorizar Chamado'],
						[3, 'Transferir para o Nível 1'],
						[4, 'Transferir para o Nível 3'],
						[5, 'Aguardando'],
						[6, 'Cancelar'],
						[7, 'Informar Previsão do Atendimento']
					]
				}),
				listeners:{
					select:obrigarClassificacao
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/book_open.png',
				tooltip:'Consultar Base de Conhecimento',
				text:'Consultar Base de Conhecimento',
				style:'margin-left:107px;',
				listeners:{
					click:function(){
						abreConsultaBaseConhecimento(2);
					}
				}
			}]
		},{
			xtype:'htmleditor',
			fieldLabel:'Justificativa da Ação',
			id:'desAnaAteNivel2',
			width:505,
			height:100
		},{
			xtype:'compositefield',
			id:'aneNivel2',
			fieldLabel:'Anexar Procedimento',
			items:[{
				xtype:'textfield',
				id:'desArqAneProNivel2',
				fieldLabel:'Arquivo',
				readOnly:true,
				cls:'x-form-readonly',
				width: 505
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/folder_explore.png',
				tooltip:'Selecionar Arquivo',
				listeners:{
					click:function(){
						TransitionData2Form.uploadFile('desArqAneProNivel2',null,function(){
							document.forms[0].conAltAneProNivel2.value = "true";
						});
						
					}
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/page_word.png',
				tooltip:'Visualizar Documento',
				doDisable: false,
				listeners:{
					click:function(){
						if(document.forms[0].numDocAneProNivel2.value != "" && document.forms[0].conAltAneProNivel2.value != "true")
							window.open("/webdesk/documentviewer?companyId=" + getCurrentCompany() + 
								"&WDNrDocto=" + document.forms[0].numDocAneProNivel2.value + 
								"&WDNrVersao=" + document.forms[0].verDocAneProNivel2.value);
						else if(Ext.getCmp('desArqAneProNivel2').getValue() == "")
							alert("Não há documento a ser visualizado!");
						else
							alert("Este documento será publicado somente após a conclusão da tarefa!");
					}
				}
			}]
		}]
	},{
		xtype:'fieldset',
		layout:'form',
		id:'fsAtendimentoNivel3',
		title: 'Atendimento Nível 3',
		items:[{
			xtype:'compositefield',
			fieldLabel:'Data de Início',
			items:[{
				xtype:'datefield',
				id:'datIniAteNivel3',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			},{
				xtype:'label',
				text:'Data de Conclusão:',
				style:'text-align:right;',
				width:295
			},{
				xtype:'datefield',
				id:'datFimAteNivel3',
				width:100,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Atendente',
			id:'resAteNivel3',
			items:[{
				xtype:'textfield',
				id:'matResAteNivel3',
				width:100,
				readOnly:true,
				cls:'x-form-readonly',
				fieldLabel:'Solicitante'
			},{
				xtype:'textfield',
				id:'nomResAteNivel3',
				width:400,
				readOnly:true,
				cls:'x-form-readonly'
			}]
		},{
			xtype:'compositefield',
			fieldLabel:'Ação',
			id:'acaAteNivel3',
			width:505,
			items:[{
				xtype:'combo',
				id: 'desAcaAteNivel3',
				typeAhead: true,
				triggerAction: 'all',
				lazyRender:true,
				mode: 'local',
				valueField: 'codigo',
				displayField: 'descricao',
				emptyText: 'Selecione...',
				selectOnFocus:true,
				forceSelection: true,
				width:200,
				store: new Ext.data.ArrayStore({
					fields: ['codigo','descricao'],
					data: [
						[1, 'Concluir Atendimento'],
						[2, 'Repriorizar Chamado'],
						[3, 'Transferir para o Nível 1'],
						[4, 'Transferir para o Nível 2'],
						[5, 'Aguardando'],
						[6, 'Cancelar'],
						[7, 'Informar Previsão do Atendimento']
					]
				}),
				listeners:{
					select:obrigarClassificacao
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/book_open.png',
				tooltip:'Consultar Base de Conhecimento',
				text:'Consultar Base de Conhecimento',
				style:'margin-left:107px;',
				listeners:{
					click:function(){
						abreConsultaBaseConhecimento(3);
					}
				}
			}]
		},{
			xtype:'htmleditor',
			fieldLabel:'Justificativa da Ação',
			id:'desAnaAteNivel3',
			width:505,
			height:100
		},{
			xtype:'compositefield',
			id:'aneNivel3',
			fieldLabel:'Anexar Procedimento',
			items:[{
				xtype:'textfield',
				id:'desArqAneProNivel3',
				fieldLabel:'Arquivo',
				readOnly:true,
				cls:'x-form-readonly',
				width: 505
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/folder_explore.png',
				tooltip:'Selecionar Arquivo',
				listeners:{
					click:function(){
						TransitionData2Form.uploadFile('desArqAneProNivel3',null,function(){
							document.forms[0].conAltAneProNivel3.value = "true";
						});
						
					}
				}
			},{
				xtype:'button',
				icon:'/BPMSLibs/images/page_word.png',
				tooltip:'Visualizar Documento',
				doDisable: false,
				listeners:{
					click:function(){
						if(document.forms[0].numDocAneProNivel3.value != "" && document.forms[0].conAltAneProNivel3.value != "true")
							window.open("/webdesk/documentviewer?companyId=" + getCurrentCompany() + 
								"&WDNrDocto=" + document.forms[0].numDocAneProNivel3.value + 
								"&WDNrVersao=" + document.forms[0].verDocAneProNivel3.value);
						else if(Ext.getCmp('desArqAneProNivel3').getValue() == "")
							alert("Não há documento a ser visualizado!");
						else
							alert("Este documento será publicado somente após a conclusão da tarefa!");
					}
				}
			}]
		}]
	}]
});

TransitionData2Form.bpms = new Ext.Viewport({
	layout:'fit',
	items:[{
		xtype:'tabpanel',
		id:'principal',
		border:false,
		activeTab: 0,
		deferredRender:false,
		defaults:{
			autoScroll:true,
			bodyStyle:'padding:10px'
		},
		listeners:{
			tabchange:function(obj,tab){
				tab.doLayout();
			}
		},
		items:[]
	}]
});