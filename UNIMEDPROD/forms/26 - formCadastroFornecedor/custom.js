function Inicio() {
	
	var atividade = WKNumState;
	var processo = WKNumProces;
	console.log('atividade: '+atividade);	

	/* Abertura Solicitação	
	if	(atividade != 00 && atividade != 01 && atividade != 04)  {
		desabilitaDiv('#divDadosCadastro');
	}*/
}

$(document).ready(function() {
	limpaForm();
	$("#A2CGC").on('blur',function(){
		if (this.value == null || this.value == '' || this.value == undefined) {
			MensagemAlerta('Cadastro de Fornecedor', 'Favor informar o CPNJ/CPF do Fornecedor');
		} else 
			if ($('#zoomUnidade').val() == '' || $('#zoomUnidade').val() == null || $('#zoomUnidade').val() == undefined) {
				MensagemAlerta('Cadastro de Fornecedor', 'Favor informar Unidade para cadastro de Fornecedor');
			} else {
				var fornecedor = consultaFornecedor(this.value);
			}
	});

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#A2END").val("");
        $("#A2BAIRRO").val("");
        $("#A2MUN").val("");
        $("#A2EST").val("");
        $("#A2CODMUN").val("");
    }
    
    //Quando o campo cep perde o foco.
    $("#A2CEP").blur(function() {

        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#A2END").val("...");
                $("#A2BAIRRO").val("...");
                $("#A2MUN").val("...");
                $("#A2EST").val("...");
                $("#A2CODMUN").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("//viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        //Atualiza os campos com os valores da consulta.
                    	if ( (dados.logradouro == '') || (dados.logradouro == undefined) ) {
                    		$("#A2END").removeAttr('readonly');
                    		$("#A2BAIRRO").removeAttr('readonly');
                    	} else {
                    		$("#A2END").val(dados.logradouro + " / " + dados.complemento);
                            $("#A2BAIRRO").val(dados.bairro);
                    	}
                        $("#A2MUN").val(dados.localidade);
                        $("#A2EST").val(dados.uf);
                        $("#A2CODMUN").val(dados.ibge);
                    } //end if.
                    else {
                        //CEP pesquisado não foi encontrado.
                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});

function desabilitaDiv(idcampo){

	$(idcampo).find("input, textarea, select").each(function(){
		$('#'+this.id).attr('readonly', true);
	})
	
	$(idcampo).find("select").each(function(){
		$('select#'+this.id+' option:not(:selected)').prop('disabled', true);
	})

	$(idcampo).find("input[type=radio]").each(function(){
		if (! $('#'+this.id).is(':checked')) {
			$('#'+this.id).prop('disabled', true);
		}
		
	})
	
}

/**
 * Mascara do campo - CPF/CNPJ, altera dinamicamente
 * @param campo     - Campos do Formulário
 * @param teclapres - Tecla pressionada
 * @returns {Boolean}
 */
function MascaraCpfCnpj(campo,teclapres) {
	var tecla = teclapres.keyCode;

	if ((tecla < 48 || tecla > 57) && (tecla < 96 || tecla > 105) && tecla != 46 && tecla != 8 && tecla != 9) {
		return false;
	}

	var vr = campo.value;
	vr = vr.replace( /\//g, "" );
	vr = vr.replace( /-/g, "" );
	vr = vr.replace( /\./g, "" );
	var tam = vr.length;

	if ( tam <= 2 ) {
		campo.value = vr;
	}
	if ( (tam > 2) && (tam <= 5) ) {
		campo.value = vr.substr( 0, tam - 2 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam >= 6) && (tam <= 8) ) {
		campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam >= 9) && (tam <= 11) ) {
		campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam == 12) ) {
		campo.value = vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
	}
	if ( (tam > 12) && (tam <= 14) ) {
		campo.value = vr.substr( 0, tam - 12 ) + '.' + vr.substr( tam - 12, 3 ) + '.' + vr.substr( tam - 9, 3 ) + '/' + vr.substr( tam - 6, 4 ) + '-' + vr.substr( tam - 2, tam );
	}
	if (tam > 13){ 	
		if (tecla != 8){
			return false
		}
	}
}

/**
 * Rotina para consulta de Fornecedor
 * @param valor - CPF/CNPJ
 * @returns
 */
function consultaFornecedor(valor) {
	
	var c1 = DatasetFactory.createConstraint('CCODIGO', $('#A2LOJA').val(), $('#A2LOJA').val(),ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint('CCNPJCPF', valor.replace(/[^\d]+/gi,''), valor.replace(/[^\d]+/gi,''),ConstraintType.MUST);
	
	var constraints = new Array(c1, c2);
	var fornecedor = DatasetFactory.getDataset("dsFornecedor", null,constraints, null);

	if (fornecedor.values.length > 0) {
		$('#divDadosForn').css('display', 'none');
		MensagemAlerta('Cadastro de Fornecedor', 'Fornecedor já existe. Favor verificar!');
		return 1;
	} else {
		$('#divDadosForn').css('display', 'block');
		return 0;
	}
}

/**
 * Função para Mensagem em Alerta
 * @param titulo
 * @param mensagem
 * @returns
 */
function MensagemAlerta(titulo,mensagem){
	var myModal = FLUIGC.modal({
		title: titulo,
		content: mensagem,
		id: 'fluig-modal',
		size: 'larger',
		actions: [{
			'label': 'Ok',
			'bind': 'data-open-modal',
			'autoClose': true
		}]
	}, function(err, data) {
		if(err) {
		} else {
		}
	});	
}

function limpaForm() {
	
	$("#A2CGC").val('');
	$("#A2COD").val('');
	$("#A2LOJA").val('');
	$("input[type='radio'][name='A2PESSOA']").prop('checked', false);			
	$("#A2NOME").val('');
	$("#A2NREDUZ").val('');
	$("#A2END").val('');
	$("#A2BAIRRO").val('');
	$("#A2CODMUN").val('');
	$("#A2MUN").val('');
	$("#A2EST").val('');
	$("#A2DDD").val('');
	$("#A2TELEFONE").val('');
	$('#divDadosForn').css('display', 'none');

}