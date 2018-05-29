/**
 * Ocorre antes da solicitação ser movimentada, após já ter sido selecionada 
 * a atividade destino, o usuário e demais informações necessárias à solicitação.
 **/
var beforeSendValidate = function(numState, nextState) {

	console.log("--Debbug-- beforeSendValidate-");
	console.log("--Debbug-- numState: " + numState);
	console.log("--Debbug-- nextState: " + nextState); 
	$('.has-error').removeClass('has-error');
	var INICIO = 0;
	/** Atividade de Inicio **/
	if	((numState == 00) || (numState == 01) || (numState == 04)) {
		if (( $("#A2CGC").val() == "" ) || ($("#A2CGC").val() == undefined)) {
			$('#A2CGC').parent( 'div' ).addClass('has-error');
			throw("CPF/CNPJ deve ser preenchido!");
		}

		if (( $("#A2COD").val() == "" ) || ($("#A2COD").val() == undefined)) {
			$('#A2COD').parent( 'div' ).addClass('has-error');
			throw("Codigo deve ser preenchido!");
		}

		if (( $("#A2LOJA").val() == "" ) || ($("#A2LOJA").val() == undefined)) {
			$('#A2LOJA').parent( 'div' ).addClass('has-error');
			throw("Loja deve ser preenchido!");
		}

		if (! $("input[type='radio'][name='A2PESSOA']").is(':checked') ) {			
			throw("Pessoa Física/Jurídica deve ser selecionado!");
		}

		if (( $("#A2NOME").val() == "" ) || ($("#A2NOME").val() == undefined)) {
			$('#A2NOME').parent( 'div' ).addClass('has-error');
			throw("Razão Social deve ser preenchido!");
		}
		if (( $("#A2NREDUZ").val() == "" ) || ($("#A2NREDUZ").val() == undefined)) {
			$('#A2NREDUZ').parent( 'div' ).addClass('has-error');
			throw("Nome Fantasia deve ser preenchido!");
		}
		
		if (( $("#A2END").val() == "" ) || ($("#A2END").val() == undefined)) {
			$('#A2END').parent( 'div' ).addClass('has-error');
			throw("Endereço deve ser preenchido!");
		}
		if (( $("#A2BAIRRO").val() == "" ) || ($("#A2BAIRRO").val() == undefined)) {
			$('#A2BAIRRO').parent( 'div' ).addClass('has-error');
			throw("Bairro deve ser preenchido!");
		}
		if (( $("#A2CODMUN").val() == "" ) || ($("#A2CODMUN").val() == undefined)) {
			$('#A2CODMUN').parent( 'div' ).addClass('has-error');
			throw("Código do Município deve ser preenchido!");
		}
		if (( $("#A2MUN").val() == "" ) || ($("#A2MUN").val() == undefined)) {
			$('#A2MUN').parent( 'div' ).addClass('has-error');
			throw("Municipio deve ser preenchido!");
		}
		if (( $("#A2EST").val() == "" ) || ($("#A2EST").val() == undefined)) {
			$('#A2EST').parent( 'div' ).addClass('has-error');
			throw("Estado deve ser preenchido!");
		}
		if (( $("#A2DDD").val() == "" ) || ($("#A2DDD").val() == undefined)) {
			$('#A2DDD').parent( 'div' ).addClass('has-error');
			throw("DDD deve ser preenchido!");
		} else {
			if (!$.isNumeric($("#A2DDD").val())) {
				throw("DDD deve ser numérico!");
			}
		}
		if (( $("#A2TELEFONE").val() == "" ) || ($("#A2TELEFONE").val() == undefined)) {
			$('#A2TELEFONE').parent( 'div' ).addClass('has-error');
			throw("Telefone deve ser preenchido!");
		}

		var tipoPessoa = $("#A2PESSOA1").is(':checked') ? 'F' : 'J';		
		var codMun = $("#A2CODMUN").val();
		var codMunicipio =  codMun.substring(2, codMun.length);
		var A2CGC = $("#A2CGC").val().replace(/[^\d]+/gi,'');
		var telefone = $("#A2TELEFONE").val().replace(/[^\d]+/gi,'');
		var cep = $("#A2CEP").val().replace(/[^\d]+/gi,'');
		
		var c1  = DatasetFactory.createConstraint("A2CGC", A2CGC, A2CGC, ConstraintType.MUST);
		//var c1  = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST);
		var c2  = DatasetFactory.createConstraint('A2COD', $("#A2COD").val() , $("#A2COD").val(), ConstraintType.MUST);
		var c3  = DatasetFactory.createConstraint('A2LOJA', $("#A2LOJA").val(), $("#A2LOJA").val(), ConstraintType.MUST);
		var c4  = DatasetFactory.createConstraint('A2TIPO', tipoPessoa, tipoPessoa, ConstraintType.MUST);
		var c5  = DatasetFactory.createConstraint('A2NOME', $("#A2NOME").val(), $("#A2NOME").val(), ConstraintType.MUST);
		var c6  = DatasetFactory.createConstraint('A2NREDUZ', $("#A2NREDUZ").val(), $("#A2NREDUZ").val(), ConstraintType.MUST);
		
		var c7  = DatasetFactory.createConstraint('A2END', $("#A2END").val(), $("#A2END").val(), ConstraintType.MUST);
		var c8  = DatasetFactory.createConstraint('A2BAIRRO', $("#A2BAIRRO").val(), $("#A2BAIRRO").val(), ConstraintType.MUST);
		var c9  = DatasetFactory.createConstraint('A2CODMUN', codMunicipio, codMunicipio, ConstraintType.MUST);
		
		var c11 = DatasetFactory.createConstraint('A2EST', $("#A2EST").val(), $("#A2EST").val(), ConstraintType.MUST);
		var c12 = DatasetFactory.createConstraint('A2DDD', $("#A2DDD").val(), $("#A2DDD").val(), ConstraintType.MUST);
		var c13 = DatasetFactory.createConstraint('A2TELEFONE', telefone, telefone, ConstraintType.MUST);
		var c14 = DatasetFactory.createConstraint('A2CEP', cep, cep, ConstraintType.MUST);
		var c15 = DatasetFactory.createConstraint('A2CONTATO', $("#A2CONTATO").val(), $("#A2CONTATO").val() ,ConstraintType.MUST);
		
		var constraints = new Array(c1, c2, c3, c4, c5, c6, c7, c8, c9, c11, c12, c13, c14, c15);
		//var constraints = new Array(c1, c2, c3, c4, c5, c6, c7, c8, c9);
		/*var c20 = DatasetFactory.createConstraint("colleaguePK.colleagueId", 'admin','admin', ConstraintType.MUST);
		var colleague = DatasetFactory.getDataset("colleague", null, [ c20 ], null);
		var fornecedor = DatasetFactory.getDataset("dsTeste", null, constraints, null);*/
		var fornecedor = DatasetFactory.getDataset("dsInclusaoFornProtheus", null, constraints, null);

		if (fornecedor.values.length > 0) {
			if (fornecedor.values[0].CERRO != '') {
				throw("Erro no cadastramento do Fornecedor: " + fornecedor.values[0].CERRO);
			} else {
				$('#A2CODFORN').val(fornecedor.values[0].CCODIGO);
			}
		}
	}
}