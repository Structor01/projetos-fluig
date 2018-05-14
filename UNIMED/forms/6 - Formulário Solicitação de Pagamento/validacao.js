/**
 * Ocorre antes da solicitação ser movimentada, após já ter sido selecionada 
 * a atividade destino, o usuário e demais informações necessárias à solicitação.
 **/
var beforeSendValidate = function(numState, nextState) {

	console.log("--Debbug-- beforeSendValidate-");
	console.log("--Debbug-- numState: " + numState);
	console.log("--Debbug-- nextState: " + nextState); 
	var INICIO = 0;
	$('.has-error').removeClass('has-error');
	$('#aNavRateio').attr('aria-expanded', false);
	$('#navRateio').removeClass('active');					
	$('#aNavPagamento').attr('aria-expanded', true);
	$('#navPagamento').addClass('active');

    if($('#rateio').val() == 'S') {
        var v = validaRateios(true);
        if(v === false) throw "Erro! Por favor, corrija os rateios.";
    }
	
//*Inicio	
	if ( numState == '00' || numState == '01' || numState == '04' || numState == '08' || numState == '22' || numState == '44') {
		
		if ($('#tipoContrato').val() == '' || $('#tipoContrato').val() == undefined || $('#tipoContrato').val() == '..'){
			$('#tipoContrato').parent( 'div' ).addClass('has-error');
			throw ('Tipo de Contrato não informado!');
		}
		
		var valorPagto = parseInt($('#valorPagamento').val().replace(/[^\d]+/g,''));
		
		if (isNaN(valorPagto) || valorPagto == 0){
			$('#valorPagamento').parent( 'div' ).addClass('has-error');
			throw ('Valor do Pagamento Bruto não informado ou igual a zeros!');
		}

		var valorPagto = parseInt($('#valorPagtoLiquido').val().replace(/[^\d]+/g,''));

		if (isNaN(valorPagto) || valorPagto == 0){
			$('#valorPagtoLiquido').parent( 'div' ).addClass('has-error');
			throw ('Valor do Pagamento Líquido não informado ou igual a zeros!');
		}

		if ($('#notaFiscal').val() == '' || $('#notaFiscal').val() == undefined || $('#notaFiscal').val() == null){
			$('#notaFiscal').parent( 'div' ).addClass('has-error');
			throw ('Nota Fiscal não informada!');
		}
		
		var dtVenc = $('#dtVenc').val();
		if (dtVenc == '' || dtVenc == undefined){
			$('#dtVenc').parent( 'div' ).addClass('has-error');
			throw ('Data de Vencimento não informada!');
		} else 
		if (validaData(dtVenc) != 4) {
			$('#dtVenc').parent( 'div' ).addClass('has-error');
			throw ('Data de Vencimento inválida!');
		}
		else 
		if (validaPrazo(dtVenc) != 0) {
			$('#dtVenc').parent( 'div' ).addClass('has-error');
			throw ('Data de Vencimento fora do prazo mínimo de 10 dias corridos!');
		}

		if ($('#zoomNatureza').val().length == 0){
			$('#zoomNatureza').parent( 'div' ).addClass('has-error');
			throw ('Natureza não informada!');
		}		
		if ($('#zoomTipoPagto').val().length == 0){
			$('#zoomTipoPagto').parent( 'div' ).addClass('has-error');
			throw ('Tipo de Pagamento não informado!');
		}
		if ($('#zoomFormaPagto').val().length == 0){
			$('#zoomFormaPagto').parent( 'div' ).addClass('has-error');
			throw ('Forma de Pagamento não informada!');
		}

		var dtEmissao = $('#dtEmissao').val();
		if (dtEmissao == '' || dtEmissao == undefined){
			$('#dtEmissao').parent( 'div' ).addClass('has-error');
			throw ('Data de Emissão não informada!');
		} else 
		if (validaData(dtEmissao) != 4) {
			$('#dtEmissao').parent( 'div' ).addClass('has-error');
			throw ('Data de Emissão inválida!');
		}
	
		var codForm = $('#CODFORMPAGTO').val();
		if ( (codForm == '11' || codForm == '30' || codForm == '31') && ($('#codBarra').val() == '')) {
			$('#codBarra').parent( 'div' ).addClass('has-error');
			throw ('Código de Barras obrigatório!');
		}
		/*if ($('#cBanco').val() == '' || $('#cBanco').val() == undefined){
			$('#cBanco').parent( 'div' ).addClass('has-error');
			throw ('Cód/Nome do Banco não informado!');
		}
		
		if ($('#cAgencia').val() == '' || $('#cAgencia').val() == undefined){
			$('#cAgencia').parent( 'div' ).addClass('has-error');
			throw ('Agência Bancária não informada!');
		}
		
		if ($('#cCCorrente').val() == '' || $('#cCCorrente').val() == undefined){
			$('#cCCorrente').parent( 'div' ).addClass('has-error');
			throw ('Conta Corrente não informada!');
		}*/
		
		if ($('#referente').val() == '' || $('#referente').val() == undefined){
			$('#referente').parent( 'div' ).addClass('has-error');
			throw ('Referente não informado!');
		}		

		if ($('#historico').val() == '' || $('#historico').val() == undefined){
			$('#historico').parent( 'div' ).addClass('has-error');
			throw ('Histórico não informado!');
		}		
		
		if ($('#zoomCCustoSolic').val() == '' || $('#zoomCCustoSolic').val() == undefined){
			$('#zoomCCustoSolic').parent( 'div' ).addClass('has-error');
			throw ('Centro de Custo Solicitante não informado!');
		}
		
		if ($('#zoomCCusto').val() == '' || $('#zoomCCusto').val() == undefined){
			$('#zoomCCusto').parent( 'div' ).addClass('has-error');
			throw ('Centro de Custo Pagador não informado!');
		}
		// else
		// 	if ($('#idRateio').val() == 'S') {
		// 		$('#aNavRateio').attr('aria-expanded', true);
		// 		$('#navRateio').addClass('active');
		// 		$('#aNavPagamento').attr('aria-expanded', false);
		// 		$('#navPagamento').removeClass('active');
		// 		var retornoRateio = validaRateio(valorPagto);
		// 		if ( retornoRateio[0] != '' && retornoRateio[0] != undefined) {
		// 			if (retornoRateio[1] != '') {
		// 				$('#'+retornoRateio[1]).parent( 'div' ).addClass('has-error');
		// 			}
		// 			throw (retornoRateio[0]);
		// 		}
		// 		var total = $('#valorPagamento').val().replace(/[^\d]+/g,'');
		// 		var totalRateio = $('#valorRateioTotal').val().replace(/[^\d]+/g,'');
		//
		// 		if ( totalRateio != total) {
		// 			$('#valorRateioTotal').parent( 'div' ).addClass('has-error');
		// 			throw 'Valor Total do Rateio ' + $('#valorRateioTotal').val() + ' é diferente do Valor do Pagamento informado ' + $('#valorPagamento').val();
		// 		}
		// 	}
		
		if ($('#idRespGerencia').val() == '') {
			throw 'Centro de Custo Solicitante sem Responsável Gerência Cadastrado. Favor selecionar outro Centro de Custo.';
		} else {
			if	($('#idRespDiretoria').val() == '') {
				throw 'Centro de Custo Solicitante sem Responsável Diretoria Cadastrado. Favor selecionar outro Centro de Custo.';
			}
		}
		
	} else
//*Validar Prenchimento - Gerencia		
	if ( numState == '09' || numState == '15') {

		$('#accordion').accordion('option', 'active', 0);
		
		if ($('#aprovGerencia').val() == '..' || $('#aprovGerencia').val() == undefined){
			$('#aprovGerencia').parent( 'div' ).addClass('has-error');
			throw ('Aprovação da Gerencia não informada!');
		} else 
			if ($('#aprovGerencia').val() == 'Não' && ($('#parecerGerencia').val() == '' || $('#parecerGerencia').val() == undefined)) {
				$('#parecerGerencia').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	} else
//*Aprovação Diretoria		
	if ( numState == '16' || numState == '18') {
		
		$('#accordion').accordion('option', 'active', 1);
		
		if ($('#aprovDiretoria').val() == '..' || $('#aprovDiretoria').val() == undefined){
			$('#aprovDiretoria').parent( 'div' ).addClass('has-error');
			throw ('Aprovação da Diretoria não informada!');
		} else 
			if ($('#aprovDiretoria').val() == 'Não' && $('#parecerDiretoria').val() ) {
				$('#parecerDiretoria').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	} else
//*Aprovação Diretoria Financeira		
	if ( numState == '17' || numState == '23') {
		
		$('#accordion').accordion('option', 'active', 2);
		
		if ($('#aprovDirFin').val() == '..' || $('#aprovDirFin').val() == undefined){
			$('#aprovDirFin').parent( 'div' ).addClass('has-error');
			throw ('Aprovação da Diretoria Financeira não informada!');
		} else 
			if ($('#aprovDirFin').val() == 'Não' && ($('#parecerDirFin').val() == '' || $('#parecerDirFin').val() == undefined) ) {
				$('#parecerDirFin').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	} else
//*Análise Tributária - NF		
	if ( numState == '11' || numState == '28') {
		
		if ($("#idDirf").val() == '1' && ($('#zoomConsultaRetencao').val() == '' || $('#zoomConsultaRetencao').val() == undefined)) {
			$('#zoomConsultaRetencao').parent( 'div' ).addClass('has-error');
			throw ('Retenção obrigatória quando for Gerar DIRF!');
		}
		
		$('#accordion').accordion('option', 'active', 3);
		
		if ($('#aprovCont').val() == '..' || $('#aprovCont').val() == undefined){
			$('#aprovCont').parent( 'div' ).addClass('has-error');
			throw ('Aprovação da Contabilidade não informada!');
		} else 
			if ($('#aprovCont').val() == 'Não' && ( $('#parecerCont').val() == '' || $('#parecerCont').val() == undefined ) ) {
				$('#parecerCont').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	} else

//*Conferir Valores / Lançamento Contas a Pagar		
	if ( numState == '13' || numState == '32') {
		
		$('#accordion').accordion('option', 'active', 4);
		
		if ($('#aprovFin').val() == '..' || $('#aprovFin').val() == undefined){
			$('#aprovFin').parent( 'div' ).addClass('has-error');
			throw ('Aprovação do Financerio não informada!');
		} else 
			if ($('#aprovFin').val() == 'Não' && ($('#parecerFin').val() == '' || $('#parecerFin').val() == undefined) ) {
				$('#parecerFin').parent( 'div' ).addClass('has-error');
				throw ('Parecer obrigatório quando não aprovado!');
			}
	} 
		
}

/**
 * Função para validação do paixfilho de rateio
 * @param valorPagto
 * @returns '' - caso esteja ok / Mensagem de erro
 */
// function validaRateio(valorPagto) {
//
// 	var valor = valorPagto;
//
// 	var tableValor = $('table#tableRateio tbody tr [id^="valorRateio___"]');
// 	var tableCC = $('table#tableRateio tbody tr [id^="zoomCr___"]');
// 	var retorno = new Array();
//
// 	if (tableCC.length > 0) {
// 		for(var i = 0; i < tableCC.length; i++){
//
// 			if (tableCC[i].value == '') {
// 				retorno.push('Centro de Custo do Rateio não preenchido');
// 				retorno.push(tableCC[i].id);
// 			}
// 			if (isNaN(parseFloat(tableValor[i].value)) || parseFloat(tableValor[i].value.replace(/[^\d]+/gi,'.')) == 0) {
// 				retorno.push('Valor do Rateio não preenchido');
// 				retorno.push(tableValor[i].id);
// 			}
// 			//Verifica Duplicidade
// 			for(var j = 0; j < tableCC.length; j++){
// 				if (tableCC[i].value == tableCC[j].value && i != j) {
// 					retorno.push('Centro de Custo do Rateio Duplicado');
// 					retorno.push(tableCC[i].id);
// 				}
// 			}
// 		}
// 	} else {
// 		retorno.push('Centro de Custo por Rateio. Informe ao menos um registro de Rateio');
// 		retorno.push('');
// 	}
// 	return retorno;
//
// };