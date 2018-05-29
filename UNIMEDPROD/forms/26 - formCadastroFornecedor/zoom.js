/**
 * Função do leave do Zoom
 * @param selectedItem - Item selecionado
 */
function setSelectedZoomItem(selectedItem){

	if(selectedItem.inputId == 'zoomUnidade'){
		$('#A2COD').val(selectedItem.CEMPRESA);
		$('#A2LOJA').val(selectedItem.CFILEMP);
		if ($('#A2CGC').val() != '' && $('#A2CGC').val() != null && $('#A2CGC').val() != undefined)  {
			var fornecedor = consultaFornecedor($('#A2CGC').val());
		}
	}
}
/**
 * Função acionada ao eliminar uma tag(valor) de um campo zoom
 * @param removedItem
 * @returns
 */
function removedZoomItem(removedItem) {

	if (removedItem.inputId == 'zoomUnidade') {
		limpaForm();
	}	
}

/**
 * Setar valor em um zoom
 * @param instance - id do campo zoom
 * @param value - valor setado
 * @returns
 */
function setZoomData(instance, value){
	window[instance].setValue(value);
}
