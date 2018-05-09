var beforeSendValidate = function(numState, nextState) {
	console.log("--Debbug-- beforeSendValidate-");
	console.log("--Debbug-- numState: " + numState);
	console.log("--Debbug-- nextState: " + nextState);
	$('#uploadBt').addClass('hide');
	$('.has-error').removeClass('.has-error');

	if(numState == 12 || numState == 20) throw ("Ação não permitida!");

	var v = $('.ob').length;

	var correto = true;
	for(var i=0; i<v; i++) {
		if($('.ob:eq('+i+')').is(":visible")) {
			var value = $('.ob:eq('+i+')').children('.form-control').val();
			if(value == "" || value == undefined || value == null) {
				$('.ob:eq('+i+')').addClass('has-error');
				correto = false;
			}
			console.log(value);
		}
	}

	if(correto == false) throw "Por favor, preencha os campos em vermelho";
	else
	$('.has-error').removeClass('has-error');

	if(numState == 5) enviaEmailNotificacao();

	if(numState == 0 || numState == 4 || numState == 81) {
		var idx = wdkAddChild('tableHistorico');
		var dtNow = getDateNow();
		$('#histUsuario___'+idx).val(nomeUsuario);
		$('#histData___'+idx).val(dtNow);
		$('#histStatus___'+idx).val("Início de Atividade");
		$('#histInt___'+idx).val("Usuário iniciou ou alterou uma Solicitação de Compras.");
	}

	// if(numState == 5) {
	// 	var idx = wdkAddChild('tableHistorico');
	// 	var dtNow = getDateNow();
	// 	$('#histUsuario___'+idx).val(nomeUsuario);
	// 	$('#histData___'+idx).val(dtNow);
	// 	$('#histStatus___'+idx).val("Aprovar Solicitação de Compras");
	// 	$('#histInt___'+idx).val($('#parecer').val());
	// }


	if(numState == 73) {
		var idx = wdkAddChild('tableHistorico');
		var dtNow = getDateNow();
		$('#histUsuario___'+idx).val(nomeUsuario);
		$('#histData___'+idx).val(dtNow);
		$('#histStatus___'+idx).val("Aprovação Compras");
		$('#histInt___'+idx).val($('#parecerDirCompra').val());
	}

}

function getDateNow() {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1)	: (today.getMonth() + 1);
    var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    var hour = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
    var minute = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    var second = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    var currentHour = hour + ":" + minute + ":" + second;
    var currentDate = day + '/' + month + '/' + year;
    var currentTime = currentDate + "  " + currentHour;
    return currentTime;
}


function Inicio() {
	var atividade = WKNumState;
	var processo = WKNumProces;
	var cadAprov = cadastroAprov;

	if(WKNumState == 12 || WKNumState == 20) {
		window.parent.$("[data-send]").hide();
		window.parent.$("[data-take-decision]").hide();
		window.parent.$("#workflowActions").hide();
	}

	console.log('atividade: '+atividade);

	$('#solicitacaoFluig').val(WKNumProces);

	if(atividade == 5) {
		$('.aprovacao').show();
	} else {
		$('.aprovacao').hide();
	}

	if(atividade != 0 && atividade != 5 && atividade != 73) {
		$('.nSolicitacao').removeClass('hide');
	}

	if(atividade != 0 && atividade != 1 && atividade != 4 && atividade != 81) {
		$('#verAnexo').attr('href',$('#publiclink').val());
		if($('#publiclink').val() != "") $('#verAnexo').show();
		$('#uploadBt').hide();
		$('#btAddProduto').hide();
		$('.trash-pai').hide();
	} else {
		$('#verAnexo').attr('href',$('#publiclink').val());
		$('#verAnexo').hide();
		$('#uploadBt').show();
		$('#btAddProduto').show();
		$('.trash-pai').show();
		// filterOnZomm();
	}

	if(atividade == 73) {
		$('#aprovadorDirCompra').val(nomeUsuario);
		$('.aprovacaoDir').removeClass('hide');
	}
	/*
	* Verifica se está no Fork de decisão (hierarquia de aprovação). Atividade 38
	* Caso esteja na atividade 38 e a próxima atividade seja 73 (aprovação da Diretoria de Compras) e o
	* último aprovador tiver papel de Pró Reitor envia e-mail.
	*/

	if(cadAprov == 'N' && $('#compraDireta').val() == 'N') {
		for(var i=1; i<=$('.panel').length; i++) {
			$('.panel:eq('+i+')').hide();
		}
		mensagemAlerta('Atenção', 'Este usuário não possui Cadastro de Hierarquia.', false);
	}

	if($('#compraDireta').val() == 'S') $('.gestorResp').hide();

	// /**
	//  * Atividade Inicio
	//  **/
	// 	if	(atividade == 04 || atividade == 01 || atividade == 00)  {
	// 		/*if ($('#codUserProtheus').val() == '' || $('#codUserProtheus').val() == undefined) {
	// 			$('div.page-content.container-fluid').css('display', 'none');
	// 			MensagemAlerta('Solicitação de Compra', 'Solicitante sem cadastro no ERP Protheus. Favor verificar.')
	// 		}*/
	// 		if ($('#aprovado').val() != '..') {
	// 			$('#fsHistorico').css('display', 'block');
	// 		} else {
	// 			$('#fsHistorico').css('display', 'none');
	// 		}
	// 	} else{
	// //*Aorivar
	// 	if	(atividade == 05)  {
	// 		desabilitaCampos('#fsDadosPesquisa');
	// 		$('#fsDadosAprovacao').css('display', 'block');
	// 	} else
	// //*Aprovar Diretoria
	// 	if	(atividade == 16)  {
	// 	} else
	// //*Aprovar Diretoria Financeira
	// 	if	(atividade == 17)  {
	// 	} else
	// //*Análise Tributária - NF
	// 	if	(atividade == 11)  {
	// 	} else
	// //*Conferir Valores / Lançamento Contas a Pagar
	// 	if	(atividade == 13)  {
	// 	} else
	// //*Corrigir os valores
	// 	if	(atividade == 22)  {
	//
	// 	}
	// 	}
}

/**
* Desabilita os campos da DIV
* @param idcampo
* @returns
*/
function desabilitaCampos(idcampo){

	$(idcampo).find("input, textarea, select").each(function(){
		$('#'+this.id).attr('readonly', true);
	})

	$(idcampo).find("select").each(function(){
		$('select#'+this.id+' option:not(:selected)').prop('disabled', true);
	})

	$(idcampo).find("input[type=file]").each(function(){
		$('#' + this.id).css('display', 'none');
	})

	$(idcampo).find("button").each(function(){
		$('#' + this.id).prop('disabled', true);
	})

	$('.fluigicon-trash').removeAttr('onclick');
}
/**
* Função para habilitar DIV
* @param idcampo
* @returns
*/
function habilitaCampos(idcampo){

	$(idcampo).find("input, textarea, input[type=zoom], select").each(function(){
		$(this).attr("readonly", false);
	})

	$(idcampo).find("select").each(function(){
		$('select#' + this.id +' option').removeAttr('disabled');
	})

	$(idcampo).find("input[type=checkbox]").each(function(){
		$('#' + this.id).removeAttr('disabled');
	})

}

function inputFile(id) {

	var index = id.substring(id.indexOf("___") + 3, id.indexOf("___") + 6);
	$('#btnImagem___'+index).click();
}


function mensagemAlerta(titulo, mensagem, fechar){
	modalMyLoading = FLUIGC.modal({
		title: titulo,
		content: mensagem,
		id: 	'fluig-modal',
		size: 	'larger',
		actions: [{
			'label': 	'Ok',
			'bind': 	'data-open-modal',
			'autoClose': true
		}]
	});
	$(".modal-title").text(titulo);
	$(".modal-body").text(mensagem);
}

function getHierarquia(e) {
	var id = $(e).val();
	$('#centroCusto').val(id);
	var c = cCustoFunc();
	for(var i=0; i<c.length; i++){
		if(c[i].indexOf(id) > -1) {
			$('#gestorImediato_id').val(c[i][1]);
			$('#gestorImediato').val(c[i][2]);
			$('#centroCusto_id').val(c[i][0]);
		}
	}
}

function cCustoFunc() {
	var cCusto = [];
	var count = 1;
	var cad = cadastroAprov.split(',');
	var arr = [];
	for(var i=0; i<cad.length; i++) {
		arr.push(cad[i]);
		if(count == 4) {
			var arrLimpo = arr;
			cCusto.push(arrLimpo);
			count = 0;
			arr = [];
		}
		count++;
	}

	return cCusto;
}

$(document).ready(function(){
	var atividade = WKNumState;
	var cCusto = cCustoFunc();
	if(atividade == 0 || atividade == 4 || atividade == 81) {

		var vCusto = $('#centroCusto_id').val();
		if(cCusto.length > 1) {
			$('#gestorImediato').val('Escolha o Centro de Custo');
			var content = '<option value="">Escolha o Centro de Custo</option>';
			for(var i=0; i<cCusto.length; i++){
				if(vCusto == cCusto[i][0]) {
					var sl = " selected";
					$('#gestorImediato_id').val(cCusto[i][1]);
					$('#gestorImediato').val(cCusto[i][2]);
					$('#centroCusto_id').val(cCusto[i][0]);
				} else {
					sl = "";
				}
				content += '<option value="'+cCusto[i][3]+'"'+sl+'>'+cCusto[i][3]+'</option>';
			}
			$('#centroCusto').replaceWith($('<select onchange="getHierarquia(this)" class="form-control" name="centroCusto" id="centroCusto">'+content+'</select>'));
		} else {
			$('#gestorImediato').val(cCusto[0][2]);
			$('#centroCusto').val(cCusto[0][3]);
			$('#centroCusto_id').val(cCusto[0][0]);
			$('#gestorImediato_id').val(cCusto[0][1]);

			$('#gestorImediato').html(cCusto[0][2]);
			$('#centroCusto').html(cCusto[0][3]);
		}
	} else {
		$('#centroCusto').prop('disabled', true);
		$('#gestorImediato').prop('disabled', true);
	}

	$('#aprovado').on('change', function() {
		if($(this).val() == "Aprovado")
			$('#parecer').parent('div').removeClass('ob');
		else
			$('#parecer').parent('div').addClass('ob');

	});

	$('#aprovaDirCompras').on('change', function() {
		if($(this).val() == "S")
			$('#parecerDirCompra').parent('div').removeClass('ob');
		else
			$('#parecerDirCompra').parent('div').addClass('ob');

	});

	$('#removerLink').on('click',function(){
		$('#publiclink').val('');
		$('#verAnexo').hide();
		$('#removeBt').hide();
		$('#uploadId').html('Buscar Arquivo(s)');
	});

	$("#btAddProduto").on('click',function(){
		var grupoProd = $('#grupoProd').val();

		if(grupoProd == "" || grupoProd == undefined || grupoProd == null) {
			mensagemAlerta("Atenção", "Por favor, para continuar escolha um grupo de produto.", false);
		} else {
			var idx = wdkAddChild('tbSolCompras');
			for(var i=1; i < $('.rowPF').length; i++) {
				var row = $('.rowPF:eq('+i+')').children('td:eq(1)');
				row = row.children('.row');
				for (var r=0; r<row.length; r++) {
					if(row.eq(r).children().hasClass('obs') === false)
						row.eq(r).children().addClass('ob');
				}

				// $(".onlyNumber").keydown(function (e) {
				// 		// Allow: backspace, delete, tab, escape, enter and .
				// 		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				// 		// Allow: Ctrl+A, Command+A
				// 		(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// 		// Allow: home, end, left, right, down, up
				// 		(e.keyCode >= 35 && e.keyCode <= 40)) {
				// 				// let it happen, don't do anything
				// 				return;
				// 		}
				// 		// Ensure that it is a number and stop the keypress
				// 		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				// 				e.preventDefault();
				// 		}
				// });
				$(".onlyNumber").mask('00.000', {reverse: true});
				reloadZoomFilterValues("zoomProduto___"+idx, "CODGRUPO, " + $('#grupoProd').val().toString());
			}
		}
	});

	// $('li.select2-search.select2-search--inline').remove();
});

// function filterOnZomm() {
// 	var length = $('[id*=idx___]').length;
// 	for(var i=0; i<length; i++) {
// 		var idx = $('[id*=idx___]').eq(i).attr('id').replace("idx___", "");
// 		reloadZoomFilterValues("zoomProduto___"+idx, "CODGRUPO, " + $('#grupoProd').val().toString());
// 	}
// }

/**
* Função para deletar elemento da tabela PaixFilho, e decrementar o valor do pagamento
* @param oElement
* @returns
*/
function fnCustomDelete(oElement, id){
	fnWdkRemoveChild(oElement);
};

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
