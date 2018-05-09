var beforeSendValidate = function(numState, nextState) {	
	
	if ( numState == '05' ) {
		validaCampo('parecerLiberacao', 'select', 'Por favor, informe o Parecer.');
		if($("#parecerLiberacao").val() == 'SA'){
			validaCampo('assessoriaLiberacao', 'select', 'Por favor, informe o(a) Assessor(a).');
		}
		validaCampo('obsLiberacao', 'input', 'Por favor, informe a Observação.');		
	} else 
	if ( numState == '15' ) {
		validaCampo('parecerJustificativa', 'select', 'Por favor, informe se você deseja justificar.');
		validaCampo('obsJustificativa', 'input', 'Por favor, informe o texto da sua justificativa.');		
	} else 
	if ( numState == '21' ) {
		validaCampo('feedBackProduto', 'select', 'Por favor, informe se você recebeu o produto.');
		validaCampo('feedBackProcesso', 'select', 'Por favor, faça a sua avaliação do processo de compras.');	
	} else 
	if ( numState == '35' ) {
		validaCampo('obsParecer', 'input', 'Por favor, informe o texto de seu parecer.');
	} 
	
}	

function validaCampo(campo, tipo,  rotulo){
	
	if (tipo == 'input') {
		var valor = '';
	} else 
	if (tipo == 'select') {
		var valor = '..';
	}	
	if ( $('#'+campo+'').val() == valor || $('#'+campo+'').val() == undefined ){
		$('#div_'+campo+'').addClass('has-error');
		throw (''+rotulo+'');
	} else {			
		if ($('#div_'+campo+'').hasClass('has-error')) {
			$('#div_'+campo+'').removeClass('has-error');
		}	
	}
	
}