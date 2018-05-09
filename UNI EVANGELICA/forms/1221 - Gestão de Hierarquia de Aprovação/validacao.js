var beforeSendValidate = function(numState, nextState) {	
	
		validaCampo('solicitante', 'select', 'Por favor, informe o solicitante.');
		validaCampo('gestor', 'select', 'Por favor, informe o gestor.');
		validaCampo('centroDeCusto', 'select', 'Por favor, informe o centro de custo.');	
	
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