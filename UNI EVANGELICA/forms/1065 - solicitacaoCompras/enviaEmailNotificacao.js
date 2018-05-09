function enviaEmailNotificacao(){

	var diretorAprovador = $('#gestorImediato_id').val();
	var papel = "reitor";
	var possuiPapel = verificarPapelUsuario(diretorAprovador, papel);

	if(possuiPapel == 'S'){
		//Obtém a lista de usuários por um determinado papel
		var listaDeUsuarios = obterUsuariosPorPapel(papel);
		if (listaDeUsuarios != false) {
			var listaDeUsuarioComEmails = new Array();
			//Percore os usuários da lista para obter os dados (email e nome) do usuário
			for (var x = 0; x < listaDeUsuarios.length; x++){
				var dadosUsuario = obterDadosUsuario(listaDeUsuarios[x]);
				listaDeUsuarioComEmails.push(new Array(listaDeUsuarios[x], dadosUsuario[0], dadosUsuario[1]));
			}
			//Obtém dos dados da solicitação (oriundo do formulário)
			var conteudoSolicitacao = montarDadosSolicitacao();

			//Percorre a lista de usuários para enviar o email de notificação;
			for (var e = 0; e < listaDeUsuarioComEmails.length; e++){
				enviarEmail(listaDeUsuarioComEmails[e][2], listaDeUsuarioComEmails[e][1], "Notificação UniON - Soliticação de Compra", conteudoSolicitacao);
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/*
* Função para verificar se o usuário tem um papel ou não
* Param: colleagueId, roleId
* Retur: String 'S' quando encontrar ou 'N' quando o usuário não possuir o papel
*/
function verificarPapelUsuario(usuario, nomePapel) {

	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.colleagueId', usuario, usuario, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', nomePapel, nomePapel, ConstraintType.MUST);
	var dsRole = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(c1, c2), null);

	if (dsRole.values.length > 0) {
		return 'S';
	} else {
		return 'N';
	}
}

/*
* Função para obter os usuário de um determinado papel
* Param: nomePapel (nome do papel ex.: diretor, proReitor, etc)
* Retur: arrayUsuarios (array contendo uma lista do os id dos usuários relacionados ao papel) ou false caso não encontre nenhum usuário
*/
function obterUsuariosPorPapel(nomePapel){

	var c1 = DatasetFactory.createConstraint('workflowColleagueRolePK.roleId', nomePapel, nomePapel, ConstraintType.MUST);
	var dsUsuario = DatasetFactory.getDataset('workflowColleagueRole', null, new Array(c1), null);

	if (dsUsuario.values.length > 0) {
		var arrayUsuarios = new Array();
		for (var x = 0; x < dsUsuario.values.length; x++) {
			arrayUsuarios.push(dsUsuario.values[x]['workflowColleagueRolePK.colleagueId']);
		}
		return arrayUsuarios;
	} else {
		return false;
	}

}

/*
* Função para obter os dados (nome e email) de um determinado usuário
* Param: idUsuario (codigo do usuário)
* Retur: Array com os dados do Usuário (email, nome) ou false caso não encontre nada
*/
function obterDadosUsuario(idUsuario){

	var cst1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', idUsuario, idUsuario, ConstraintType.MUST);
	var colunas = new Array('mail', 'colleagueName');
	var datasetUsuario = DatasetFactory.getDataset('colleague', colunas, new Array(cst1), null);

	if (datasetUsuario.values.length > 0) {
		return new Array(datasetUsuario.values[0].mail, datasetUsuario.values[0].colleagueName);
	} else {
		return false
	}
}

/*
* Função para obter os dados do formulário que serão enviado no corpo do email
* Param:
* Retor: String com conteúdo em formato HTML
*/
function montarDadosSolicitacao() {
	var conteudoSolicitacao = "";
	conteudoSolicitacao += "<p><b>Solicitação</b>: "+$('#solicitacaoCompra').val() + "</p>";
	conteudoSolicitacao += "<p><b>Data Abertura</b>: "+$('#dataAbertura').val() + "</p>";
	conteudoSolicitacao += "<p><b>Centro de Custo</b>: "+$('#centroCusto').val() + "</p>";
	conteudoSolicitacao += "<p><b>Solicitado por</b>: "+$('#nomeSolicitante').val() + "</p>";
	conteudoSolicitacao += "<p><br/><br/><b>ITENS DA SOLICITAÇÃO</b></p></hr>";

	$('[id*=idx___]').each(function(){
		var that = $(this);
		var id = that.attr('id').replace('idx___','');
		conteudoSolicitacao  += "<p> - " + $('#qtde___'+id+'').val() + " " + $('#unidade___'+id+'').val() + " " + $('[name=zoomProduto___'+id+']').val() + "</p>\r\n";
	});

	return conteudoSolicitacao;
}

/*
* Função para enviar
*/
function enviarEmail(nomeDestinatario, emailDestinatario, assunto, conteudo){

		var api = "/api/public/alert/customEmailSender";
		var link = "http://union.unievangelica.edu.br";
		var obj = {
			"to" : emailDestinatario,
			"from" : "diego.rezende@unievangelica.edu.br",
			"subject" : assunto,
			"templateId" : "TPL_SOLICITACAO_COMPRA_APROVADA",
			"dialectId"  : "pt_BR",
			"param" : {
				"NOME_USUARIO": nomeDestinatario,
				"CONTEUDO": conteudo,
				"LINK": link
			}
		}

		var email = $.ajax({
			async : false,
			contentType: "application/json",
			type : "post",
			dataType : "json",
			url : api,
			data : JSON.stringify(obj),
			success:function(obj){                    
				console.log(obj)
			}                
		});

	// var api = "/api/public/alert/customEmailSender";
	// var remetente = "manuel.souza@unievangelica.edu.br";
	// var link = "http://union.unievangelica.edu.br";
	// var template = "TPL_SOLICITACAO_COMPRA_APROVADA";
	// var idioma = "pt_BR";
	//
	// var obj = {
	//   "to" : remetente,
	// "from" : emailDestinatario,
	// "subject" : assunto,
	// "templateId" : template,
	// "dialectId" : idioma,
	// "param" : {
	//  "NOME_USUARIO": nomeDestinatario,
	//  "CONTEUDO": conteudo,
	//  "LINK": link
	//   }
	// }
	//
	// var email = $.ajax({
	//      async : false,
	//      contentType: "application/json",
	//      type : "post",
	//    dataType : "json",
	//    url : api,
	//    data : JSON.stringify(obj),
	//    success:function(obj){
	//         console.log(obj)
	//    }
}
