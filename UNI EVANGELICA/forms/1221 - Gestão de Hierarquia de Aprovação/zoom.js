/**
 * Função do leave do Zoom
 * @param selectedItem - Item selecionado
 */
function setSelectedZoomItem(selectedItem){

	consultaSolicitante(selectedItem.colleagueId);


	if(selectedItem.inputId == "solicitante"){
		$('#codigoSolicitante').val(selectedItem.colleagueId);
	}

	if(selectedItem.inputId == "gestor"){
		$('#codigoGestor').val(selectedItem.colleagueId);
	}

	if(selectedItem.inputId == "centroDeCusto"){
		$('#codigoCentroDeCusto').val(selectedItem.colleagueId);
	}

}


function removedZoomItem(removedItem) {

	if(selectedItem.inputId == "solicitante"){
		$('#codigoSolicitante').val("");
	}

	if(selectedItem.inputId == "gestor"){
		$('#codigoGestor').val("");
	}

	if(selectedItem.inputId == "centroDeCusto"){
		$('#codigoCentroDeCusto').val("");
	}

}
