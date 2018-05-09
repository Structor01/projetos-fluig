/**
 * Ocorre antes da solicitação ser movimentada, após já ter sido selecionada
 * a atividade destino, o usuário e demais informações necessárias à solicitação.
 **/
var beforeSendValidate = function(numState, nextState) {

	console.log("--Debbug-- beforeSendValidate-");
	console.log("--Debbug-- numState: " + numState);
	console.log("--Debbug-- nextState: " + nextState);
	var INICIO = 0;
	console.log("--Debbug-- Inicio: " + INICIO);
	$('.has-error').removeClass('has-error');

//*Inicio
	if ( numState == '00' || numState == '01' || numState == '04' ) {

		/*if ($('#codUserProtheus').val() == '' || $('#codUserProtheus').val() == undefined) {
			$('div.page-content.container-fluid').css('display', 'none');
			throw ('Solicitação de Compra - Solicitante sem cadastro no ERP Protheus. Favor verificar.')
		}*/
		console.log("--Debbug-- State" + numState);
		if ($('#zoomGrupoProduto').val() == '' || $('#zoomGrupoProduto').val() == undefined){
			$('#zoomGrupoProduto').parent( 'div' ).addClass('has-error');
			throw ('Grupo de Produto não informado!');
		}

		if ($('#zoomFilial').val() == '' || $('#zoomFilial').val() == undefined){
			$('#zoomFilial').parent( 'div' ).addClass('has-error');
			throw ('Filial não informada!');
		}

		if ($('#zoomFilialEntrega').val() == '' || $('#zoomFilialEntrega').val() == undefined){
			$('#zoomFilialEntrega').parent( 'div' ).addClass('has-error');
			throw ('Filial de Entrega não informada!');
		}

		var retornoProduto = validarProduto();

		if ( retornoProduto[0] != '' && retornoProduto[0] != undefined) {
			if (retornoProduto[1] != '') {
				$('#'+retornoProduto[1]).parent( 'div' ).addClass('has-error');
			}
			throw (retornoProduto[0]);
		}

		if ($('#compraDireta').val() == 'N') {
			var retornoAprov = getAprov();
			if (retornoAprov == 'N') {
				throw ('Usuário não possui Alçada de Aprovação para Solicitação de Compras! Favor verificar.');
			} else {
				$('#idAprovDepto').val(retornoAprov);
			}
		}

	} else
//*Aprovar Solicitação de Compra
console.log("--Debbug-- State" + numState);

	if ( numState == '05' ) {

		if ($('#aprovado').val() == '..' || $('#aprovado').val() == undefined){
			$('#aprovado').parent( 'div' ).addClass('has-error');
			throw ('Aprovação não informada!');
		} else
			if ($('#aprovado').val() == 'Não' && ($('#parecer').val() == '' || $('#parecer').val() == undefined)) {
				$('#parecer').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	}
}

/**
 * Função para validação do paixfilho de Produto
 * @param
 * @returns '' - caso esteja ok / Mensagem de erro
 */
function validarProduto() {

	var tableProduto = $('table#tbSolCompras tbody tr [id^="zoomProduto___"]');
	var tableCr = $('table#tbSolCompras tbody tr [id^="zoomCr___"]');
	var tableQtde = $('table#tbSolCompras tbody tr [id^="qtde___"]');
	var retorno = new Array();

	if (tableProduto.length > 0) {
		for(var i = 0; i < tableProduto.length; i++){
			/*var index = tableProduto[0].id.substr(14,3);
			var retornoHex = ConverteBase64ParaHexadecimal(index);
			var imagemHex = document.getElementById('imagemHex___'+index);
			imagemHex.value = retornoHex;*/

			if (tableProduto[i].value == '') {
				retorno.push('Código do Produto não preenchido');
				retorno.push(tableProduto[i].id);
			}

			if (tableCr[i].value == '') {
				retorno.push('Centro de Custo não preenchido');
				retorno.push(tableCr[i].id);
			}

			if (isNaN(parseInt(tableQtde[i].value)) || parseInt(tableQtde[i].value.replace(/[^\d]+/gi,'.')) == 0) {
				retorno.push('Quantidade não preenchida');
				retorno.push(tableQtde[i].id);
			}

		}
	} else {
		retorno.push('Informe ao menos um produto.');
		retorno.push('');
	}
	return retorno;

};

//funcao para pegar o aprovador do usuario
function getAprov() {

	var user = $('#idSolicitante').val();
	var c1 = DatasetFactory.createConstraint('idColaborador', user, user, ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('metadata#active', 'true', 'true', ConstraintType.MUST);
	var colunasAlcadaCoordenacao = new Array('idCoordenador');
	var dsAlcadaCoordenacao = DatasetFactory.getDataset('dsAlcadaCoordenacao', colunasAlcadaCoordenacao, new Array(c1, c2), null);

	if (dsAlcadaCoordenacao.values.length > 0) {
		return dsAlcadaCoordenacao.values[0].idCoordenador;
	} else {
		return 'N';
	}
}
